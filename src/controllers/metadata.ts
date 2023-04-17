import { Context } from 'koa'
import { Controller, Ctx, Get, Params } from 'amala'
import { goerliProvider } from '@/helpers/providers'
import Metadata from '@/validators/Metadata'
import data from '@/data'
import env from '@/helpers/env'
import getBadge from '@/helpers/getBadge'
import getContract from '@/helpers/getContract'
import getOriginalContractName from '@/helpers/getOriginalContractName'
import nodeHtmlToImage from 'node-html-to-image'
import renderReact from '@/helpers/renderReact'

@Controller('/')
export default class LoginController {
  @Get('/image/:tokenAddress/:tokenId')
  async image(@Ctx() ctx: Context, @Params() params: Metadata) {
    const { tokenAddress, tokenId } = params

    const contract = getContract(tokenAddress, goerliProvider)
    const name = await contract.name()
    const html = renderReact(tokenAddress, tokenId, name)
    const image = await nodeHtmlToImage({
      puppeteerArgs: {
        args: ['--no-sandbox'],
      },
      html,
    })
    ctx.type = 'image/jpeg'
    return image
  }

  @Get('/:tokenAddress/:tokenId')
  async metadata(@Params() params: Metadata) {
    const { tokenAddress, tokenId } = params

    const contract = getContract(tokenAddress, goerliProvider)
    const name = await contract.name()
    const badge = await getBadge(tokenAddress.toLowerCase())
    if (!badge) throw new Error('Badge not found')

    const originalName = await getOriginalContractName(badge)

    return {
      description: data[badge.type].ownerContent(originalName),
      external_url: `https://sealcred.xyz/${tokenAddress}/${tokenId}`,
      image: `${env.METADATA_GENERATOR}/image/${tokenAddress}/${tokenId}`,
      name,
    }
  }
}
