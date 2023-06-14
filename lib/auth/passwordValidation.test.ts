import { isPasswordValid, isValidationValid } from './passwordValidaton';

describe('passwordValidation', () => {
  test('isPasswordValid', () => {
    expect(isPasswordValid('')).toBe(false);
    expect(isPasswordValid('a')).toBe(false);
    expect(isPasswordValid('A')).toBe(false);
    expect(isPasswordValid('1')).toBe(false);
    expect(isPasswordValid('!')).toBe(false);
    expect(isPasswordValid('aA1!')).toBe(false);
    expect(isPasswordValid('aA1! aA1! ')).toBe(false);

    expect(isPasswordValid('aA1!aA1!')).toBe(true);
  });

  test('isValidationValid', () => {
    const validation = { hasMinLength: false, hasUpperCase: false, hasLowerCase: false, hasNumber: false, hasSpecialChar: false, hasNoSpaces: false };

    expect(isValidationValid(validation)).toBe(false);

    validation.hasMinLength = true;
    expect(isValidationValid(validation)).toBe(false);

    validation.hasUpperCase = true;
    expect(isValidationValid(validation)).toBe(false);

    validation.hasLowerCase = true;
    expect(isValidationValid(validation)).toBe(false);

    validation.hasNumber = true;
    expect(isValidationValid(validation)).toBe(false);

    validation.hasSpecialChar = true;
    expect(isValidationValid(validation)).toBe(false);

    validation.hasNoSpaces = true;
    expect(isValidationValid(validation)).toBe(true);
  });
});
