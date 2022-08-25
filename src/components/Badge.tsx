import CornertLogo from '@/components/CornerLogo'
import DerivativeName from '@/components/DerivativeName'
import QRCodeWrapper from '@/components/QRCodeWrapper'
import React from 'react'

export default function Badge({ derivativeName }: { derivativeName: string }) {
  return (
    <div>
      <div style={{ position: 'absolute', padding: 26 }}>
        <CornertLogo />
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
        <QRCodeWrapper />
        <DerivativeName derivativeName={derivativeName} />
      </div>
    </div>
  )
}
