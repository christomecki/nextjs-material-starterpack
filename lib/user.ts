import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { database } from "./mongodb";

type User = {
  createdAt: number;
  username: string;
  hash: string;
  salt: string;
};

type UserWithId = User & {
  _id: string;
};

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
  return userCollection.findOne<User>({ username });
}

export function validatePassword(user: UserWithId, inputPassword: string) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512").toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
