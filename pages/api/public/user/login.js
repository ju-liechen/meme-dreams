import { axiosClient } from 'util/server-only/axios-client'
import { cookieLogin } from 'util/server-only/cookies'

export default async (req, res) => {
  if (req.method !== 'POST')
    return res.status(405).end(`Method ${req.method} Not Allowed`)

  try {
    const {data: {token, ...rest}} = await axiosClient.post('/public/user/login', req.body)
    await cookieLogin({req, res, token})
    res.status(200).json({...rest, token: 'redacted'})
  } catch (err) {
    console.error(err)
    res.status(err.response?.status || 500).json(err.response?.data || {message: 'Internal server error'})
  }
}
