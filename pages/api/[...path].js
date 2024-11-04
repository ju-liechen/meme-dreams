import httpProxy from 'http-proxy'
import { cookieToken } from 'util/server-only/cookies'

const API_URL = process.env.API_URL

if (!API_URL) {
  console.warn('API_URL environment variable missing')
} else if (API_URL.endsWith('/api')) {
  console.warn('Environment variable API_URL should not include /api at the end')
}

const proxy = httpProxy.createProxyServer()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req, res) => {
  console.log('-', req.method, req.url)
  const token = await cookieToken({req, res})
  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`
  }
  return proxy.web(
    req,
    res,
    { target: API_URL, changeOrigin: true },
  )
}

