import { verifyToken } from '@/lib/auth/emailVerification';
import { findUserById, updateUser } from '@/lib/auth/user';
import { feedbackUrlParam } from '@/lib/feedback';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function email(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (typeof token !== 'string') {
    res.status(400).end('Bad Request');
    return;
  }
  try {
    const payload = await verifyToken(token as string);

    const user = await findUserById(payload.userId);
    if (user == null) {
      res.status(400).end('Bad Request');
      return;
    }

    if (user.chain !== payload.chainPrev) {
      res.status(400).end('Bad Request');
      return;
    }

    await updateUser(user._id, {
      chain: payload.chainNext,
    });

    res.redirect(`/?${feedbackUrlParam('email-verified')}`);
  } catch (error: any) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
