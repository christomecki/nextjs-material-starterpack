import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, isValidEmailAddress } from '@/lib/auth/user';
import { sendVerificationEmail } from '@/lib/auth/emailVerification';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  const returnError = (error: any) => {
    console.error(error);
    res.status(500).end(error.message);
  };

  try {
    if (typeof req.body === 'object') {
      const { email, password } = req.body;
      if (email != null && isValidEmailAddress(email) && password != null) {
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
}
