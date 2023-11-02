import type { Options } from 'qr-code-styling'

const qrCodeStyling =
  '<script type="text/javascript" src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script>'

const fonts = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet"
`

const creatingQR = (qrCodeConfig: Options) => `
    <script type="text/javascript">
        const qrCode = new QRCodeStyling(${JSON.stringify(qrCodeConfig)});

        qrCode.append(document.getElementById("canvas"));
    </script>
`

export default (reactHtml: string, qrCodeConfig: Options, withoutQR = false) =>
  `
    <head>
        ${
          withoutQR
            ? `
        <style>
            body {
                width: 1200px;
                height: 630px;
            }
        </style>
        `
            : qrCodeStyling
        }
        ${fonts}
    </head>
    <body>
        ${reactHtml}
        ${withoutQR ? '' : creatingQR(qrCodeConfig)}
    </body>
`
