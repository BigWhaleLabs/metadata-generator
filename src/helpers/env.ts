import * as dotenv from 'dotenv'
import {
  PROD_KETL_FEEDS_CONTRACT_ADDRESS,
  PROD_KETL_OBSS_CONTRACT_ADDRESS,
} from '@big-whale-labs/constants'
import { cleanEnv, num, str } from 'envalid'
import { cwd } from 'process'
import { resolve } from 'path'

dotenv.config({ path: resolve(cwd(), '.env') })

// eslint-disable-next-line node/no-process-env
export default cleanEnv(process.env, {
  IPFS_GATEWAY: str({ default: 'https://ipfs.io/ipfs' }),
  METADATA_GENERATOR: str({ default: 'http://localhost:1337' }),
  MUMBAI_RPC: str(),
  OBSS_STORAGE_CONTRACT_FEEDS: str({
    default: PROD_KETL_FEEDS_CONTRACT_ADDRESS,
  }),
  PORT: num({ default: 1337 }),
})
