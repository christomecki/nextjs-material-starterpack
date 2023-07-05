import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/lib/auth/user';
import { isValidEmailAddress } from '@/lib/auth/isValidEmailAddress';
import { sendVerificationEmail } from '@/lib/auth/emailVerification';
import { isPasswordValid } from '@/lib/auth/passwordValidaton';
import { withRateLimiter } from '@/lib/auth/rateLimiterMiddleware';

export default withRateLimiter('login-related').post(async (req: NextApiRequest, res: NextApiResponse) => {
  const returnError = (error: any) => {
    console.error(error);
    res.status(500).end(error.message);
  };

  try {
    if (typeof req.body === 'object') {
      const { email, password } = req.body;

      if (email != null && isValidEmailAddress(email) && isPasswordValid(password)) {
        const newUser = await createUser(email, password);
        sendVerificationEmail(newUser); //no await

        res.status(200).send({ done: true });
        return;
      }
    }
    returnError({
      message: 'Wrong body payload',
    });
  } catch (error: any) {
    returnError(error);
  }
});
