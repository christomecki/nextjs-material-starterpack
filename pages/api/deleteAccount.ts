import { removeTokenCookie } from '@/lib/auth/auth-cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUserAccount, getUserFromSession_BackendOnly, validatePassword } from '@/lib/auth/user';

export default async function deleteAccount(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const user = await getUserFromSession_BackendOnly(req);
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  //addition check for password
  const passwordsMatch = validatePassword(user, req.body.password);
  if (!passwordsMatch) {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  if (!(await deleteUserAccount(user))) {
    res.status(500).json({ message: 'Internal server error' });
    return;
  }

  removeTokenCookie(res);
  res.end();
}
