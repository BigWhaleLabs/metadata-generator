import { AccountType } from '@/helpers/getAccountAttestationType'
import {
  accountNameStyle,
  accountTypeStyle,
  extraTextStyle,
  headerText,
  innerTextContainer,
  logoContainer,
  logoSpace,
  mainContainer,
  pfpStyle,
  postImageContainer,
  postImageStyle,
  rootContainer,
  textContainer,
  userContainer,
  verifiedContainer,
} from '@/helpers/renderReactStyles'
import Badge from '@/components/Badge'
import QRCodeLabel from '@/components/icons/QRCodeLabel'
import ReactDOMServer from 'react-dom/server'
import VerifiedIcon from '@/components/icons/VerifiedIcon'

import KetlLogo from '@/components/icons/KetlLogo'
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
  accountType: AccountType,
  nickname: string,
  postImageURI?: string,
  extraText?: string
) {
  const html = ReactDOMServer.renderToStaticMarkup(
    <div style={rootContainer}>
      <div style={mainContainer(!!extraText)}>
        <div style={textContainer(!!extraText)}>
          <div style={postImageContainer}>
            <div style={innerTextContainer}>
              <h1 style={headerText}>{text}</h1>
              {extraText && <div style={extraTextStyle}>{extraText}</div>}
            </div>
            {postImageURI && <img style={postImageStyle} src={postImageURI} />}
          </div>
          <div style={userContainer}>
            <img style={pfpStyle} src={pfpURI} />
            <div style={{ marginLeft: 16 }}>
              <div style={verifiedContainer}>
                <VerifiedIcon />
                <div style={accountTypeStyle}>{accountType}</div>
              </div>
              <div style={accountNameStyle}>@{nickname}</div>
            </div>
          </div>
        </div>
      </div>
      <div style={logoContainer}>
        <div style={logoSpace} />
        <KetlLogo />
      </div>
    </div>
  )
  return htmlTemplate(html, {}, true)
}
