import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';

import MerkleVotingABI from '../abis/MerkleVoting.json';

const MERKLE_VOTING_RPC_PROVIDER = 'https://testnet.skalenodes.com/v1/juicy-low-small-testnet';
const MERKLE_VOTING_API = 'http://localhost:3000';

export async function getMerkleVotingParams(
  strategyAddress: string,
  signerAddress: string,
  proposalId: number
) {
  const provider = new JsonRpcProvider(MERKLE_VOTING_RPC_PROVIDER);

  const contract = new Contract(strategyAddress, MerkleVotingABI, provider);
  const proposalData = await contract.proposals(proposalId);
  const snapshotBlock = proposalData.snapshotBlock.toNumber();

  const res = await fetch(`${MERKLE_VOTING_API}/verify/${snapshotBlock}/${signerAddress}`);
  const data = await res.json();
  return { proof: data.proof, memberInfo: data.value };
}

export async function getSnapshotBlock(strategyAddress: string, proposalId: number) {
  const provider = new JsonRpcProvider(MERKLE_VOTING_RPC_PROVIDER);

  const contract = new Contract(strategyAddress, MerkleVotingABI, provider);
  const proposalData = await contract.proposals(proposalId);
  return proposalData.snapshotBlock;
}

export async function getScoreFromProposalId(
  strategyAddress: string,
  voterAddress: string,
  proposalId: number
) {
  const snapshotBlock = await getSnapshotBlock(strategyAddress, proposalId);

  const res = await fetch(
    `${MERKLE_VOTING_API}/verify/${snapshotBlock.toNumber()}/${voterAddress}`
  );
  const data = await res.json();
  if (!data.value) {
    return BigInt(0);
  }
  return BigInt(data.value[1]);
}
