import Head from 'next/head'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>PWABoilerplate</title>
        <meta name="description" content="A pwa-next boilerplate using TailwindCSS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`w-full h-full flex justify-center items-center`}>
          <section>
            <div>Hello PWA</div>
          </section>
      </main>
    </>
  )
}
