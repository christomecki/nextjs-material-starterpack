export default function passwordValidation(password: string) {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const hasNoSpaces = !/\s/.test(password);

  return { hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar, hasNoSpaces };
}

export function isPasswordValid(password: string) {
  const res = passwordValidation(password);
  return res.hasMinLength && res.hasUpperCase && res.hasLowerCase && res.hasNumber && res.hasSpecialChar && res.hasNoSpaces;
}
