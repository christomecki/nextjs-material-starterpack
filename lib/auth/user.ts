import crypto from 'crypto';
import { database } from '../mongodb';
import { omit } from 'lodash';
import { Session, getLoginSession } from './auth';
import { RequestWithCookies } from './types';
import { ObjectId } from 'mongodb';

export type User = {
  createdAt: number;
  email: string;
  hash: string;
  salt: string;
};

export type UserWithId = User & {
  _id: string;
};

export function userDto(user: User) {
  return omit(user, ['hash', 'salt', '_id']) as Omit<User, 'hash' | 'salt' | '_id'>;
}

export type UserDto = ReturnType<typeof userDto>;

const userCollection = database.collection<User>('user');

export async function createUser(email: string, password: string) {
  if (await findUser(email)) {
    throw new Error('User already exists');
  }
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  const user: User = {
    createdAt: Date.now(),
    email: email.toLowerCase(),
    hash,
    salt,
  };

  await userCollection.insertOne(user);

  return { email, createdAt: Date.now() };
}

export async function deleteUserAccount(user: UserWithId, password: string) {
  const passwordsMatch = validatePassword(user, password);
  if (!passwordsMatch) {
    console.log('passwordsMatch: ', passwordsMatch);
    return false;
  }
  await userCollection.deleteOne({ _id: new ObjectId(user._id) });
  console.log('isDeleted: ');
  return true;
}

export async function findUser(email: string) {
  return userCollection.findOne<UserWithId>({ email: email.toLowerCase() });
}

export function validatePassword(user: UserWithId, inputPassword: string) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex');
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}

export async function getUserFromSession(req: RequestWithCookies) {
  try {
    const session: Session = await getLoginSession(req);
    const user = (session && (await userCollection.findOne({ _id: new ObjectId(session.userId) }))) ?? null;
    if (user == null) {
      return undefined;
    }
    return userDto(user);
  } catch (error) {
    return undefined;
  }
}

export function isValidEmailAddress(emailAddress: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
}
