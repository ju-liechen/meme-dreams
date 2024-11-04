import { cookieToken } from 'util/server-only/cookies'

export default async (req, res) => {
  const token = await cookieToken({req, res})
  res.status(200).json({
    isLoggedIn: Boolean(token)
  })
}
