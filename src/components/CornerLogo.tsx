import React from 'react'
import SCLogo from '@/components/icons/SCLogo'
import SealCredLogoText from '@/components/icons/SealCredLogoText'

export default function CornertLogo() {
  return (
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
  )
}
