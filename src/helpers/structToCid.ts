import { CIDStructOutput } from '@big-whale-labs/obss-storage-contract/dist/typechain/contracts/Feeds'
import base58 from 'bs58'

export default function structToCid(struct: CIDStructOutput) {
  if (struct.size === 0) throw new Error(`Invalid CID struct: ${struct}`)
  // cut off leading "0x"
  try {
    if (!struct.digest) struct.digest = struct[0]
    if (!struct.hashFunction) struct.hashFunction = struct[1]
    if (!struct.size) struct.size = struct[2]

    const hashBytes = Buffer.from(struct.digest.slice(2), 'hex')

    // prepend hashFunction and digest size
    const multihashBytes = Buffer.alloc(2 + hashBytes.length)
    multihashBytes[0] = struct.hashFunction
    multihashBytes[1] = struct.size
    multihashBytes.set(hashBytes, 2)

    return base58.encode(multihashBytes)
  } catch (err) {
    throw new Error(`Invalid CID struct: ${struct}`)
  }
}
