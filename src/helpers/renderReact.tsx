import Badge from '@/components/Badge'
import QRCodeLabel from '@/components/icons/QRCodeLabel'
import ReactDOMServer from 'react-dom/server'
import htmlTemplate from '@/helpers/htmlTemplate'
import type { Options } from 'qr-code-styling'

export default function (
  tokenAddress: string,
  tokenId: string,
  derivativeName: string
) {
  const html = ReactDOMServer.renderToStaticMarkup(
    <Badge derivativeName={derivativeName} />
  )
  const config = {
    margin: 10,
    width: 485,
    height: 485,
    data: `https://sealcred.xyz/${tokenAddress}/${tokenId}`,
    image: QRCodeLabel,
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
  return htmlTemplate(html, config)
}
