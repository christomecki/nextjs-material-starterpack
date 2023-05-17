import { sendResetPasswordEmail } from '@/lib/auth/resetPassword';
import { findUserByEmail, isUserConfirmedEmail } from '@/lib/auth/user';
import { isValidEmailAddress } from '@/lib/auth/isValidEmailAddress';
import { NextApiRequest, NextApiResponse } from 'next';
import { rateLimiterMiddlewareGenerator } from '@/lib/auth/rateLimiterMiddleware';

const rateLimiterMiddleware = rateLimiterMiddlewareGenerator({
  limit: 2,
  windowMs: 60 * 1000 * 30, // 30 minutes
});

export default async function forgotPassword(req: NextApiRequest, res: NextApiResponse) {
  await rateLimiterMiddleware(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).end('Method Not Allowed');
      return;
    }

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
}
