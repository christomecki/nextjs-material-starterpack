import { NextApiRequest, NextApiResponse } from 'next';
import { removeTokenCookie } from '@/lib/auth/auth-cookies';
import { getUserFromSession_BackendOnly, updateUser } from '@/lib/auth/user';
import { generateNextChain } from '@/lib/auth/chain';
import { withRateLimiter } from '@/lib/auth/rateLimiterMiddleware';

export default withRateLimiter().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromSession_BackendOnly(req);
  if (user == null) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  await updateUser(user._id, {
    chain: generateNextChain(),
  });

  removeTokenCookie(res);
  res.writeHead(302, { Location: '/' });
  res.end();
});
