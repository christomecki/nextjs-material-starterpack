import { NextApiRequest, NextApiResponse } from 'next';
import { findUserByEmail, generateNextChain, updateUser } from '@/lib/auth/user';
import { isValidEmailAddress } from '@/lib/auth/isValidEmailAddress';
import passwordValidation, { isValidationValid } from '@/lib/auth/passwordValidaton';
import crypto from 'crypto';
import { SessionData, setLoginSession } from '@/lib/auth/auth';

export default async function changePassword(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (typeof req.body === 'object') {
      const { password, oldpassword, email } = req.body;
      if (email != null && isValidEmailAddress(email) && isValidationValid(passwordValidation(password))) {
        const user = await findUserByEmail(email);
        if (!user) {
          res.status(401).send('Error');
          return;
        }
        if (oldpassword === password) {
          res.status(401).send('Error');
          return;
        }
        const oldHash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
        if (oldHash === user.hash) {
          res.status(401).send('Error');
          return;
        }
        const salt = crypto.randomBytes(16).toString('hex');
        const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

        const newChain = generateNextChain();

        await updateUser(user._id, { hash: newHash, salt: salt, chain: newChain });

        const session: SessionData = {
          userId: String(user._id),
          chain: newChain,
        };

        await setLoginSession(res, session);

        res.status(200).send('OK');
      }
    }
  } catch (error: any) {}
}
