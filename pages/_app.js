import BaseLayout from '../styles/base-layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Large Dataset With Search Field</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
