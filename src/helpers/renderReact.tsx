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

export function renderReactKetlOG(
  text: string,
  pfpURI: string,
  accountType: AccountType,
  nickname: string,
  postImageURI?: string,
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
            boxShadow: '0px 4px 114px 0px rgba(234, 47, 152, 0.50)',
            height: extraText ? 479 : 319,
            marginLeft: 86,
            marginTop: extraText ? 76 : 156,
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                        WebkitLineClamp: postImageURI ? 2 : 3,
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
                  {postImageURI && (
                    <img
                      style={{
                        borderRadius: 16,
                        height: 256,
                        marginTop: 25,
                        width: 256,
                      }}
                      src={postImageURI}
                    ></img>
                  )}
                </div>
              </div>
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 40,
                }}
              >
                <img
                  style={{
                    borderRadius: 999,
                    height: 88,
                    width: 88,
                  }}
                  src={pfpURI}
                />
                <div
                  style={{
                    marginLeft: 16,
                  }}
                >
                  <div
                    style={{
                      color: '#3A00D6',
                      display: 'flex',
                      flexDirection: 'row',
                      fontFamily: 'Space Grotesk',
                      fontSize: 24,
                      fontWeight: 700,
                      lineHeight: 'normal',
                    }}
                  >
                    <VerifiedIcon />
                    <div
                      style={{
                        marginBottom: 8,
                        marginLeft: 4,
                      }}
                    >
                      {accountType}
                    </div>
                  </div>
                  <div
                    style={{
                      color: '#BABBC0',
                      fontFamily: 'JetBrains Mono',
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    @{nickname}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  return htmlTemplate(html, {}, true)
}
