import passport from 'passport';
import nextConnect from 'next-connect';
import { localStrategy } from '@/lib/auth/password-local';
import { SessionData, setLoginSession } from '@/lib/auth/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserWithId } from '@/lib/auth/user';

const authenticate = (method: string, req: NextApiRequest, res: NextApiResponse): Promise<UserWithId> =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error: any, user: UserWithId) => {
      if (error) {
        reject(error as any);
      } else {
        resolve(user);
      }
    })(req, res);
  });

passport.use(localStrategy);

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate('local', req, res);

      const session: SessionData = {
        userId: String(user._id),
        chain: user.chain,
      };

      await setLoginSession(res, session);

      res.status(200).send({ done: true });
    } catch (error: any) {
      console.error(error);
      res.status(401).send(error.message);
    }
  });
