import { removeTokenCookie } from '@/lib/auth/auth-cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUserAccount, findUser, getUserFromSession } from '@/lib/auth/user';

export default async function deleteAccount(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUserFromSession(req);
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const findedUser = await findUser(user.email);
  if (!findedUser) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const isDeleted = await deleteUserAccount(findedUser, req.body.password);
  if (!isDeleted) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  removeTokenCookie(res);
  res.writeHead(302, { Location: '/' });
  res.end();
}
