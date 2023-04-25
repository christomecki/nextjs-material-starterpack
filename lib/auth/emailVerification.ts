import Iron from '@hapi/iron';
import { UserWithId } from './user';
import smtp from '../smtp';
import { v4 as uuidv4 } from 'uuid';

const EMAIL_VERIFICATION_SECRET = process.env.EMAIL_VERIFICATION_SECRET;
const MAX_AGE = 60 * 60 * 8; // 8 hours
const EMAIL_FROM = process.env.EMAIL_FROM;
const BASE_URL = process.env.BASE_URL;

export type EmailVerificationPayload = {
  userId: string;
  createdAt: number;
  maxAge: number;
  chainNext: string;
  chainPrev: string;
};

function isEmailVerificationPayload(payload: any): payload is EmailVerificationPayload {
  return (
    typeof payload === 'object' &&
    typeof payload.createdAt === 'number' &&
    typeof payload.maxAge === 'number' &&
    typeof payload.userId === 'string' &&
    typeof payload.chainNext === 'string' &&
    typeof payload.chainPrev === 'string'
  );
}

export async function generateToken(user: UserWithId) {
  if (EMAIL_VERIFICATION_SECRET == null) {
    console.error('EMAIL_VERIFICATION_SECRET is undefiend');
    return;
  }

  const payload: EmailVerificationPayload = {
    userId: String(user._id),
    createdAt: Date.now(),
    maxAge: MAX_AGE,
    chainPrev: user.chain,
    chainNext: uuidv4(),
  };
  const token = await Iron.seal(payload, EMAIL_VERIFICATION_SECRET, Iron.defaults);
  return token;
}

export async function verifyToken(token: string) {
  if (EMAIL_VERIFICATION_SECRET == null) {
    throw new Error('EMAIL_VERIFICATION_SECRET is undefiend');
  }

  const payload = await Iron.unseal(token, EMAIL_VERIFICATION_SECRET, Iron.defaults);
  if (!isEmailVerificationPayload(payload)) {
    throw new Error('Token is invalid');
  }

  const expiresAt = payload.createdAt + payload.maxAge * 1000;
  if (Date.now() > expiresAt) {
    throw new Error('Token expired');
  }

  return payload;
}

export async function sendVerificationEmail(user: UserWithId) {
  if (EMAIL_FROM == null || BASE_URL == null) {
    console.error('EMAIL_FROM is undefiend');
    return;
  }
  const token = await generateToken(user);
  const verificationUrl = `${BASE_URL}/api/email?token=${token}`;
  const message = `Please click the link below to verify your email address: ${verificationUrl}`;
  const subject = 'Verify your email address';
  const html = `<p>${message}</p>`;
  const text = message;
  const from = EMAIL_FROM;
  const to = user.email;
  try {
    const result = await smtp.sendAsync({
      from,
      to,
      subject,
      text,
      attachment: [{ data: html, alternative: true }],
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
