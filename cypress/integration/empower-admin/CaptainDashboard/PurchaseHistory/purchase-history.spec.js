describe("Captain Dashboard > Purchase History", () => {
  before(() => {
    // Captain User
    const { captain_user } = Cypress.env();
    cy.login(captain_user.email, captain_user.password);
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Purchase History", "/purchase-history");
  });

  after(() => {
    cy.logout();
  });
});
