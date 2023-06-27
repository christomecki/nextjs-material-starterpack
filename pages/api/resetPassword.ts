import { withRateLimiter } from '@/lib/auth/rateLimiterMiddleware';
import { verifyToken } from '@/lib/auth/resetPassword';
import { findUserById, generateSaltAndHash, updateUser } from '@/lib/auth/user';
import { feedbackUrlParam } from '@/lib/feedback';
import { NextApiRequest, NextApiResponse } from 'next';

//if method is GET, redirect to a form. if method is POST, update the password
export default withRateLimiter().all(async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query;

  if (typeof token !== 'string') {
    res.redirect(`/?${feedbackUrlParam('bad-request')}`);
    return;
  }
  try {
    const payload = await verifyToken(token as string);

    const user = await findUserById(payload.userId);
    if (user == null) {
      res.redirect(`/?${feedbackUrlParam('bad-request')}`);
      return;
    }

    if (user.chain !== payload.chainPrev) {
      res.redirect(`/?${feedbackUrlParam('link-expired')}`);
      return;
    }

    if (req.method === 'GET') {
      res.redirect(`/resetPasswordForm?token=${token}`);
      return;
    } else if (req.method === 'POST') {
      const newPassword = req.body.password;
      if (newPassword != null && typeof newPassword !== 'string') {
        res.redirect(`/?${feedbackUrlParam('bad-request')}`);
        return;
      }
      const { salt, hash } = generateSaltAndHash(newPassword);
      await updateUser(user._id, {
        chain: payload.chainNext,
        hash,
        salt,
      });
      res.status(200).end('OK');
    }
  } catch (error: any) {
    console.error(error);
    res.redirect(`/?${feedbackUrlParam('unexpected-error')}`);
  }
});
