describe('Navbar test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the logo and "Chat" text in the navbar', () => {
    cy.get('.logo').should('exist');

    cy.get('.navbar-brand span').should('contain', 'Chat');
  });

  it('should have "Home" as an active link in the navbar', () => {
    cy.get('.me-auto > .nav-item > .nav-link')
      .should('exist')
      .and('contain', 'Home');

    cy.get('.ms-auto > .active > .nav-link')
      .should('exist')
      .and('contain', 'Login');
  });

  it('should able to click Home button ', () => {
    cy.visit('http://localhost:4200/register');

    cy.get('.me-auto > .nav-item > .nav-link').should('exist').click();
  });
});
