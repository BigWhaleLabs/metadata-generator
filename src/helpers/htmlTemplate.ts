import type { Options } from 'qr-code-styling'

const qrCodeStyling =
  '<script type="text/javascript" src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script>'

const fonts = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap" rel="stylesheet"> 
`

const creatingQR = (qrCodeConfig: Options) => `
    <script type="text/javascript">
        const qrCode = new QRCodeStyling(${JSON.stringify(qrCodeConfig)});

        qrCode.append(document.getElementById("canvas"));
    </script>
`

export default (reactHtml: string, qrCodeConfig: Options) =>
  `
    <head>
        ${qrCodeStyling}
        ${fonts}
    </head>
    <body>
        ${reactHtml}
        ${creatingQR(qrCodeConfig)}
    </body>
`
