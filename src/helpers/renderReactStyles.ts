export const rootContainer = {
  backgroundColor: '#3A00D6',
  display: 'flex',
  height: 630,
  width: 1200,
}

export const mainContainer = (extraText = false) => ({
  backgroundColor: 'white',
  borderRadius: 32,
  boxShadow: '0px 4px 114px 0px rgba(234, 47, 152, 0.50)',
  height: rootContainer.height - (extraText ? 76 : 156) * 2,
  marginLeft: 86,
  marginTop: extraText ? 76 : 156,
  width: rootContainer.width - 86 * 2,
})

export const textContainer = (extraText = false) => ({
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

export const innerTextContainer = {
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'space-between',
}

export const headerText = {
  color: '#232323',
  display: 'flex',
  flexDirection: 'row' as const,
  fontSize: 49,
  fontWeight: 700,
  lineHeight: 'normal',
}

export const extraTextStyle = (postImageURI?: string) => ({
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

export const postImageStyle = {
  borderRadius: 16,
  height: 256,
  marginTop: 25,
  objectFit: 'cover' as const,
  width: 256,
}

export const userContainer = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row' as const,
  marginBottom: 40,
}

export const pfpStyle = {
  borderRadius: 999,
  height: 88,
  width: 88,
}

export const verifiedContainer = {
  color: '#3A00D6',
  display: 'flex',
  flexDirection: 'row' as const,
  fontFamily: 'Space Grotesk',
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 'normal',
}

export const accountTypeStyle = {
  marginBottom: 8,
  marginLeft: 4,
}

export const accountNameStyle = {
  color: '#BABBC0',
  fontFamily: 'JetBrains Mono',
  fontSize: 22,
  fontWeight: 700,
}

export const postImageContainer = {
  display: 'flex',
  flexDirection: 'row' as const,
  justifyContent: 'space-between',
}
