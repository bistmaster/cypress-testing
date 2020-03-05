describe("Captain Dashboard > Company Information", () => {
  before(() => {
    // Captain User
    const { captain_user } = Cypress.env();
    cy.login(captain_user.email, captain_user.password);
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Company Information", "/company-information");
  });

  after(() => {
    cy.logout();
  });
});
