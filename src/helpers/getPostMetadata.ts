import { CIDStructOutput } from '@big-whale-labs/obss-storage-contract/dist/typechain/contracts/Feeds'
import axios from 'axios'
import env from '@/helpers/env'
import structToCid from '@/helpers/structToCid'

export default async function getMetadataFromIpfs<ResponseData>(
  metadata: CIDStructOutput
) {
  const cid = structToCid(metadata)

  const { data } = await axios.get<ResponseData>(`${env.IPFS_GATEWAY}/${cid}`, {
    timeout: 15_000,
  })

  return data
}
