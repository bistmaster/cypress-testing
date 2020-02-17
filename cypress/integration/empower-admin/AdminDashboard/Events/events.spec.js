describe("Series Admin Dashboard - Events", () => {
  before(() => {
    // Series Admin User
    cy.login("erodelo@sweatworks.net", "Asd123...");
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
