import { verifyToken } from '@/lib/auth/emailVerification';
import { rateLimiterMiddlewareGenerator, standardRateLimitParams } from '@/lib/auth/rateLimiterMiddleware';
import { findUserById, confirmEmail } from '@/lib/auth/user';
import { feedbackUrlParam } from '@/lib/feedback';
import { NextApiRequest, NextApiResponse } from 'next';

const rateLimiterMiddleware = rateLimiterMiddlewareGenerator(standardRateLimitParams);

export default async function email(req: NextApiRequest, res: NextApiResponse) {
  await rateLimiterMiddleware(req, res, async () => {
    const { token } = req.query;

    if (typeof token !== 'string') {
      res.redirect(`/?${feedbackUrlParam('bad-request')}`);
      return;
    }
    try {
      const payload = await verifyToken(token as string);

      const user = await findUserById(payload.userId);
      if (user == null) {
        res.redirect(`/?${feedbackUrlParam('bad-request')}`);
        return;
      }

      if (user.chain !== payload.chainPrev) {
        res.redirect(`/?${feedbackUrlParam('link-expired')}`);
        return;
      }

      await confirmEmail(user, payload.chainNext);

      res.redirect(`/login?${feedbackUrlParam('email-verified')}`);
    } catch (error: any) {
      console.error(error);
      res.redirect(`/?${feedbackUrlParam('unexpected-error')}`);
    }
  });
}
