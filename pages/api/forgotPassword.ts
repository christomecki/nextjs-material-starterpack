import { sendResetPasswordEmail } from '@/lib/auth/resetPassword';
import { findUserByEmail } from '@/lib/auth/user';
import { isUserConfirmedEmail } from '@/lib/auth/userType';
import { isValidEmailAddress } from '@/lib/auth/isValidEmailAddress';
import { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimiter } from '@/lib/auth/rateLimiterMiddleware';

export default withRateLimiter().post(async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.body.email;
  if (email == null || typeof email !== 'string' || !isValidEmailAddress(email)) {
    res.status(400).end('Bad Request');
    return;
  }

  const user = await findUserByEmail(email);
  if (user == null || !isUserConfirmedEmail(user)) {
    res.status(200).end('OK'); //ok, because we don't want to leak if an email exists
    return;
  }

  sendResetPasswordEmail(user); //no wait

  res.status(200).end('OK');
});
