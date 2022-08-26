import { DataKey } from '@/models/DataKey'
import ledgers from '@/helpers/ledgers'

export default async function (tokenAddress: string) {
  for (const [ledgerName, ledger] of Object.entries(await ledgers)) {
    for (const original of Object.keys(ledger)) {
      if (ledger[original].derivative === tokenAddress)
        return {
          type: ledgerName as DataKey,
          tokenAddress,
          original,
        }
    }
  }
  return null
}
