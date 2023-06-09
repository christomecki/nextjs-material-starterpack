/// <reference types="cypress" />

import ProfileInfo from './ProfileInfo';

describe('ProfileInfo', () => {
  it('should show the user email', () => {
    const email = 'asd@asd.pl';
    cy.mount(<ProfileInfo user={{ email, emailConfirmed: false, createdAt: 123123123 }} />);
    cy.contains(email);
  });
  it('should show the email confirmation status: notconfirmed', () => {
    const email = 'asd@asd.pl';
    cy.mount(<ProfileInfo user={{ email, emailConfirmed: false, createdAt: 123123123 }} />);
    cy.get('[data-cy=notconfirmed]').should('be.visible');
  });
  it('should show the email confirmation status: confirmed', () => {
    const email = 'asd@asd.pl';
    cy.mount(<ProfileInfo user={{ email, emailConfirmed: true, createdAt: 123123123 }} />);
    cy.get('[data-cy=notconfirmed]').should('not.exist');
  });
});
