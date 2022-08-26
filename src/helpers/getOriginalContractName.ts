import { goerliProvider, mainnetProvider } from '@/helpers/providers'
import Badge from '@/models/Badge'
import Network from '@/models/Network'
import data from '@/data'
import getContract from '@/helpers/getContract'

export default function (badge: Badge) {
  if (badge.type === 'Email') {
    return badge.original
  } else {
    const originalContract = getContract(
      badge.original,
      data[badge.type].network === Network.Mainnet
        ? mainnetProvider
        : goerliProvider
    )
    return originalContract.name()
  }
}
