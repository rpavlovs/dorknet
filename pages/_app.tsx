import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { getDefaultProvider, providers } from 'ethers'
import {
  Provider as EthersProvider,
  chain,
  defaultChains,
  createClient,
  Chain,
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const alchemyId = process.env.ALCHEMY_ID

function MyApp({ Component, pageProps }: AppProps) {
  const chains = defaultChains

  const client = createClient({
    autoConnect: true,
    connectors: ({ chainId }) => {
      const rpcUrl =
        chains.find(x => x.id === chainId)?.rpcUrls?.[0] ??
        chain.mainnet.rpcUrls[0]

      return [
        new InjectedConnector({
          chains,
        }),
        new WalletConnectConnector({
          options: {
            qrcode: true,
            bridge: 'https://bridge.walletconnect.org',
            rpc: {
              // TODO: Support more chains
              '1': rpcUrl,
            },
          },
        }),
        new CoinbaseWalletConnector({
          chains,
          options: {
            chainId,
            appName: '0xfrens.xyz',
          },
        }),
      ]
    },
    provider: ({ chainId }) => {
      if (!chainId) return getDefaultProvider()
      const chain = chains.find(tempChain => tempChain.id === chainId) as Chain
      const providerUrl = chain.rpcUrls.default

      return new providers.JsonRpcProvider(providerUrl, chainId)
    },
  })

  return (
    <EthersProvider client={client}>
      <ChakraProvider theme={extendTheme({})}>
        <Component {...pageProps} />
      </ChakraProvider>
    </EthersProvider>
  )
}

export default MyApp
