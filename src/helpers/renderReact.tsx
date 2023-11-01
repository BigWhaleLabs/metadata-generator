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

export function renderReactKetlOG(
  text: string,
  pfpURI: string,
  extraText?: string
) {
  const html = ReactDOMServer.renderToStaticMarkup(
    <div>
      <div
        style={{
          backgroundColor: '#3A00D6',
          display: 'flex',
          height: 630,
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
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'Space Grotesk',
                fontStyle: 'normal',
                height: '100%',
                justifyContent: 'space-between',
                lineHeight: 'normal',
                marginLeft: 40,
                width: 947,
              }}
            >
              <div>
                <h1
                  style={{
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    color: '#232323',
                    display: '-webkit-box',
                    fontSize: 49,
                    fontWeight: 700,
                    overflow: 'hidden',
                  }}
                >
                  {text}
                </h1>
                <div
                  style={{
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                    color: '#64696C',
                    display: '-webkit-box',
                    fontSize: 35,
                    fontWeight: 400,
                    marginBottom: 25,
                    maxHeight: 135,
                    overflow: 'hidden',
                  }}
                >
                  {extraText}
                </div>
              </div>
              <img
                style={{
                  borderRadius: 999,
                  height: 88,
                  marginBottom: 40,
                  width: 88,
                }}
                src={pfpURI}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  return htmlTemplate(html, {}, true)
}
