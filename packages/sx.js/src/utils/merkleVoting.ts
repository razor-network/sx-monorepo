import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';

import MerkleVotingABI from '../abis/MerkleVoting.json';

const MERKLE_VOTING_RPC_PROVIDER = 'https://ethereum-sepolia-rpc.publicnode.com';
const MERKLE_VOTING_API = 'http://localhost:3000';

export default async function getMerkleVotingParams(
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
