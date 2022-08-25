import { DataKey } from '@/models/DataKey'
import {
  Ledger,
  Ledger__factory,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { goerliProvider } from '@/helpers/providers'
import data from '@/data'

export default function getLedgerContracts() {
  return Object.entries(data).reduce(
    (prev, [name, { ledger }]) => ({
      ...prev,
      [name]: Ledger__factory.connect(ledger, goerliProvider),
    }),
    {}
  ) as { [name in DataKey]: Ledger }
}
