import { DataKey } from '@/models/DataKey'

export default interface Badge {
  type: DataKey
  tokenAddress: string
  original: string
}
