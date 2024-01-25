describe('template spec', () => {
  it('Does much!', () => {
    expect(true).to.equal(true);
  });

  it('visit page', () => {
    cy.visit('http://localhost:4200');

    cy.contains('MEAN');
  });

  it('should display the logo and "Chat" text in the navbar', () => {});
});
