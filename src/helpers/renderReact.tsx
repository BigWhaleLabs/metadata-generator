import Badge from '@/components/Badge'
import QRCodeLabel from '@/components/icons/QRCodeLabel'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import htmlTemplate from '@/helpers/htmlTemplate'
import type { Options } from 'qr-code-styling'

const baseQrConfig = {
  margin: 10,
  width: 485,
  height: 485,
  type: 'canvas',

  dotsOptions: {
    color: '#fed823',
    type: 'dots',
  },
  cornersSquareOptions: {
    color: '#ff7bed',
    type: 'dot',
  },
  cornersDotOptions: {
    type: 'dot',
  },
  backgroundOptions: {
    color: '#0d0030',
  },
} as Options

export default function (
  tokenAddress: string,
  tokenId: string,
  tokenName: string
) {
  const html = ReactDOMServer.renderToStaticMarkup(
    <Badge tokenName={tokenName} />
  )
  const config = {
    ...baseQrConfig,
    data: `https://sealcred.xyz/${tokenAddress}/${tokenId}`,
    image: QRCodeLabel,
  }
  const htmlWDoc = htmlTemplate(html, config)
  return htmlWDoc
}
