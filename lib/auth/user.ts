import crypto from 'crypto';
import { database } from '../mongodb';
import { getLoginSession } from './auth';
import { Session } from './session';
import { RequestWithCookies } from './types';
import { ObjectId } from 'mongodb';
import { STARTING_CHAIN } from './chain';
import { User, UserWithId, userDto } from './userType';

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

async function updateUser_unsafe(id: string | ObjectId, update: Partial<User>) {
  return await userCollection.updateOne({ _id: new ObjectId(id) }, { $set: update });
}

export async function updateUser(id: string | ObjectId, update: Partial<User>) {
  if (update.chain != null) {
    const user = await findUserById(id);
    if (user == null) {
      throw new Error('User not found');
    }
    if (user.chain === STARTING_CHAIN) {
      throw new Error('Cannot update user chain before email is confirmed');
    }
  }
  return await updateUser_unsafe(id, update);
}

export async function confirmEmail(user: UserWithId, nextChain: string) {
  if (user.chain !== STARTING_CHAIN) {
    throw new Error('User already confirmed email');
  }
  return await updateUser_unsafe(user._id, { chain: nextChain });
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
    if (user != null && user.chain !== session.chain) {
      return null;
    }
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
