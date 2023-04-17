import SCLogo from '@/components/icons/SCLogo'
import SealCredLogoText from '@/components/icons/SealCredLogoText'

export default function () {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SCLogo />
      <div style={{ marginTop: 16 }}>
        <SealCredLogoText />
      </div>
    </div>
  )
}
