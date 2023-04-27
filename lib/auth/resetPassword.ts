import { UserWithId } from './user';
import smtp from '../smtp';
import { emailTokenGenerator } from './emailToken';

const RESET_PASSWORD_SECRET = process.env.RESET_PASSWORD_SECRET;
const MAX_AGE = 60 * 60 * 8; // 8 hours
const EMAIL_FROM = process.env.EMAIL_FROM;
const BASE_URL = process.env.BASE_URL;

if (RESET_PASSWORD_SECRET == null) {
  throw new Error('RESET_PASSWORD_SECRET is undefined');
}

export const { generateToken, verifyToken } = emailTokenGenerator(RESET_PASSWORD_SECRET, MAX_AGE);

export async function sendResetPasswordEmail(user: UserWithId) {
  if (EMAIL_FROM == null || BASE_URL == null) {
    console.error('EMAIL_FROM is undefiend');
    return;
  }
  const token = await generateToken(user);
  const verificationUrl = `${BASE_URL}/api/resetPassword?token=${token}`;
  const message = `Please click the link below to reset your password: ${verificationUrl}`;
  const subject = 'Reset your password';
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
