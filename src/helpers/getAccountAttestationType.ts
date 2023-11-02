import getKetlAttestationContract from '@/helpers/getKetlAttestationContract'

export type AttestationToType<T> = Record<string, T>

export enum AttestationType {
  KetlTeam = 0,
  YC = 1,
  Founder = 2,
  VC = 3,
  TopYC = 4,
  TopVC = 5,
}

export enum AccountType {
  VC = 'VC',
  Founder = 'Founder',
  YC = 'YC Founder',
  Ketl = 'ketl team',
  TopYC = 'Top 💎 YC Founder',
  TopVC = '1B+ AUM VC 🐳',
  Unverified = 'Unverified',
}

export const sortedAccountTypes = [
  AccountType.Ketl,
  AccountType.TopVC,
  AccountType.TopYC,
  AccountType.VC,
  AccountType.YC,
  AccountType.Founder,
  AccountType.Unverified,
]

export const sortedByPriorityAccountTypes = [
  AttestationType.KetlTeam,
  AttestationType.TopVC,
  AttestationType.TopYC,
  AttestationType.VC,
  AttestationType.YC,
  AttestationType.Founder,
]

export async function getAccountTypes(address: string) {
  const ketlContract = getKetlAttestationContract()
  const balances = await ketlContract.balanceOfBatch(
    Array.from({ length: sortedByPriorityAccountTypes.length }).map(
      () => address
    ),
    sortedByPriorityAccountTypes
  )

  return sortedByPriorityAccountTypes.reduce<AttestationToType<boolean>>(
    (result, type, index) => ({
      ...result,
      [type]: balances[index].gte(1),
    }),
    {}
  )
}

export default async function getAccountAttestationType(address: string) {
  const balanceMap = await getAccountTypes(address)

  for (const type of sortedByPriorityAccountTypes) {
    if (balanceMap[type]) return type
  }
}
