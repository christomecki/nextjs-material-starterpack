import { isFeedbackKey, feedbackUrlParam, FEEDBACKS, FeedbackKey } from './feedback';

describe('feedback', () => {
  test('isFeedbackKey', () => {
    for (const key in FEEDBACKS) {
      expect(isFeedbackKey(key)).toBe(true);
    }
    expect(isFeedbackKey('')).toBe(false);
    expect(isFeedbackKey('not a key')).toBe(false);
  });

  test('feedbackUrlParam', () => {
    for (const key in FEEDBACKS) {
      expect(feedbackUrlParam(key as FeedbackKey)).toBe(`feedback=${encodeURIComponent(key)}`);
    }
  });
});
