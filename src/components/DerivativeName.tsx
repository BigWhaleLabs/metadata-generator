export default function ({ derivativeName }: { derivativeName: string }) {
  return (
    <span
      style={{
        color: '#EFECD6',
        fontFamily: 'Space Grotesk',
        fontSize: 38,
        fontWeight: 700,
        lineHeight: '48px',
        marginTop: -126,
        maxWidth: 485,
        textAlign: 'center',
      }}
    >
      {derivativeName}
    </span>
  )
}
