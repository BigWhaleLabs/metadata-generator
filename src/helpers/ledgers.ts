import { DataKey } from '@/models/DataKey'
import SCLedger from '@/models/SCLedger'
import getLedger from '@/helpers/contracts/getLedger'
import getLedgerContracts from '@/helpers/contracts/getLedgerContracts'

async function ledgers() {
  const ledgerContracts = getLedgerContracts()

  const records = await Promise.all(
    (Object.keys(ledgerContracts) as DataKey[]).map((name) => ({
      ledger: getLedger(ledgerContracts[name]),
      name,
    }))
  )

  const result = {} as {
    [ledger in DataKey]: SCLedger
  }

  for (const { ledger, name } of Object.values(records)) {
    result[name] = await ledger
  }
  return result
}

export default ledgers()
