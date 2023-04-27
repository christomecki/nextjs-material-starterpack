import { verifyToken } from '@/lib/auth/resetPassword';
import { findUserById, generateSaltAndHash, updateUser } from '@/lib/auth/user';
import { feedbackUrlParam } from '@/lib/feedback';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
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

    //if method is GET, redirect to a form. if method is POST, update the password
    if (req.method === 'GET') {
      res.redirect(`/resetPasswordForm?token=${token}`);
      return;
    } else if (req.method === 'POST') {
      const newPassword = req.body.password;
      if (newPassword != null && typeof newPassword !== 'string') {
        res.status(400).end('Bad Request');
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
    res.status(500).end('Bad Request');
  }
}
