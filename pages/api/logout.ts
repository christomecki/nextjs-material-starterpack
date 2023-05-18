import { NextApiRequest, NextApiResponse } from 'next';
import { removeTokenCookie } from '@/lib/auth/auth-cookies';
import { rateLimiterMiddlewareGenerator, standardRateLimitParams } from '@/lib/auth/rateLimiterMiddleware';

const rateLimiterMiddleware = rateLimiterMiddlewareGenerator(standardRateLimitParams);

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  await rateLimiterMiddleware(req, res, async () => {
    removeTokenCookie(res);
    res.writeHead(302, { Location: '/' });
    res.end();
  });
}
