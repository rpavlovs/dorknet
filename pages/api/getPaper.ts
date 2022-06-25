// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ipfsHash: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { publicationId, readerAddress, readerSignature } = req.body
  // get publicationId, signature and address from req

  // verify signature and address

  // query the lens GraphQl endpoint for the publicationId
  // WhoCollectedPublicationRequest

  // check that address in one of the addresses who collected the publication

  // fetch the ipfs hash for the publicationId
  // and return it

  // otherwise return 403

  res.status(200).json({ ipfsHash: 'John Doe' })
}
