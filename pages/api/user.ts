import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromSession } from '@/lib/auth/user';
import { rateLimiterMiddlewareGenerator, standardRateLimitParams } from '@/lib/auth/rateLimiterMiddleware';

const rateLimiterMiddleware = rateLimiterMiddlewareGenerator(standardRateLimitParams);

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  await rateLimiterMiddleware(req, res, async () => {
    const user = await getUserFromSession(req);
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(500).end('Authentication token is invalid, please log in');
    }
  });
}
