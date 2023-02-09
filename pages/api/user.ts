import { NextApiRequest, NextApiResponse } from "next";
import { getLoginSession, Session } from "../../lib/auth";
import { findUser } from "../../lib/user";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: Session = await getLoginSession(req);
    console.log("session", session);
    const user = (session && (await findUser((session.token as any).username))) ?? null;

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
}
