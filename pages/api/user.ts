import { NextApiRequest, NextApiResponse } from "next";
import { getLoginSession, Session } from "../../lib/auth";
import { findUser, userDto } from "../../lib/user";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: Session = await getLoginSession(req);
    console.log("session", session);
    const user = (session && (await findUser((session.token as any).username))) ?? null;
    if (user == null) {
      throw new Error("User not found");
    }
    res.status(200).json({ user: userDto(user) });
  } catch (error) {
    console.error(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
}
