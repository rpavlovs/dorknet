import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  useAccount,
  useConnect,
  useContract,
  useDisconnect,
  useProvider,
} from 'wagmi'
import { InjectedConnector } from '@wagmi/core'

const Publication = () => {
  const router = useRouter()
  const publicationId = router.query.publicationId as string | undefined

  const provider = useProvider()
  const { data: account } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const { disconnect } = useDisconnect()

  return (
    <div>
      {account?.address ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : (
        <button onClick={() => connect()}>Connect Wallet</button>
      )}
      {account?.address ?? ''}
      <br />
      publication {publicationId ?? ''}
    </div>
  )
}

export default Publication
