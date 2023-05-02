import crypto from 'crypto';
import { database } from '../mongodb';
import { omit } from 'lodash';
import { Session, getLoginSession } from './auth';
import { RequestWithCookies } from './types';
import { ObjectId, WithId } from 'mongodb';

export type User = {
  createdAt: number;
  email: string;
  hash: string;
  salt: string;
  chain: string;
};

export type UserWithId = WithId<User>;

export const STARTING_CHAIN = '0';

export function userDto(user: User) {
  const safeFields = omit(user, ['hash', 'salt', '_id', 'chain']) as Omit<User, 'hash' | 'salt' | '_id' | 'chain'>;
  return {
    ...safeFields,
    emailConfirmed: user.chain !== STARTING_CHAIN,
  };
}

export type UserDto = ReturnType<typeof userDto>;

const userCollection = database.collection<User>('user');

export function generateSaltAndHash(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

export async function createUser(email: string, password: string): Promise<UserWithId> {
  if (await findUserByEmail(email)) {
    throw new Error('User already exists');
  }
  const { salt, hash } = generateSaltAndHash(password);
  const user: User = {
    createdAt: Date.now(),
    email: email.toLowerCase(),
    hash,
    salt,
    chain: STARTING_CHAIN,
  };

  const insertOneResult = await userCollection.insertOne(user);

  return { ...user, _id: insertOneResult.insertedId };
}

export async function deleteUserAccount(user: UserWithId) {
  const res = await userCollection.deleteOne({ _id: new ObjectId(user._id) });
  return res.deletedCount === 1;
}

export async function findUserByEmail(email: string) {
  return await userCollection.findOne<UserWithId>({ email: email.toLowerCase() });
}

export async function findUserById(id: string | ObjectId) {
  return await userCollection.findOne({ _id: new ObjectId(id) });
}

export async function updateUser(id: string | ObjectId, update: Partial<User>) {
  return await userCollection.updateOne({ _id: new ObjectId(id) }, { $set: update });
}

export function validatePassword(user: UserWithId, inputPassword: string) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex');
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}

export async function getUserFromSession_BackendOnly(req: RequestWithCookies) {
  try {
    const session: Session = await getLoginSession(req);
    const user = (session && (await userCollection.findOne({ _id: new ObjectId(session.userId) }))) ?? null;
    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserFromSession(req: RequestWithCookies) {
  try {
    const user = await getUserFromSession_BackendOnly(req);
    if (user == null) {
      return null;
    }
    return userDto(user);
  } catch (error) {
    return null;
  }
}

export function isValidEmailAddress(emailAddress: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
}
