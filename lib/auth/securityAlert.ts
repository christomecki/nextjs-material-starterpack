import { NextApiRequest } from 'next';
import smtp from '../smtp';
import { lastFailedLoginAttempt } from './user';

const RESET_PASSWORD_SECRET = process.env.RESET_PASSWORD_SECRET;
const EMAIL_FROM = process.env.EMAIL_FROM;
const BASE_URL = process.env.BASE_URL;

if (RESET_PASSWORD_SECRET == null) {
  throw new Error('RESET_PASSWORD_SECRET is undefined');
}

export async function wrongPasswordAlert(email: string) {
  if (EMAIL_FROM == null || BASE_URL == null) {
    console.error('EMAIL_FROM is undefiend');
    return;
  }
  const timestamp = new Date().toISOString();
  const message = 'Someone tried to log in to your account with the wrong password.';
  const subject = 'Sign-in attempt failed';
  const html = `<p>${message}</p> <p>Timestamp: ${timestamp}</p>`;
  const text = message;
  const from = EMAIL_FROM;
  const to = email;
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
