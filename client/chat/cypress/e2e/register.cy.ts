/// <reference types="cypress" />
// import '../support/commands';

describe('Register page ', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.fixture('urls').then((urlsData) => {
      this.urls = urlsData;
    });
  });

  it('should display Register button', () => {
    cy.get('.btn-secondary').should('contain', 'Register');
  });

  it('should visit new urls', () => {
    cy.get('.btn-secondary').focus().click();
    cy.location('href').should('eq', this.urls.register);
  });

  it('should display Register title', () => {
    cy.visit(this.urls.register);
    cy.get('.page-header').should('contain', 'Register');
  });

  it('should show form with 3 fields, submit button', () => {
    cy.visit(this.urls.register);
    cy.get('#username').should('exist');
    cy.get('#password').should('exist');
    cy.get('#confirmPassword').should('exist');
    cy.get('[type="submit"]').should('exist');
  });

  it('should show error if username is empty', () => {
    cy.visit(this.urls.register);
    cy.showFieldError('#username', 'Username is required');
  });

  it('should show error if password is empty', () => {
    cy.visit(this.urls.register);
    cy.showFieldError('#password', 'password is required');
  });

  it('should show error if confirmPassword is empty', () => {
    cy.visit(this.urls.register);
    cy.showFieldError('#confirmPassword', 'confirmPassword is required');
  });

  it('should show error if username length less then minimum', () => {
    cy.visit(this.urls.register);
    cy.showFieldMinLengthError('#username', 'minimun length of User Name is 4');
  });

  it('should show error if password length less then minimum', () => {
    cy.visit(this.urls.register);
    cy.showFieldMinLengthError('#password', 'minimun length of password is 4');
  });

  it('should show error if confirmPassword length less then minimum', () => {
    cy.visit(this.urls.register);
    cy.showFieldMinLengthError(
      '#confirmPassword',
      'minimun length of confirm password is 4'
    );
  });

  it('should show error is user already exist', () => {
    cy.visit(this.urls.register);
    cy.get('#username').type('test1');
    cy.get('#password').type('test');
    cy.get('#confirmPassword').type('test');
    cy.get('[type="submit"]').click();
    // cy.get('.overlay-container');
    cy.get('.overlay-container > #toast-container', { timeout: 2000 })
      .should('exist')
      .contains(' Username is already in use.');
  });

  it('should fill form and submit', () => {
    cy.visit(this.urls.register);
    cy.get('#username').type('test2');
    cy.get('#password').type('test');
    cy.get('#confirmPassword').type('test');
    cy.get('[type="submit"]').click();
    cy.get('.ng-star-inserted > p').should('contain', 'login works!');
    cy.get('.overlay-container > #toast-container', { timeout: 2000 })
      .should('exist')
      .contains(' User registed successfuly!');
  });
});
