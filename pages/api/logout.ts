import { NextApiRequest, NextApiResponse } from 'next';
import { removeTokenCookie } from '@/lib/auth/auth-cookies';
import { withRateLimiter } from '@/lib/auth/rateLimiterMiddleware';

export default withRateLimiter().get(async (req: NextApiRequest, res: NextApiResponse) => {
  removeTokenCookie(res);
  res.writeHead(302, { Location: '/' });
  res.end();
});
