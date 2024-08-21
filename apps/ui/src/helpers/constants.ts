import { VoteType } from '@/types';

export const ETH_CONTRACT = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const CHAIN_IDS = {
  matic: 137,
  arb1: 42161,
  oeth: 10,
  eth: 1,
  gor: 5,
  sep: 11155111,
  'linea-testnet': 59140,
  'skale-testnet': 1444673419,
  'skale-mainnet': 278611351,
  'europa-mainnet': 2046399126
};

export const COINGECKO_ASSET_PLATFORMS = {
  1: 'ethereum',
  10: 'optimistic-ethereum',
  137: 'polygon-pos',
  42161: 'arbitrum-one'
};

export const COINGECKO_BASE_ASSETS = {
  1: 'ethereum',
  10: 'ethereum',
  137: 'matic-network',
  42161: 'ethereum'
};

export const MAX_SYMBOL_LENGTH = 12;
export const BASIC_CHOICES = ['For', 'Against', 'Abstain'];
export const SUPPORTED_VOTING_TYPES: VoteType[] = [
  'basic',
  'single-choice',
  'approval',
  'ranked-choice',
  'weighted',
  'quadratic'
] as const;
