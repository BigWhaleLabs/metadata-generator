import { Context } from 'koa'
import { Controller, Ctx, Get, Params } from 'amala'
import { generateRandomName } from '@big-whale-labs/backend-utils'
import { goerliProvider } from '@/helpers/providers'
import KetlMetadata from '@/validators/KetlMetadata'
import Metadata from '@/validators/Metadata'
import axios from 'axios'
import data from '@/data'
import defaultMumbaiProvider from '@/helpers/defaultMumbaiProvider'
import env from '@/helpers/env'
import getBadge from '@/helpers/getBadge'
import getContract from '@/helpers/getContract'
import getFeedsContract from '@/helpers/getFeedsContract'
import getMetadataFromIpfs from '@/helpers/getPostMetadata'
import getOriginalContractName from '@/helpers/getOriginalContractName'
import nodeHtmlToImage from 'node-html-to-image'
import renderReact, {
  AccountType,
  AttestationType,
  getAccountAttestationType,
  renderReactKetlOG,
  sortedAccountTypes,
} from '@/helpers/renderReact'

@Controller('/')
export default class LoginController {
  @Get('/image/:tokenAddress/:tokenId')
  async image(@Ctx() ctx: Context, @Params() params: Metadata) {
    // const { tokenAddress, tokenId } = params
    // const contract = getContract(tokenAddress, goerliProvider)
    // const name = await contract.name()
    // const html = renderReact(tokenAddress, tokenId, name)
    // const image = await nodeHtmlToImage({
    //   html,
    //   puppeteerArgs: {
    //     args: ['--no-sandbox'],
    //   },
    // })
    // ctx.type = 'image/jpeg'
    // return image
  }

  @Get('/:tokenAddress/:tokenId')
  async metadata(@Params() params: Metadata) {
    // const { tokenAddress, tokenId } = params
    // const contract = getContract(tokenAddress, goerliProvider)
    // const name = await contract.name()
    // const badge = await getBadge(tokenAddress.toLowerCase())
    // if (!badge) throw new Error('Badge not found')
    // const originalName = await getOriginalContractName(badge)
    // return {
    //   description: data[badge.type].ownerContent(originalName),
    //   external_url: `https://sealcred.xyz/${tokenAddress}/${tokenId}`,
    //   image: `${env.METADATA_GENERATOR}/image/${tokenAddress}/${tokenId}`,
    //   name,
    // }
  }
  @Get('/ketl/:feedId/:postId')
  async ketlMetadata(@Ctx() ctx: Context, @Params() params: KetlMetadata) {
    const { feedId, postId } = params
    const feedsContract = getFeedsContract(defaultMumbaiProvider)
    const { author, metadata } = await feedsContract.posts(feedId, postId)
    const { cid } = (
      await axios.post(`${env.PFP_GENERATOR_URL}/profile`, {
        address: author,
      })
    ).data
    const pfpURI = `${env.IPFS_GATEWAY}/${cid}`
    const { extraText, text, ...restMetadata } = await getMetadataFromIpfs<{
      extraText: string
      text: string
      image?: string
    }>(metadata)
    const postImageURI = restMetadata.image
      ? restMetadata.image.replace('ipfs://', `${env.IPFS_GATEWAY}/`)
      : undefined

    const accountType =
      sortedAccountTypes[(await getAccountAttestationType(author)) || 0]
    const nickname = generateRandomName(author)
    // Convert enum to object to get the value

    const html = renderReactKetlOG(
      text,
      pfpURI,
      accountType,
      nickname,
      postImageURI,
      extraText
    )

    const image = await nodeHtmlToImage({
      html,
      puppeteerArgs: {
        args: ['--no-sandbox'],
      },
    })
    ctx.type = 'image/jpeg'

    return image
  }
}
