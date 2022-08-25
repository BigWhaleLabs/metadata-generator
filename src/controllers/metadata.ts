import { Context } from 'koa'
import { Controller, Ctx, Get, Params } from 'amala'
import { ethers } from 'ethers'
import { goerliProvider, mainnetProvider } from '@/helpers/providers'
import Metadata from '@/validators/Metadata'
import Network from '@/models/Network'
import abiForName from '@/helpers/contracts/abiForName'
import data from '@/data'
import getBadge from '@/helpers/getBadge'
import nodeHtmlToImage from 'node-html-to-image'
import renderReact from '@/helpers/renderReact'

@Controller('/')
export default class LoginController {
  @Get('/image/:tokenAddress/:tokenId')
  async test(@Ctx() ctx: Context, @Params() params: Metadata) {
    const { tokenAddress, tokenId } = params

    const contract = new ethers.Contract(
      tokenAddress,
      abiForName,
      goerliProvider
    )
    const name = await contract.name()
    const html = renderReact(tokenAddress, tokenId, name)
    const image = await nodeHtmlToImage({
      html,
    })
    ctx.type = 'image/jpeg'
    return image
  }

  @Get('/metadata/:tokenAddress/:tokenId')
  async metadata(@Params() params: Metadata) {
    const { tokenAddress, tokenId } = params

    const contract = new ethers.Contract(
      tokenAddress,
      abiForName,
      goerliProvider
    )
    const name = await contract.name()

    const badge = await getBadge(tokenAddress)
    if (!badge) {
      throw new Error('Badge not found')
    }
    const originalContract = new ethers.Contract(
      badge.original,
      abiForName,
      data[badge.type].network === Network.Mainnet
        ? mainnetProvider
        : goerliProvider
    )

    return {
      description: data[badge.type].ownerContent(await originalContract.name()),
      external_url: 'https://sealcred.xyz',
      image: `http://localhost:1337/image/${tokenAddress}/${tokenId}`,
      name,
    }
  }
}
