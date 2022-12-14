import SCLogo from '@/components/icons/SCLogo'
import SealCredLogoText from '@/components/icons/SealCredLogoText'

export default function () {
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
