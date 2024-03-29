import { NextApiRequest, NextApiResponse } from 'next';
import { findUserByEmail, generateSaltAndHash, updateUser, validatePassword } from '@/lib/auth/user';
import { isValidEmailAddress } from '@/lib/auth/isValidEmailAddress';
import passwordValidation, { isValidationValid } from '@/lib/auth/passwordValidaton';
import { setLoginSession } from '@/lib/auth/auth';
import { SessionData } from '@/lib/auth/session';
import { generateNextChain } from '@/lib/auth/chain';
import { withRateLimiter } from '@/lib/auth/rateLimiterMiddleware';

export default withRateLimiter().post(async (req: NextApiRequest, res: NextApiResponse) => {
  if (typeof req.body !== 'object') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  try {
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

      if (!validatePassword(user, oldpassword)) {
        res.status(401).send('Error');
        return;
      }

      const { hash, salt } = generateSaltAndHash(password);
      const chain = generateNextChain();

      await updateUser(user._id, { hash, salt, chain });

      const session: SessionData = {
        userId: String(user._id),
        chain,
      };

      await setLoginSession(res, session);

      res.status(200).send('OK');
    }
  } catch (error: any) {
    res.status(500).send('Error');
  }
});
