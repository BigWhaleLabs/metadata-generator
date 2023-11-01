import { KetlAttestation__factory } from '@big-whale-labs/ketl-attestation-token'
import { providers } from 'ethers'
import Badge from '@/components/Badge'
import QRCodeLabel from '@/components/icons/QRCodeLabel'
import ReactDOMServer from 'react-dom/server'
import VerifiedIcon from '@/components/icons/VerifiedIcon'
import defaultMumbaiProvider from '@/helpers/defaultMumbaiProvider'
import env from '@/helpers/env'
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

export function getKetlAttestationContract(
  signerOrProvider?: providers.Provider
) {
  return KetlAttestation__factory.connect(
    env.KETL_ATTESTATION_CONTRACT,
    signerOrProvider || defaultMumbaiProvider
  )
}

const ketlContract = getKetlAttestationContract()

export type AttestationToType<T> = Record<string, T>

export enum AttestationType {
  KetlTeam = 0,
  YC = 1,
  Founder = 2,
  VC = 3,
  TopYC = 4,
  TopVC = 5,
}

export const sortedByPriorityAccountTypes = [
  AttestationType.KetlTeam,
  AttestationType.TopVC,
  AttestationType.TopYC,
  AttestationType.VC,
  AttestationType.YC,
  AttestationType.Founder,
]

export enum AccountType {
  VC = 'VC',
  Founder = 'Founder',
  YC = 'YC Founder',
  Ketl = 'ketl team',
  TopYC = 'Top 💎 YC Founder',
  TopVC = '1B+ AUM VC 🐳',
  Unverified = 'Unverified',
}

export const sortedAccountTypes = [
  AccountType.Ketl,
  AccountType.TopVC,
  AccountType.TopYC,
  AccountType.VC,
  AccountType.YC,
  AccountType.Founder,
  AccountType.Unverified,
]

export async function getAccountTypes(address: string) {
  const balances = await ketlContract.balanceOfBatch(
    Array.from({ length: sortedByPriorityAccountTypes.length }).map(
      () => address
    ),
    sortedByPriorityAccountTypes
  )

  return sortedByPriorityAccountTypes.reduce<AttestationToType<boolean>>(
    (result, type, index) => ({
      ...result,
      [type]: balances[index].gte(1),
    }),
    {}
  )
}

export async function getAccountAttestationType(address: string) {
  const balanceMap = await getAccountTypes(address)

  for (const type of sortedByPriorityAccountTypes) {
    if (balanceMap[type]) return type
  }
}

const rootContainer = {
  backgroundColor: '#3A00D6',
  display: 'flex',
  height: 630,
  width: 1200,
}

const mainContainer = (extraText = false) => ({
  backgroundColor: 'white',
  borderRadius: 32,
  boxShadow: '0px 4px 114px 0px rgba(234, 47, 152, 0.50)',
  height: rootContainer.height - (extraText ? 76 : 156) * 2,
  marginLeft: 86,
  marginTop: extraText ? 76 : 156,
  width: rootContainer.width - 86 * 2,
})

const textContainer = (extraText = false) => ({
  display: 'flex',
  flexDirection: 'column' as const,
  fontFamily: 'Space Grotesk',
  fontStyle: 'normal',
  height: '100%',
  justifyContent: 'space-between',
  lineHeight: 'normal',
  marginLeft: 40,
  width: mainContainer(extraText).width - 40 * 2,
})

const innerTextContainer = {
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'space-between',
}

const headerText = {
  color: '#232323',
  display: 'flex',
  flexDirection: 'row' as const,
  fontSize: 49,
  fontWeight: 700,
  lineHeight: 'normal',
}

const extraTextStyle = (postImageURI?: string) => ({
  WebkitBoxOrient: 'vertical' as const,
  WebkitLineClamp: postImageURI ? 2 : 3,
  color: '#64696C',
  display: '-webkit-box',
  fontSize: 35,
  fontWeight: 400,
  marginBottom: 25,
  maxHeight: 135,
  overflow: 'hidden',
})

const postImageStyle = {
  borderRadius: 16,
  height: 256,
  marginTop: 25,
  width: 256,
}

const userContainer = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row' as const,
  marginBottom: 40,
}

const pfpStyle = {
  borderRadius: 999,
  height: 88,
  width: 88,
}

const verifiedContainer = {
  color: '#3A00D6',
  display: 'flex',
  flexDirection: 'row' as const,
  fontFamily: 'Space Grotesk',
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 'normal',
}

const accountTypeStyle = {
  marginBottom: 8,
  marginLeft: 4,
}

const accountNameStyle = {
  color: '#BABBC0',
  fontFamily: 'JetBrains Mono',
  fontSize: 22,
  fontWeight: 700,
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
          <div style={innerTextContainer}>
            <h1 style={headerText}>{text}</h1>
            {extraText && (
              <div style={extraTextStyle(postImageURI)}>{extraText}</div>
            )}
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
    </div>
  )
  return htmlTemplate(html, {}, true)
}
