import passport from 'passport';
import nextConnect from 'next-connect';
import { InvalidEmailPasswordCombination, localStrategy } from '@/lib/auth/password-local';
import { setLoginSession } from '@/lib/auth/auth';
import { SessionData } from '@/lib/auth/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { findUserByEmail, updateUser } from '@/lib/auth/user';
import { UserWithId } from '@/lib/auth/userType';
import { wrongPasswordAlert } from '@/lib/auth/securityAlert';
import { isValidEmailAddress } from '@/lib/auth/isValidEmailAddress';
import { loginRelatedRateLimiterMiddleware } from '@/lib/auth/rateLimiterMiddleware';

const authenticate = (method: string, req: NextApiRequest, res: NextApiResponse): Promise<UserWithId> =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error: any, user: UserWithId) => {
      if (error || !user) {
        reject(error as any);
      } else {
        resolve(user);
      }
    })(req, res);
  });

passport.use(localStrategy);

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(passport.initialize())
  .use(loginRelatedRateLimiterMiddleware)
  .post(async (req, res) => {
    try {
      const user = await authenticate('local', req, res);

      const session: SessionData = {
        userId: String(user._id),
        chain: user.chain,
      };

      await setLoginSession(res, session);
      updateUser(user._id, {
        lastLogin: {
          timestamp: new Date().toISOString(),
          ip: req.socket.remoteAddress ?? '',
        },
      });
      res.status(200).send({ done: true });
    } catch (error: any) {
      if (error instanceof InvalidEmailPasswordCombination) {
        handleInvalidLogin(req); //not awaiting
      } else {
        console.error(error);
      }
      res.status(401).send('Unauthorized');
    }
  });

async function handleInvalidLogin(req: NextApiRequest) {
  try {
    const email = req.body.email;
    if (email && typeof email === 'string' && isValidEmailAddress(email)) {
      const user = await findUserByEmail(email);
      if (user) {
        wrongPasswordAlert(user.email);
        updateUser(user._id, {
          lastFailedLogin: {
            timestamp: new Date().toISOString(),
            ip: req.socket.remoteAddress ?? '',
            userAgent: req.headers['user-agent'] ?? '',
          },
        });
      }
    }
  } catch (e) {
    console.log('handleInvalidLogin error', e);
  }
}
