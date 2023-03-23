import crypto from "crypto";
import { database } from "../mongodb";
import { omit } from "lodash";
import { Session, getLoginSession } from "./auth";
import { RequestWithCookies } from "./types";

export type User = {
  createdAt: number;
  username: string;
  hash: string;
  salt: string;
};

export type UserWithId = User & {
  _id: string;
};

export function userDto(user: User) {
  return omit(user, ["hash", "salt", "_id"]) as Omit<User, "hash" | "salt" | "_id">;
}

export type UserDto = ReturnType<typeof userDto>;

const userCollection = database.collection<User>("user");

export async function createUser(username: string, password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  const user: User = {
    createdAt: Date.now(),
    username,
    hash,
    salt,
  };

  await userCollection.insertOne(user);

  return { username, createdAt: Date.now() };
}

export async function findUser(username: string) {
  return userCollection.findOne<UserWithId>({ username });
}

export function validatePassword(user: UserWithId, inputPassword: string) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512").toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}

export async function getUserFromSession(req: RequestWithCookies) {
  try {
    const session: Session = await getLoginSession(req);
    const user = (session && (await findUser((session.token as any).username))) ?? null;
    if (user == null) {
      return undefined;
    }
    return userDto(user);
  } catch (error) {
    return undefined;
  }
}
