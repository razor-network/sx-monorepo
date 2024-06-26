export type ExecutorType =
  | 'SimpleQuorumVanilla'
  | 'SimpleQuorumAvatar'
  | 'SimpleQuorumTimelock'
  | 'EthRelayer'
  | 'Axiom'
  | 'Isokratia';

export type VanillaAuthenticatorConfig = {
  type: 'vanilla';
};

export type EthTxAuthenticatorConfig = {
  type: 'ethTx';
};

export type EthSigAuthenticatorConfig = {
  type: 'ethSig';
};

export type StarkSigAuthenticatorConfig = {
  type: 'starkSig';
};

export type StarkTxAuthenticatorConfig = {
  type: 'starkTx';
};

export type VanillaStrategyConfig = {
  type: 'vanilla';
};

export type CompStrategyConfig = {
  type: 'comp';
};

export type OzVotesStrategyConfig = {
  type: 'ozVotes';
};

export type Erc20VotesStrategyConfig = {
  type: 'erc20Votes';
};

export type WhitelistStrategyConfig = {
  type: 'whitelist';
};

export type MerkleVotingStrategyConfig = {
  type: 'merkleVoting';
};

export type EvmSlotValueStrategyConfig = {
  type: 'evmSlotValue';
  params: {
    deployedOnChain: string;
  };
};

export type OzVotesStorageProofStrategyConfig = {
  type: 'ozVotesStorageProof';
  params: {
    deployedOnChain: string;
  };
};

export type NetworkConfig = {
  eip712ChainId: string;
  spaceFactory: string;
  masterSpace: string;
  starknetCommit: string;
  starknetCore: string;
  herodotusAccumulatesChainId: number;
  authenticators: {
    [key: string]:
      | VanillaAuthenticatorConfig
      | EthTxAuthenticatorConfig
      | EthSigAuthenticatorConfig
      | StarkSigAuthenticatorConfig
      | StarkTxAuthenticatorConfig
      | undefined;
  };
  strategies: {
    [key: string]:
      | VanillaStrategyConfig
      | CompStrategyConfig
      | OzVotesStrategyConfig
      | Erc20VotesStrategyConfig
      | WhitelistStrategyConfig
      | EvmSlotValueStrategyConfig
      | OzVotesStorageProofStrategyConfig
      | MerkleVotingStrategyConfig
      | undefined;
  };
};

export type EvmNetworkConfig = Omit<
  NetworkConfig,
  | 'eip712ChainId'
  | 'spaceFactory'
  | 'starknetCommit'
  | 'starknetCore'
  | 'herodotusAccumulatesChainId'
> & {
  eip712ChainId: number;
  proxyFactory: string;
  executionStrategiesImplementations: {
    [key in ExecutorType]?: string;
  };
};

export type OffchainNetworkConfig = {
  eip712ChainId: 1 | 5;
};
