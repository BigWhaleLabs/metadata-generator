import {
  ETH_NETWORK,
  ETH_RPC,
  ETH_RPC_MAINNET,
} from '@big-whale-labs/constants'
import { providers } from 'ethers'

export const goerliProvider = new providers.JsonRpcProvider(
  ETH_RPC,
  ETH_NETWORK
)
export const mainnetProvider = new providers.JsonRpcProvider(
  ETH_RPC_MAINNET,
  'mainnet'
)
