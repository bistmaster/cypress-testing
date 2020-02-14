describe("Series Admin Dashboard - Companies", () => {
  before(() => {
    // Series Admin User
    cy.login("erodelo@sweatworks.net", "Asd123...");
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Companies", "/companies");
    cy.contains("h1", "Companies");
  });

  after(() => {
    cy.logout();
  });
});
