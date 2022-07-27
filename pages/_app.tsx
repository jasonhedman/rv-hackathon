import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme/theme';
import Layout from '../components/Layout';

import { WagmiConfig, createClient, configureChains, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { provider, webSocketProvider } = configureChains(
  [chain.rinkeby],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
      theme={theme}
    >
      <WagmiConfig client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp