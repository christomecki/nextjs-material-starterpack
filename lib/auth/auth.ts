import Iron from '@hapi/iron';
import { NextApiResponse } from 'next';
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies';
import { RequestWithCookies } from './types';
import { SessionData, isSession } from './session';
const TOKEN_SECRET = process.env.TOKEN_SECRET;

export async function setLoginSession(res: NextApiResponse, session: SessionData) {
  if (TOKEN_SECRET == null) {
    console.error('TOKEN_SECRET is undefiend');
    return;
  }
  const createdAt = Date.now();

  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
}

export async function getLoginSession(req: RequestWithCookies) {
  const token = getTokenCookie(req);

  if (TOKEN_SECRET == null) {
    throw new Error('TOKEN_SECRET is undefiend');
  }
  if (!token) {
    throw new Error('Session not found');
  }

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  if (!isSession(session)) {
    throw new Error('Session is invalid');
  }
  const expiresAt = session.createdAt + session.maxAge * 1000;

  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  return session;
}
