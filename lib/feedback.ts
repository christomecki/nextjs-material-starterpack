export type FeedbackItem = {
  text: string;
  type: 'error' | 'success' | 'warning' | 'info';
};

export const FEEDBACKS = {
  'email-verified': {
    text: 'Your email has been verified.',
    type: 'success',
  },
  'unexpected-error': {
    text: 'An unexpected error occurred.',
    type: 'error',
  },
  'password-reset-email': {
    text: 'If acount exists a password reset email has been sent.',
    type: 'success',
  },
  'password-reset-success': {
    text: 'Your password has been reset.',
    type: 'success',
  },
  'bad-request': {
    text: 'Bad Request',
    type: 'error',
  },
  'already-logged-in': {
    text: 'You are already logged in.',
    type: 'warning',
  },
};

export type FeedbackKey = keyof typeof FEEDBACKS;

export function isFeedbackKey(key: any): key is FeedbackKey {
  return key != null && typeof key === 'string' && key in FEEDBACKS;
}

export function feedbackUrlParam(key: FeedbackKey) {
  return `feedback=${encodeURIComponent(key)}`;
}
