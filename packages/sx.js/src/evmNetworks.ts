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
      proxyFactory: '0x542922aF76e8b55076a54b15fD972156f5B143B0',
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
      MerkleVoting: '0x7347CCfEd3074AaB4a8B705A830DAeF02fb88D95',
      ...additionalStrategies
    },
    ProposalValidations: {
      VotingPower: '0x9fcff6d7b3E57E0f1C918160FbD7F70F33Ca5D21'
    },
    ExecutionStrategies: {
      SimpleQuorumAvatar: '0x4d719A8131eC19B06b11b3049076d09F45527cC4',
      SimpleQuorumTimelock: '0x13DE21a35fEd1C16E4c09FD1888186cb357A0ab2',
      SimpleQuorumVanilla: '0x6560B2eEEa07642F2CA3ebD100C07A1c1f66F2Ea',
      Axiom: null,
      Isokratia: null,
      ...additionalExecutionStrategies
    }
  };
}

function createEvmConfig(networkId: keyof typeof evmNetworks): EvmNetworkConfig {
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
    },
    [network.Strategies.MerkleVoting]: {
      type: 'merkleVoting'
    }
  } as const;

  const executionStrategiesImplementations = {
    SimpleQuorumAvatar: network.ExecutionStrategies.SimpleQuorumAvatar,
    SimpleQuorumTimelock: network.ExecutionStrategies.SimpleQuorumTimelock,
    SimpleQuorumVanilla: network.ExecutionStrategies.SimpleQuorumVanilla,
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
  oeth: createStandardConfig(10),
  sep: {
    Meta: {
      eip712ChainId: 11155111,
      proxyFactory: '0x542922aF76e8b55076a54b15fD972156f5B143B0',
      masterSpace: '0xB1870f2Dc79862c5a06090344bfbBCA07483dAEe'
    },
    Authenticators: {
      EthSig: '0x38b4B21b498a0983aE8028442FEB48BB91A9B75e',
      EthTx: '0xA927DEcf7E163b779592711fF866a58d1a5Cc270'
    },
    Strategies: {
      Vanilla: '0x63E60ae42844dAf91C9Bcf8057731AA97012eD0a',
      Comp: '0x5Df7743a11136E11010c3F6976C28a8aF5D681a7',
      OZVotes: '0x9b528301AE02C4141eB9e870e36C14bE2E0Ec48F',
      Whitelist: '0x4ea6CD1c54e67f650aE9bb8f1C126a2a9226510A',
      MerkleVoting: '0x76F31B102b2F80BE9E2B0611571c33C10147Ec29'
    },
    ProposalValidations: {
      VotingPower: '0x975201328596612a8F46263D4216355B6D94DFF7',
      WhitelistAndActiveProposalsLimiter: '0xc72dC228cB23871E24C12439D04a8792a888333d'
    },
    ExecutionStrategies: {
      SimpleQuorumAvatar: '0x38afdA9bD192300C128C22278D71D492dB1Ac238',
      SimpleQuorumTimelock: '0xf2A1C2f2098161af98b2Cc7E382AB7F3ba86Ebc4',
      SimpleQuorumVanilla: '0x6560B2eEEa07642F2CA3ebD100C07A1c1f66F2Ea',
      Axiom: null,
      Isokratia: null
    }
  },
  matic: createStandardConfig(137),
  arb1: createStandardConfig(42161),
  'linea-testnet': {
    Meta: {
      eip712ChainId: 59140,
      proxyFactory: '0x12A1FfFFfd70677939D61d641eA043bc9060c718',
      masterSpace: '0x7cC62f8E9BF2b44ce704D2cdCd4aa8021d5A6f4B'
    },
    Authenticators: {
      EthSig: '0x3e3a68e0e70dbf78051109a9f379b7a7adec82f4',
      EthTx: '0xddb36b865a1021524b936fb29fcba5fac073db74'
    },
    Strategies: {
      Vanilla: '0x3e3A68e0e70dBF78051109a9f379B7A7adec82f4',
      Comp: '0x343Baf4b44F7f79b14301CFA8068E3F8BE7470De',
      OZVotes: '0x4aAa33b4367dc5657854bD40738201651eC0cC7B',
      Whitelist: '0x54449c058bBf0B777745944ea1A7b79786FBC958',
      MerkleVoting: '0x76F31B102b2F80BE9E2B0611571c33C10147Ec29'
    },
    ProposalValidations: {
      VotingPower: '0x6D9d6D08EF6b26348Bd18F1FC8D953696b7cf311'
    },
    ExecutionStrategies: {
      SimpleQuorumAvatar: '0x177F163F8f789F0d9C5c7993728ADB106a7b12d4',
      SimpleQuorumTimelock: '0xdb86512e7E3a2d0B93b74b8FE3fFE8AD780791BE',
      SimpleQuorumVanilla: '0x6560B2eEEa07642F2CA3ebD100C07A1c1f66F2Ea',
      Axiom: null,
      Isokratia: null
    }
  },
  'skale-testnet': {
    Meta: {
      eip712ChainId: 1444673419,
      proxyFactory: '0x96f98916be07BCdB2556349b13D5F404B78E13D7',
      masterSpace: '0xae55A5603ba260eb38a1567774395f3e1871707B'
    },
    Authenticators: {
      EthSig: '0x0211a5e207fa0Fbbc17Fb6F297970e7a8E5d1c57',
      EthTx: '0x4D2E0df9E26D034B6bA39DC983857e4bd18D4637'
    },
    Strategies: {
      Vanilla: '0x697C27Edb2a52ef1E3B425C096f7F3e94685F969',
      Comp: '0xF912b680B1FeB775913AD9A5BB2980e519E42D95',
      OZVotes: '0x8B2759420d57f4A67208CE7FE08461Ae5695a723',
      Whitelist: '0xD05365Bf55bfe95c9a7eF23798156580f9AB5231',
      MerkleVoting: '0x7347CCfEd3074AaB4a8B705A830DAeF02fb88D95'
    },
    ProposalValidations: {
      VotingPower: '0x690a8ac27242c7F0f3fA922ab5098E0b05f284c5',
      WhitelistAndActiveProposalsLimiter: '0xB8EACf68daF6c5050fD2f3a02DFf1101F62F5bCc'
    },
    ExecutionStrategies: {
      SimpleQuorumAvatar: '0x68F21c7fa715E9102C7476e3a08Ac896AFb9C3c9',
      SimpleQuorumTimelock: '0xf2A1C2f2098161af98b2Cc7E382AB7F3ba86Ebc4',
      SimpleQuorumVanilla: '0x84CfB838FA4F868560f03eA633b1bDC6e958bf63',
      Axiom: null,
      Isokratia: null
    }
  }
} as const;

export const evmMainnet = createEvmConfig('eth');
export const evmGoerli = createEvmConfig('gor');
export const evmSepolia = createEvmConfig('sep');
export const evmOptimism = createEvmConfig('oeth');
export const evmPolygon = createEvmConfig('matic');
export const evmArbitrum = createEvmConfig('arb1');
export const evmLineaGoerli = createEvmConfig('linea-testnet');
export const evmSkaleTestnet = createEvmConfig('skale-testnet');
