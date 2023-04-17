import { Ledger as LedgerContract } from '@big-whale-labs/seal-cred-ledger-contract'
import SCLedger from '@/models/SCLedger'

export default async function getLedger(ledgerContract: LedgerContract) {
  const eventsFilter = ledgerContract.filters.CreateDerivative()
  const events = await ledgerContract.queryFilter(eventsFilter)
  const ledger = {} as SCLedger

  for (const event of events) {
    const [original, derivative] = event.args
    ledger[original] = { derivative, original }
  }

  return ledger
}
