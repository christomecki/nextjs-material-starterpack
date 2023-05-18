/// <reference types="cypress" />

describe('Navigation', () => {
    it('should navigate to the about page', () => {
      // Start from the index page
      cy.visit('/');
   
      // Navigate to "about" page
      cy.get('a[href*="about"]').click();
   
      // Check the "about" page
      cy.url().should('include', '/about');

      // Nabigation by button "home"
      cy.get('a[href*="/"]').contains('home').click();

      // Navigate to "login" page
      cy.get('a[href*="/login"]').click();

      // Check the login page
      cy.url().should('include', '/login');
      cy.get('h1').contains('Sign in');

      // Check a logo navigation
      cy.get('a[href*="/"]').get('img').click();

    });
  });