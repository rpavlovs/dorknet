import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  useAccount,
  useConnect,
  useContract,
  useDisconnect,
  useProvider,
  useSignMessage,
} from 'wagmi'
import { Text, Button, HStack, VStack, Flex } from '@chakra-ui/react'
// import { useQuery } from 'react-query'

const PAPER_TO_PUBLICATION_ID: { [key: string]: string } = {
  '1': '0x3173-0x03',
}

const Publication = () => {
  const router = useRouter()
  const paperId = router.query.paperId as string | undefined
  const publicationId = paperId ? PAPER_TO_PUBLICATION_ID[paperId] : undefined

  const provider = useProvider()
  const { data: account } = useAccount()
  const {
    connect,
    connectors,
    isConnected,
    isConnecting,
    pendingConnector,
    error,
  } = useConnect()
  const { disconnect } = useDisconnect()

  const { data: signData, signMessage } = useSignMessage({
    message: 'sign me fren',
  })

  console.log({ signData, isConnected })

  const text = 'Lorem Ipsum'

  // const { isLoading, error, data } = useQuery('repoData', () => {
  //   fetch('/api/getPaper', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       publicationId,
  //       readerAddress: account?.address,
  //       readerSignature: '',
  //     }),
  //   })
  // })

  const handleDisconnect = useCallback(() => {
    console.log('disconnect')
    disconnect()
  }, [disconnect])

  const handleSign = useCallback(() => {
    console.log('sign')
    signMessage()
  }, [signMessage])

  if (typeof window === 'undefined') return <div />

  // if (!account) {
  //   return (
  //     <Flex
  //       width="100%"
  //       height="100vh"
  //       alignItems="center"
  //       justifyContent="center"
  //     >
  //       <VStack spacing={5}>
  //         {connectors.map(connector => (
  //           <Button
  //             key={connector.id}
  //             size="lg"
  //             onClick={() => connect(connector)}
  //             disabled={!connector.ready}
  //           >
  //             {connector.name}
  //             {isConnecting &&
  //               connector.id === pendingConnector?.id &&
  //               ' (connecting)'}
  //           </Button>
  //         ))}
  //         {error && <Text color="red">{error.message}</Text>}
  //       </VStack>
  //     </Flex>
  //   )
  // }

  // if (!signData) {
  //   return (
  //     <Flex
  //       width="100%"
  //       height="100vh"
  //       alignItems="center"
  //       justifyContent="center"
  //     >
  //       <Button size="lg" onClick={handleSign}>
  //         Sign
  //       </Button>
  //       <Button onClick={handleDisconnect}>Disconnect</Button>
  //     </Flex>
  //   )
  // }

  return (
    <Flex width="100%" height="100vh" direction="column" p={8}>
      <Flex alignItems="center" alignSelf="flex-end" pb={10}>
        <Text>{account?.address}</Text>
        <Button onClick={handleDisconnect}>Disconnect</Button>
      </Flex>
      <Flex flex={1} maxW="640px">
        <Text fontSize="xl" as="pre">
          {text}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Publication
