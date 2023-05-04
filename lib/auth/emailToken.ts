import Iron from '@hapi/iron';
import { UserWithId, generateNextChain } from './user';

export type EmailVerificationPayload = {
  userId: string;
  createdAt: number;
  maxAge: number;
  chainNext: string;
  chainPrev: string;
};

export function isEmailVerificationPayload(payload: any): payload is EmailVerificationPayload {
  return (
    typeof payload === 'object' &&
    typeof payload.createdAt === 'number' &&
    typeof payload.maxAge === 'number' &&
    typeof payload.userId === 'string' &&
    typeof payload.chainNext === 'string' &&
    typeof payload.chainPrev === 'string'
  );
}

export const emailTokenGenerator = (secret: string, maxAge: number) => ({
  generateToken: async (user: UserWithId) => {
    const payload: EmailVerificationPayload = {
      userId: String(user._id),
      createdAt: Date.now(),
      maxAge: maxAge,
      chainPrev: user.chain,
      chainNext: generateNextChain(),
    };
    const token = await Iron.seal(payload, secret, Iron.defaults);
    return token;
  },
  verifyToken: async (token: string) => {
    const payload = await Iron.unseal(token, secret, Iron.defaults);
    if (!isEmailVerificationPayload(payload)) {
      throw new Error('Token is invalid');
    }

    const expiresAt = payload.createdAt + payload.maxAge * 1000;
    if (Date.now() > expiresAt) {
      throw new Error('Token expired');
    }

    return payload;
  },
});
