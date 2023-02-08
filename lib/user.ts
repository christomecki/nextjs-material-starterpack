import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

type User = {
  id: string;
  createdAt: number;
  username: string;
  hash: string;
  salt: string;
};

let users: User[] = [
  {
    id: "b7143502-56b1-475b-b80c-ac465b3d93c9",
    createdAt: 1675876576757,
    username: "demo",
    hash: "5279de39ee88c06f8e9206e685b9613e8e6146384a1c07e3f45edee2b69f16ca39d98f6fca1a4b55a39947f7eaf1b23dfc53718451af30bd430870618ea9d0b5",
    salt: "f141d584996320ff079f759748f029b6",
  },
];

export async function createUser(username: string, password: string) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    username,
    hash,
    salt,
  };

  // This is an in memory store for users, there is no data persistence without a proper DB
  users.push(user);

  return { username, createdAt: Date.now() };
}

// Here you should lookup for the user in your DB
export async function findUser(username: string) {
  // This is an in memory store for users, there is no data persistence without a proper DB
  return users.find((user) => user.username === username);
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user: User, inputPassword: string) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
