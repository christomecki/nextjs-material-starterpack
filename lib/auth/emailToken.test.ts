import { ObjectId } from 'mongodb';
import { isEmailVerificationPayload, emailTokenGenerator } from './emailToken';
import { UserWithId } from './userType';

describe('emailToken', () => {
  test('isEmailVerificationPayload', () => {
    const validPayload = {
      userId: 'test',
      createdAt: 0,
      maxAge: 0,
      chainNext: 'test',
      chainPrev: 'test',
    };
    expect(isEmailVerificationPayload(validPayload)).toBe(true);

    const invalidPayload = {
      createdAt: 0,
      maxAge: 0,
      chainNext: 'test',
      chainPrev: 'test',
    };
    expect(isEmailVerificationPayload(invalidPayload)).toBe(false);

    expect(isEmailVerificationPayload('')).toBe(false);
    expect(isEmailVerificationPayload(0)).toBe(false);
    expect(isEmailVerificationPayload(null)).toBe(false);
    expect(isEmailVerificationPayload(undefined)).toBe(false);
  });

  test('emailTokenGenerator', async () => {
    //32 characters long mock secret
    const mockSecret = '12345678901234567890123456789012';
    const { generateToken, verifyToken } = emailTokenGenerator(mockSecret, 10_000);

    const validUserWithId: UserWithId = {
      _id: new ObjectId(),
      createdAt: 0,
      email: 'asd@asd.pl',
      hash: 'asd',
      salt: 'asd',
      chain: 'test',
    };

    const token = await generateToken(validUserWithId);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);

    const payload = await verifyToken(token);
    expect(payload.userId).toBe(String(validUserWithId._id));
    expect(payload.createdAt).toBeGreaterThan(0);
    expect(payload.maxAge).toBe(10_000);
    expect(payload.chainPrev).toBe('test');
    expect(payload.chainPrev).not.toBe(payload.chainNext);
  });
});
