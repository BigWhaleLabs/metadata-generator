export default function ({ derivativeName }: { derivativeName: string }) {
  return (
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
      {derivativeName}
    </span>
  )
}
