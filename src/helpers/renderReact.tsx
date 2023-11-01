import Badge from '@/components/Badge'
import QRCodeLabel from '@/components/icons/QRCodeLabel'
import ReactDOMServer from 'react-dom/server'
import Truncate from 'react-truncate'
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
    backgroundOptions: {
      color: '#0d0030',
    },
    cornersDotOptions: {
      type: 'dot',
    },
    cornersSquareOptions: {
      color: '#ff7bed',
      type: 'dot',
    },
    data: `https://sealcred.xyz/${tokenAddress}/${tokenId}`,
    dotsOptions: {
      color: '#fed823',
      type: 'dots',
    },
    height: 485,
    image: QRCodeLabel,
    margin: 10,
    type: 'canvas',
    width: 485,
  } as Options
  return htmlTemplate(html, config)
}

export function renderReactKetlOG(text: string, extraText?: string) {
  const html = ReactDOMServer.renderToStaticMarkup(
    <div>
      <div
        style={{
          backgroundColor: '#3A00D6',
          display: 'flex',
          height: 630,
          position: 'absolute',
          width: 1200,
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: 32,
            height: 479,
            marginLeft: 86,
            marginTop: 76,
            width: 1027,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Space Grotesk',
              fontStyle: 'normal',
              lineHeight: 'normal',
              marginLeft: 40,
              width: 947,
            }}
          >
            <h1
              style={{
                color: '#232323',
                fontSize: 49,
                fontWeight: 700,
              }}
            >
              What’s reasonable cash/carry for a quant at a PE/VC fund?
            </h1>
            <div
              style={{
                color: '#64696C',
                fontSize: 35,
                fontWeight: 400,
                height: 135,
                lineClamp: 3,
                maxHeight: 135,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: 947,
              }}
            >
              Fund manages low 10 digits. I’ve received an offer but don’t
              really know how to evaluate it or compare it to a quant role
              within a quant fund (like citadel or js). What if theres blah blah
              lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sedsbdsfgsjhdfghjsdgfjhsdgfjhgsdhjfgsdhjgfhjsdgfhgdshjfgsdhjfgsdjhfgjdshgfhdsgfjhsdsdsjh
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  return htmlTemplate(html, {}, true)
}
