import { Mumbai } from '@thirdweb-dev/chains'
import { providers } from 'ethers'
import env from '@/helpers/env'

export default new providers.JsonRpcProvider(env.MUMBAI_RPC, Mumbai)
