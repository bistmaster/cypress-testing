describe("Series Admin Dashboard - Hospitality", () => {
  before(() => {
    // Series Admin User
    cy.login("erodelo@sweatworks.net", "Asd123...");
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Hospitality", "/hospitality");
  });

  after(() => {
    cy.logout();
  });
});
