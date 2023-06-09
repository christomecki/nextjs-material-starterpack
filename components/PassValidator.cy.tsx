/// <reference types="cypress" />

import { PasswordValidation } from '@/lib/auth/passwordValidaton';
import { PasswordStrengthMeter } from '@/components/PassValidator';

describe('PassValidator', () => {
  it('all correct', () => {
    const validation: PasswordValidation = {
      hasMinLength: true,
      hasUpperCase: true,
      hasLowerCase: true,
      hasNumber: true,
      hasSpecialChar: true,
      hasNoSpaces: true,
    };

    cy.mount(<PasswordStrengthMeter validation={validation} />);

    cy.get('[data-cy=correct]').should('have.length', 6);
    cy.get('[data-cy=incorrect]').should('have.length', 0);
  });
  it('all incorrect', () => {
    const validation: PasswordValidation = {
      hasMinLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
      hasNoSpaces: false,
    };

    cy.mount(<PasswordStrengthMeter validation={validation} />);
    cy.get('[data-cy=correct]').should('have.length', 0);
    cy.get('[data-cy=incorrect]').should('have.length', 6);
  });
  it('some correct some incorrect', () => {
    const validation: PasswordValidation = {
      hasMinLength: false,
      hasUpperCase: true,
      hasLowerCase: false,
      hasNumber: true,
      hasSpecialChar: false,
      hasNoSpaces: true,
    };

    cy.mount(<PasswordStrengthMeter validation={validation} />);
    cy.get('[data-cy=correct]').should('have.length', 3);
    cy.get('[data-cy=incorrect]').should('have.length', 3);
  });
});
