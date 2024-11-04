import { getIronSession } from 'iron-session'
import { sessionOptions } from 'util/server-only/iron-session'

export const cookieToken = async ({req, res}) => {
  const session = await getIronSession(req, res, sessionOptions)
  return session.token
}

export const cookieLogin = async ({req, res, token}) => {
  const session = await getIronSession(req, res, sessionOptions)
  session.token = token
  await session.save()
}

export const cookieLogout = async ({req, res}) => {
  const session = await getIronSession(req, res, sessionOptions)
  session.destroy()
}

