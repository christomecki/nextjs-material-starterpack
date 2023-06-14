import { isValidEmailAddress } from './isValidEmailAddress';

describe('isValidEmailAddress', () => {
  test('isValidEmailAddress', () => {
    expect(isValidEmailAddress('asd@asd.pl')).toBe(true);
    expect(isValidEmailAddress('asd@asd')).toBe(false);
    expect(isValidEmailAddress('asd.pl')).toBe(false);
    expect(isValidEmailAddress('asd')).toBe(false);
    expect(isValidEmailAddress('')).toBe(false);

    expect(isValidEmailAddress('asd@asd@asd.pl')).toBe(false);
    expect(isValidEmailAddress('asd@asd@asd')).toBe(false);
    expect(isValidEmailAddress('asd asd asd')).toBe(false);
    expect(isValidEmailAddress('asd asd @ asd.pl')).toBe(false);

    expect(isValidEmailAddress(0 as any)).toBe(false);
    expect(isValidEmailAddress(null as any)).toBe(false);
    expect(isValidEmailAddress(undefined as any)).toBe(false);
  });
});
