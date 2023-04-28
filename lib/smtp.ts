import { SMTPClient } from 'emailjs';

const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

if (!EMAIL_FROM || !EMAIL_HOST || !EMAIL_USER || !EMAIL_PASSWORD) {
  throw new Error('Invalid/Missing environment variable: "EMAIL_FROM", "EMAIL_HOST", "EMAIL_USER", "EMAIL_PASSWORD"');
}

const client = new SMTPClient({
  user: EMAIL_USER,
  password: EMAIL_PASSWORD,
  host: EMAIL_HOST,
  ssl: true,
});
export default client;
