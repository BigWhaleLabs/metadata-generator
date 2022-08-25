import { IsEthereumAddress, IsString } from 'amala'

export default class TokenAddress {
  @IsEthereumAddress()
  tokenAddress!: string
  @IsString()
  tokenId!: string
}
