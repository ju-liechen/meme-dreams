import { axiosClient } from 'util/server-only/axios-client'
import { cookieLogin } from 'util/server-only/cookies'

export default async (req, res) => {
  if (req.method !== 'POST')
    return res.status(405).end(`Method ${req.method} Not Allowed`)

  const code = req.cookies['referral']
  try {
    const {data: {token, ...rest}} = await axiosClient.post('/public/user/signup', {...req.body, code})
    await cookieLogin({req, res, token})
    res.status(200).json({...rest, token: 'redacted'})
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || {message: 'Internal server error'})
  }
}
