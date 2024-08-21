import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';

import SpaceABI from '../abis/Space.json';

const PROVIDER_URL = 'https://mainnet.skalenodes.com/v1/elated-tan-skat';

export function getNextProposalId(space: string) {
  const provider = new JsonRpcProvider(PROVIDER_URL);
  const contract = new Contract(space, SpaceABI, provider);
  return contract.nextProposalId();
}
