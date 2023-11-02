import { ETH_NETWORK } from '@big-whale-labs/constants'
import { providers } from 'ethers'
import env from '@/helpers/env'

export const goerliProvider = new providers.JsonRpcProvider(
  env.GOERLI_RPC,
  ETH_NETWORK
)
export const mainnetProvider = new providers.JsonRpcProvider(
  env.MAINNET_RPC,
  'mainnet'
)
