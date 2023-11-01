import { IsNumber, IsString } from 'amala'

export default class TokenAddress {
  @IsString()
  postId!: number
  @IsString()
  feedId!: number
}
