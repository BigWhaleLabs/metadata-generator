import { KetlAttestation__factory } from '@big-whale-labs/ketl-attestation-token'
import { providers } from 'ethers'
import defaultMumbaiProvider from '@/helpers/defaultMumbaiProvider'
import env from '@/helpers/env'

export default function getKetlAttestationContract(
  signerOrProvider?: providers.Provider
) {
  return KetlAttestation__factory.connect(
    env.KETL_ATTESTATION_CONTRACT,
    signerOrProvider || defaultMumbaiProvider
  )
}
