import { pick } from 'lodash';
import { WithId } from 'mongodb';
import { STARTING_CHAIN } from './chain';

export type User = {
  createdAt: number;
  email: string;
  hash: string;
  salt: string;
  chain: string;
  lastLogin?: {
    timestamp: string;
    ip: string;
  };
  lastFailedLogin?: {
    timestamp: string;
    ip: string;
    userAgent: string;
  };
};

export type UserWithId = WithId<User>;

export function isUserConfirmedEmail(user: User) {
  return user.chain !== STARTING_CHAIN;
}

export function userDto(user: User) {
  const safeFields = pick(user, ['createdAt', 'email', 'lastLogin', 'lastFailedLogin']);
  return {
    ...safeFields,
    emailConfirmed: isUserConfirmedEmail(user),
  };
}

export type UserDto = ReturnType<typeof userDto>;
