import { isSession, Session } from './session';

describe('session', () => {
  test('isSession', () => {
    const validSession: Session = {
      userId: 'test',
      chain: 'test',
      createdAt: 0,
      maxAge: 0,
    };
    expect(isSession(validSession)).toBe(true);

    const invalidSession = {
      createdAt: 0,
      maxAge: 0,
    };
    expect(isSession(invalidSession)).toBe(false);

    const invalidSession2 = {
      userId: 0,
      chain: 'test',
      createdAt: 0,
      maxAge: 0,
    };
    expect(isSession(invalidSession2)).toBe(false);

    expect(isSession('')).toBe(false);
    expect(isSession(0)).toBe(false);
    expect(isSession(null)).toBe(false);
    expect(isSession(undefined)).toBe(false);
  });
});
