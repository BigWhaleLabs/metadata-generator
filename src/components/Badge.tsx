import CornertLogo from '@/components/CornerLogo'
import DerivativeName from '@/components/DerivativeName'
import QRCodeWrapper from '@/components/QRCodeWrapper'

export default function ({ derivativeName }: { derivativeName: string }) {
  return (
    <div>
      <div style={{ padding: 26, position: 'absolute' }}>
        <CornertLogo />
      </div>
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#0D0030',
          display: 'flex',
          flexDirection: 'column',
          height: 800,
          width: 800,
        }}
      >
        <QRCodeWrapper />
        <DerivativeName derivativeName={derivativeName} />
      </div>
    </div>
  )
}
