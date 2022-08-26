import { Server } from 'http'
import { ethers } from 'ethers'
import { goerliProvider } from '@/helpers/providers'
import abiForName from '@/helpers/contracts/abiForName'
import data from '@/data'
import env from '@/helpers/env'
import getBadge from '@/helpers/getBadge'
import getContract from '@/helpers/getContract'
import getOriginalContractName from '@/helpers/getOriginalContractName'
import nodeHtmlToImage from 'node-html-to-image'
import renderReact from '@/helpers/renderReact'
import request from 'supertest'
import runApp from '@/helpers/runApp'
import shutdown from 'http-graceful-shutdown'

jest.setTimeout(50000)

describe('Metadata endpoint', () => {
  const goerliDerivative = '0x74168621B4827BAa4532F9a41caf1f3E7B936c36'
  const externalDerivative = '0xd6B27C7B755B88B58db881A4FfD80B14EC702b49'
  const emailDerivative = '0x62bC06bafE0ADe5D591f5D50A86a4173614697dD'
  const tokenId = '0'

  let server: Server

  beforeAll(async () => {
    server = await runApp()
  })

  afterAll(async () => {
    await shutdown(server)
    return new Promise<void>((resolve, reject) => {
      server.close((err) => {
        err ? reject(err) : resolve()
      })
    })
  })

  async function testMetadata(tokenAddress: string) {
    const response = await request(server).get(
      `/metadata/${tokenAddress}/${tokenId}`
    )
    const contract = getContract(tokenAddress, goerliProvider)
    const name = await contract.name()

    const badge = await getBadge(tokenAddress)

    if (!badge) throw new Error('No badge')

    const originalName = await getOriginalContractName(badge)

    expect(response.body.description).toBe(
      data[badge?.type].ownerContent(originalName)
    )
    expect(response.body.image).toBe(
      `${env.METADATA_GENERATOR}/image/${tokenAddress}/${tokenId}`
    )
    expect(response.body.name).toBe(name)
    expect(response.body.external_url).toBe(
      `https://sealcred.xyz/${tokenAddress}/${tokenId}`
    )
  }

  it('should return valid metadata for Goerli ERC721 token on /metadat request', async () => {
    await testMetadata(goerliDerivative)
  })

  it('should return valid metadata for External ERC721 token on /metadata request', async () => {
    await testMetadata(externalDerivative)
  })
  it('should return valid metadata for Email token on /metadata request', async () => {
    await testMetadata(emailDerivative)
  })
  it('should return image for /image request', async () => {
    const response = await request(server).get(
      `/image/${goerliDerivative}/${tokenId}`
    )
    const contract = getContract(goerliDerivative, goerliProvider)
    const name = await contract.name()
    const html = renderReact(goerliDerivative, tokenId, name)
    const image = (await nodeHtmlToImage({
      html,
    })) as Buffer
    expect(Buffer.compare(response.body, image)).toBe(0)
  })
})
