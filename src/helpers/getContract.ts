import { ContractInterface, ethers } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'
import abiForName from '@/helpers/contracts/abiForName'

export default function (
  contractAddress: string,
  provider: JsonRpcProvider,
  abi: ContractInterface = abiForName
) {
  return new ethers.Contract(contractAddress, abi, provider)
}
