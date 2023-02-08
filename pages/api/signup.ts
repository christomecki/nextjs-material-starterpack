import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../lib/user";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const returnError = (error: any) => {
    console.error(error);
    res.status(500).end(error.message);
  };

  try {
    if (typeof req.body === "object") {
      const { username, password } = req.body;
      if (username != null && password != null) {
        await createUser(req.body?.username, req.body?.password);
        res.status(200).send({ done: true });
        return;
      }
    }
    returnError({
      message: "Wrong body payload",
    });
  } catch (error: any) {
    returnError(error);
  }
}
