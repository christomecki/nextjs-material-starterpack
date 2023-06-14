/// <reference types="cypress" />

import { LoginDetails } from './LoginDetails';

describe('LoginDetails', () => {
  it('should show the last login', () => {
    const IP = '123.123.123.123';
    cy.mount(<LoginDetails lastLogin={{ timestamp: '8/2/2021, 8:00:00 AM', ip: IP }} lastFailedLogin={undefined} />);
    cy.contains('Last login');
    cy.contains('Time:');
    cy.contains('Address IP:');
    cy.contains(IP);

    cy.contains('Last failed login').should('not.exist');
  });
  it('should show the last failed login', () => {
    const IP = '123.123.123.123';
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
    cy.mount(<LoginDetails lastLogin={undefined} lastFailedLogin={{ timestamp: '8/2/2021, 8:00:00 AM', ip: IP, userAgent }} />);
    cy.contains('Last failed login');
    cy.contains('Time:');
    cy.contains('Address IP:');
    cy.contains(IP);
    cy.contains('User agent:');
    cy.contains(userAgent);

    cy.contains('Last login').should('not.exist');
  });
  it('should show both last login and last failed login', () => {
    const IP = '123.123.123.123';
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
    cy.mount(
      <LoginDetails lastLogin={{ timestamp: '8/2/2021, 8:00:00 AM', ip: IP }} lastFailedLogin={{ timestamp: '8/2/2021, 8:00:00 AM', ip: IP, userAgent }} />
    );
    cy.contains('Last login');
    cy.contains(IP);

    cy.contains('Last failed login');
    cy.contains('Time:');
    cy.contains('Address IP:');

    cy.contains('User agent:');
    cy.contains(userAgent);
  });
});
