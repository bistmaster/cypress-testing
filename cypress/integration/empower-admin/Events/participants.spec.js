describe("Series Admin Dashboard - Participants", () => {
  before(() => {
    // Series Admin User
    cy.login("erodelo@sweatworks.net", "Asd123...");
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Participants", "/participants");
    cy.contains("h1", "Participants");
  });

  after(() => {
    cy.logout();
  });
});
