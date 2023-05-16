import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromSession_BackendOnly } from '@/lib/auth/user';
import { sendVerificationEmail } from '@/lib/auth/emailVerification';

export default async function resendConfirmationLink(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUserFromSession_BackendOnly(req);
  if (user == null) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  sendVerificationEmail(user); //no await

  res.status(200).json({ message: 'OK' });
}
