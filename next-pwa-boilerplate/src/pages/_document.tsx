import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico"/>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#BF1B1A"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
