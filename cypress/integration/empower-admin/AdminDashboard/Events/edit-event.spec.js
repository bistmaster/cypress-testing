describe("Series Admin Dashboard > Events > Edit", () => {
  before(() => {
    // Series Admin User
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Events", "/events");
    cy.contains("h1", "Events");
  });

  after(() => {
    cy.logout();
  });
});
