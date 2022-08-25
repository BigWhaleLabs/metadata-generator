import data from '@/data'
import ledgers from '@/helpers/ledgers'

export default async function (tokenAddress: string) {
  for (const [ledgerName, ledger] of Object.entries(await ledgers)) {
    for (const original of Object.keys(ledger)) {
      if (ledger[original].derivative === tokenAddress)
        return {
          type: ledgerName as keyof typeof data,
          tokenAddress,
          original,
        }
    }
  }
  return null
}
