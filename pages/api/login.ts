import passport from "passport";
import nextConnect from "next-connect";
import { localStrategy } from "@/lib/auth/password-local";
import { setLoginSession } from "@/lib/auth/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "@/lib/auth/auth";

const authenticate = (method: string, req: NextApiRequest, res: NextApiResponse): Promise<string> =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error: any, token: Express.User) => {
      if (error) {
        reject(error as any);
      } else {
        resolve(token as string);
      }
    })(req, res);
  });

passport.use(localStrategy);

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const token = await authenticate("local", req, res);
      console.log("token");
      // session is the payload to save in the token, it may contain basic info about the user
      const session: Session = {
        token,
      };

      await setLoginSession(res, session);

      res.status(200).send({ done: true });
    } catch (error: any) {
      console.error(error);
      res.status(401).send(error.message);
    }
  });
