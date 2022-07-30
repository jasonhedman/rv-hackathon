import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme/theme';
import Layout from '../components/Layout';

import { MoralisProvider } from 'react-moralis';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    >
      <ChakraProvider
        theme={theme}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </MoralisProvider>
  )
}

export default MyApp