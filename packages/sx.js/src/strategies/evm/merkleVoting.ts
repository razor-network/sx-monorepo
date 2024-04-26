import { AbiCoder } from '@ethersproject/abi';
import type { Strategy } from '../../clients/evm/types';
import type { StrategyConfig } from '../../types';

import getMerkleVotingParams from '../../utils/merkleVoting';

export default function createMerkleVotingStrategy(): Strategy {
  return {
    type: 'merkleVoting',
    async getParams(
      call: 'propose' | 'vote',
      strategyConfig: StrategyConfig,
      signerAddress: string,
      metadata: Record<string, any> | null,
      data
    ): Promise<string> {
      try {
        const proposalId = data.proposal || 0;
        const abiCoder = new AbiCoder();
        const { proof: proofAPI, memberInfo } = await getMerkleVotingParams(
          strategyConfig.address,
          signerAddress,
          proposalId
        );

        console.log({
          call,
          metadata,
          strategyConfig,
          proposalId,
          signerAddress,
          memberInfo
        });

        return abiCoder.encode(
          ['bytes32[]', 'tuple(address, uint96, uint256)'],
          [proofAPI, memberInfo]
        );
      } catch (error) {
        console.log(error);
        return 'error';
      }
    },
    async getVotingPower(): Promise<bigint> {
      console.log('Calling get voting power from my strategy');
      const score = BigInt('123932771293099211787713');

      return score;
    }
  };
}
