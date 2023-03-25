import Head from 'next/head'
import { Inter } from '@next/font/google'
import { NextPageContext } from 'next'
import { useMainContext } from '@/contexts/MainContext'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function Home( { count:initialCount } : { count:number }) {
  const mainCtx = useMainContext();
  const { handleInc, handleDec, setCount } = mainCtx.stateFunctions;
  
  const { count } = mainCtx.state;

  useEffect(()=>{
    setCount(initialCount);
  }, [])

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
            <div>Hello PWA </div>
            <div>Counter: {count === 0 && initialCount !== 0 ? initialCount : count}</div>
            <div className={`flex flex-row space-between`}>
              <button className={`mx-4`} onClick={handleInc}>Inc</button>
              <button className={`mx-4`} onClick={handleDec}>Dec</button>
            </div>
            
          </section>
      </main>
    </>
  )
}

export const getServerSideProps = async (ctx:NextPageContext) => {
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/count`);
    const res = await r.json();
    return {
      props: {
        ...res
      }
    }
  } catch(e) {
    console.log(e)
    return {
      props: {
        count:0
      }
    }
  }

}