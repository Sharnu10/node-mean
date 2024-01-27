/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare namespace Cypress {
  interface Chainable {
    //       login(email: string, password: string): Chainable<void>
    //       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    //       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    //       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    showFieldError(fieldName: string, errorMessage: string): Chainable<void>;
    showFieldMinLengthError(
      fieldName: string,
      errorMessage: string
    ): Chainable<void>;
  }
}

Cypress.Commands.add('showFieldError', (fieldName, errorMessage) => {
  cy.get(fieldName).should('exist').focus();
  cy.get('[type="submit"]').focus();

  cy.get('.alert-danger').should('contain', errorMessage);
});

Cypress.Commands.add('showFieldMinLengthError', (fieldName, errorMessage) => {
  cy.get(fieldName).should('exist').focus().type('asc');
  cy.get('[type="submit"]').focus();

  cy.get('.alert-danger').should('contain', errorMessage);
});
