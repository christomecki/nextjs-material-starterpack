export type FeedbackItem = {
  text: string;
  type: 'error' | 'success' | 'warning' | 'info';
};

export const FEEDBACKS: Record<string, FeedbackItem> = {
  'email-verified': {
    text: 'Your email has been verified.',
    type: 'success',
  },
};

export type FeedbackKey = keyof typeof FEEDBACKS;

export function isFeedbackKey(key: any): key is FeedbackKey {
  return key != null && typeof key === 'string' && key in FEEDBACKS;
}

export function feedbackUrlParam(key: FeedbackKey) {
  return `feedback=${encodeURIComponent(key)}`;
}
