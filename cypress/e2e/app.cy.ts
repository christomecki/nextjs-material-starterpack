/// <reference types="cypress" />

describe('Navigation', () => {
  it('should navigate to about page and back to home page', () => {
    // Start from the index page
    cy.visit('/');

    // Navigate to "about" page
    cy.get('a[href*="about"]').click();

    // Check the "about" page
    cy.url().should('include', '/about');

    // Nabigation by button "home"
    cy.get('a[href*="/"]').contains('home').click();

    // Navigate to "about" page
    cy.get('a[href*="/about"]').click();

    // Check the login page
    cy.url().should('include', '/about');

    // Check a logo navigation
    cy.get('a[href*="/"]').get('img').click();
  });

  it('Navigation on login page, create accound, forgot password', () => {
    // Start from the index page
    cy.visit('/');

    // Navigate to "login" page
    cy.get('a[href*="/login"]').click();

    // Check the "login" page
    cy.url().should('include', '/login');

    // Click on login with empty input fields
    cy.get('button[type*="submit"]').click();

    // Check if required is working
    cy.get('p').contains('Email');

    // Check if required is working
    cy.get('p').contains('Password is required');

    // Check navigation to forgotPassword
    cy.get('a[href*="/forgotPassword"]').click();

    // Check the "forgotPassword" page
    cy.url().should('include', '/forgotPassword');

    // Navigate to "login" page
    cy.get('a[href*="/login"]').click();

    // Navigate to "Create account" page
    cy.get('a[href*="/signup"]').click();

    // Check the "Create account" page
    cy.url().should('include', '/signup');

    // Click on "I have arleady account"
    cy.get('a[href*="/login"]').click();

    // Check the "Create account" page
    cy.url().should('include', '/login');
  });
});
