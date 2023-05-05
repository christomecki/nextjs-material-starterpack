import { sendResetPasswordEmail } from '@/lib/auth/resetPassword';
import { findUserByEmail, isUserConfirmedEmail, isValidEmailAddress } from '@/lib/auth/user';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function forgotPassword(req: NextApiRequest, res: NextApiResponse) {
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
}
