
import { cookieLogout } from 'util/server-only/cookies'

export default async (req, res) => {
  if (req.method !== 'POST')
    return res.status(405).end(`Method ${req.method} Not Allowed`)

  await cookieLogout({req, res})
  return res.status(200).json({})
}

