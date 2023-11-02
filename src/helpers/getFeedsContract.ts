import { Feeds__factory } from '@big-whale-labs/obss-storage-contract'
import { providers } from 'ethers'
import defaultProvider from '@/helpers/defaultMumbaiProvider'
import env from '@/helpers/env'

export default function getFeedsContract(
  signerOrProvider?: providers.Provider
) {
  return Feeds__factory.connect(
    env.OBSS_STORAGE_CONTRACT_FEEDS,
    signerOrProvider || defaultProvider
  )
}
