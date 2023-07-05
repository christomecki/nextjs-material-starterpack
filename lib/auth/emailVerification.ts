import { UserWithId } from './userType';
import smtp from '../smtp';
import { emailTokenGenerator } from './emailToken';

const EMAIL_VERIFICATION_SECRET = process.env.EMAIL_VERIFICATION_SECRET;
const MAX_AGE = 60 * 60 * 8; // 8 hours
const EMAIL_FROM = process.env.EMAIL_FROM;
const BASE_URL = process.env.BASE_URL;

if (EMAIL_VERIFICATION_SECRET == null) {
  throw new Error('EMAIL_VERIFICATION_SECRET is undefined');
}

export const { generateToken, verifyToken } = emailTokenGenerator(EMAIL_VERIFICATION_SECRET, MAX_AGE);

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
