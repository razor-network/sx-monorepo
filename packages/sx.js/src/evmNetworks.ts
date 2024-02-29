import { EvmNetworkConfig } from './types';

type AdditionalProperties = {
  authenticators?: Record<string, string>;
  strategies?: Record<string, string>;
  executionStrategies?: Record<string, string>;
};

function createStandardConfig(
  eip712ChainId: number,
  additionalProperties: AdditionalProperties = {}
) {
  const additionalAuthenticators = additionalProperties.authenticators || {};
  const additionalStrategies = additionalProperties.strategies || {};
  const additionalExecutionStrategies = additionalProperties.executionStrategies || {};

  return {
    Meta: {
      eip712ChainId,
      proxyFactory: '0xcE454707ce6516F19d3617017fB816bF8c5b8795',
      masterSpace: '0xCEC35E76F2727133b84274d45e5D761200857251'
    },
    Authenticators: {
      EthSig: '0x6bd991280717CE1e9bf4156b4125485c9872AF44',
      EthTx: '0x3E93Eee429B20e7336D5c6467333879488704bc7',
      ...additionalAuthenticators
    },
    Strategies: {
      Vanilla: '0x5e58c59E37F6571353249B03Df825B9cdC8f8af1',
      Comp: '0xc3482b52fE3B21caE9A34BF17E5808aC96319985',
      OZVotes: '0x5b30b72f79B88f737cfc7B7e6afba8F33C8D5f2c',
      Whitelist: '0xCE1cD69dA94974BcD6439489727E2471DD91BC32',
      ...additionalStrategies
    },
    ProposalValidations: {
      VotingPower: '0x9fcff6d7b3E57E0f1C918160FbD7F70F33Ca5D21'
    },
    ExecutionStrategies: {
      SimpleQuorumAvatar: '0x4d719A8131eC19B06b11b3049076d09F45527cC4',
      SimpleQuorumTimelock: '0x13DE21a35fEd1C16E4c09FD1888186cb357A0ab2',
      Axiom: null,
      Isokratia: null,
      ...additionalExecutionStrategies
    }
  };
}

function createStarknetConfig(networkId: keyof typeof evmNetworks): EvmNetworkConfig {
  const network = evmNetworks[networkId];

  const authenticators = {
    [network.Authenticators.EthSig]: {
      type: 'ethSig'
    },
    [network.Authenticators.EthTx]: {
      type: 'ethTx'
    }
  } as const;

  const strategies = {
    [network.Strategies.Vanilla]: {
      type: 'vanilla'
    },
    [network.Strategies.Comp]: {
      type: 'comp'
    },
    [network.Strategies.OZVotes]: {
      type: 'ozVotes'
    },
    [network.Strategies.Whitelist]: {
      type: 'whitelist'
    }
  } as const;

  const executionStrategiesImplementations = {
    SimpleQuorumAvatar: network.ExecutionStrategies.SimpleQuorumAvatar,
    SimpleQuorumTimelock: network.ExecutionStrategies.SimpleQuorumTimelock,
    ...(network.ExecutionStrategies.Axiom ? { Axiom: network.ExecutionStrategies.Axiom } : {}),
    ...(network.ExecutionStrategies.Isokratia
      ? { Isokratia: network.ExecutionStrategies.Isokratia }
      : {})
  } as const;

  return {
    eip712ChainId: network.Meta.eip712ChainId,
    proxyFactory: network.Meta.proxyFactory,
    masterSpace: network.Meta.masterSpace,
    authenticators,
    strategies,
    executionStrategiesImplementations
  };
}

export const evmNetworks = {
  eth: createStandardConfig(1),
  gor: createStandardConfig(5),
  sep: {
    Meta: {
      eip712ChainId: 11155111,
      proxyFactory: '0xcE454707ce6516F19d3617017fB816bF8c5b8795',
      masterSpace: '0xCEC35E76F2727133b84274d45e5D761200857251'
    },
    Authenticators: {
      EthSig: '0x6bd991280717CE1e9bf4156b4125485c9872AF44',
      EthTx: '0x3E93Eee429B20e7336D5c6467333879488704bc7'
    },
    Strategies: {
      Vanilla: '0x5e58c59E37F6571353249B03Df825B9cdC8f8af1',
      Comp: '0xc3482b52fE3B21caE9A34BF17E5808aC96319985',
      OZVotes: '0x5b30b72f79B88f737cfc7B7e6afba8F33C8D5f2c',
      Whitelist: '0xCE1cD69dA94974BcD6439489727E2471DD91BC32',
      MerkleVoting: '0x97a80c1694D296F2e19b9654423e1e499BbC0537'
    },
    ProposalValidations: {
      VotingPower: '0x9fcff6d7b3E57E0f1C918160FbD7F70F33Ca5D21',
      WhitelistAndActiveProposals: '0x273E5bFA84b42d99346513Feba2aF2701970Fd16'
    },
    ExecutionStrategies: {
      SimpleQuorumAvatar: '0x4d719A8131eC19B06b11b3049076d09F45527cC4',
      SimpleQuorumTimelock: '0x13DE21a35fEd1C16E4c09FD1888186cb357A0ab2',
      Axiom: null,
      Isokratia: null
    }
  },
  matic: createStandardConfig(137),
  arb1: createStandardConfig(42161),
  'linea-testnet': {
    Meta: {
      eip712ChainId: 59140,
      proxyFactory: '0x12a1fffffd70677939d61d641ea043bc9060c718',
      masterSpace: '0x7cc62f8e9bf2b44ce704d2cdcd4aa8021d5a6f4b'
    },
    Authenticators: {
      EthSig: '0x3e3a68e0e70dbf78051109a9f379b7a7adec82f4',
      EthTx: '0xddb36b865a1021524b936fb29fcba5fac073db74'
    },
    Strategies: {
      Vanilla: '0xeba53160c146cbf77a150e9a218d4c2de5db6b51',
      Comp: '0x343baf4b44f7f79b14301cfa8068e3f8be7470de',
      OZVotes: '0x4aaa33b4367dc5657854bd40738201651ec0cc7b',
      Whitelist: '0x54449c058bbf0b777745944ea1a7b79786fbc958'
    },
    ProposalValidations: {
      VotingPower: '0x6d9d6d08ef6b26348bd18f1fc8d953696b7cf311'
    },
    ExecutionStrategies: {
      SimpleQuorumAvatar: '0x177f163f8f789f0d9c5c7993728adb106a7b12d4',
      SimpleQuorumTimelock: '0xdb86512e7e3a2d0b93b74b8fe3ffe8ad780791be',
      Axiom: null,
      Isokratia: null
    }
  }
} as const;

export const evmMainnet = createStarknetConfig('eth');
export const evmGoerli = createStarknetConfig('gor');
export const evmSepolia = createStarknetConfig('sep');
export const evmPolygon = createStarknetConfig('matic');
export const evmArbitrum = createStarknetConfig('arb1');
export const evmLineaGoerli = createStarknetConfig('linea-testnet');
