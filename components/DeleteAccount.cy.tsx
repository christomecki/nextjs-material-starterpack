/// <reference types="cypress" />

import DeleteAccount from '@/components/DeleteAccount';

describe('DeleteAccount', () => {
  it('should show the delete account form', () => {
    cy.mount(<DeleteAccount />);
    cy.get('form').should('be.visible');
    cy.get('input').should('be.visible');
    cy.get('button').should('be.visible');
  });
  it('should send the form', () => {
    cy.mount(<DeleteAccount />);
    cy.get('input').type('password');

    cy.intercept('POST', '/api/deleteAccount', {
      statusCode: 200,
      body: {},
    }).as('deleteAccount');

    cy.get('form').submit();
    cy.wait(500);

    cy.get('@deleteAccount').its('request.body').should('deep.equal', {
      password: 'password',
    });
  });
});
