describe('Navbar test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display MEAN Chat App', () => {
    cy.get('.info > h1').should('contain', 'MEAN Chat App');
  });

  it('should display Register, Login button and able to navigate', () => {
    cy.get('.info > div > .btn-secondary')
      .should('contain', 'Register')
      .as('registerBtn');
    cy.get('.info > div > .btn-primary')
      .should('contain', 'Login')
      .as('loginBtn');

    cy.get('@registerBtn').click();
    cy.url();
    cy.get('app-register > p').should('contain', 'register works!');

    cy.get('.me-auto > .nav-item > .nav-link').click();
    cy.url();
    cy.get('.info > div > .btn-primary')
      .should('contain', 'Login')
      .as('loginBtn');
    cy.get('@loginBtn').click();
    cy.url();
    cy.get('app-login > p').should('contain', 'login works!');
  });

  it('should have 3 div with col-4 class', () => {
    cy.get('.row')
      .find('.col-4')
      .each(($el, index, $list) => {
        cy.wrap($el).should('have.class', 'col-4');

        cy.wrap($el)
          .get('p')
          .find('a')
          .each(($aTag) => {
            cy.wrap($aTag).should('exist');
          });
      });
  });
});
