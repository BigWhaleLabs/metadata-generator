import React from 'react'
import SCLogo from '@/components/icons/SCLogo'
import SealCredLogoText from '@/components/icons/SealCredLogoText'

export default function Badge({ tokenName }: { tokenName: string }) {
  return (
    <div>
      <div style={{ position: 'absolute', padding: 26 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SCLogo />
          <div style={{ marginTop: 16 }}>
            <SealCredLogoText />
          </div>
        </div>
      </div>
      <div
        style={{
          width: 800,
          height: 800,
          backgroundColor: '#0D0030',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: 156,
          }}
        >
          <div
            style={{
              borderRadius: 58,
              width: 485,
              height: 485,
              overflow: 'hidden',
              border: '9px solid #3A00D6',
              filter: 'drop-shadow(0px 0px 74px #3A00D6)',
            }}
            id="canvas"
          />
        </div>
        <span
          style={{
            marginTop: -126,
            fontSize: 38,
            lineHeight: '48px',
            textAlign: 'center',
            color: '#EFECD6',
            fontWeight: 700,
            fontFamily: 'Space Grotesk',
            maxWidth: 485,
          }}
        >
          {tokenName}
        </span>
      </div>
    </div>
  )
}
