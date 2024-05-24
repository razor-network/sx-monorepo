import createVanillaStrategy from './vanilla';
import createCompStrategy from './comp';
import createOzVotesStrategy from './ozVotes';
import createMerkleWhitelist from './merkleWhitelist';
import type {
  Propose,
  Vote,
  StrategyConfig,
  Strategy,
  IndexedConfig
} from '../../clients/evm/types';
import type { EvmNetworkConfig } from '../../types';
import createMerkleVotingStrategy from './merkleVoting';

export function getStrategy(address: string, networkConfig: EvmNetworkConfig): Strategy | null {
  const strategy = networkConfig.strategies[address];
  if (!strategy) return null;

  if (strategy.type === 'vanilla') {
    return createVanillaStrategy();
  }

  if (strategy.type === 'comp') {
    return createCompStrategy();
  }

  if (strategy.type === 'ozVotes') {
    return createOzVotesStrategy();
  }

  if (strategy.type === 'whitelist') {
    return createMerkleWhitelist();
  }

  if (strategy.type === 'merkleVoting') {
    return createMerkleVotingStrategy();
  }

  return null;
}

export async function getStrategiesWithParams(
  call: 'propose' | 'vote',
  strategies: StrategyConfig[],
  signerAddress: string,
  data: Propose | Vote,
  networkConfig: EvmNetworkConfig
) {
  console.log({ log: 'GETSTRATEGIESPARAMS', strategies });
  const results = await Promise.all(
    strategies.map(async strategyConfig => {
      const strategy = getStrategy(strategyConfig.address, networkConfig);
      console.log('Strategy in getStrategiesWithParams', strategyConfig, strategy, call);
      if (!strategy) throw new Error('Invalid strategy');

      try {
        const params = await strategy.getParams(
          call,
          strategyConfig,
          signerAddress,
          strategyConfig.metadata || null,
          data
        );

        console.log('Params returned from getParams', params);

        return {
          index: strategyConfig.index,
          params
        };
      } catch (e) {
        return null;
      }
    })
  );

  return results.filter(Boolean) as IndexedConfig[];
}
