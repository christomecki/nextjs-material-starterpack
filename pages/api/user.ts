import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromSession } from '@/lib/auth/user';
import { withRateLimiter } from '@/lib/auth/rateLimiterMiddleware';

export default withRateLimiter().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromSession(req);
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(500).end('Authentication token is invalid, please log in');
  }
});
