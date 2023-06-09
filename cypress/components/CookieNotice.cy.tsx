/// <reference types="cypress" />

import { CookieNotice, COOKIE_NAME, COOKIE_CONTENT } from '@/components/CookieNotice';

describe('CookieNotice', () => {
  it('should show the cookie notice', () => {
    cy.clearAllCookies();
    cy.mount(<CookieNotice />);
    cy.get('button').should('be.visible');
    cy.get('button').click();
    cy.wait(500);
    cy.getCookie(COOKIE_NAME).should('exist');
    cy.get('button').should('not.exist');
  });
  it('should not show the cookie notice', () => {
    cy.setCookie(COOKIE_NAME, 'true');
    cy.mount(<CookieNotice />);
    cy.get('button').should('not.exist');
  });
});
