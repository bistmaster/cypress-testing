describe("Captain Dashboard - Hospitality Catalogue", () => {
  before(() => {
    // Captain User
    cy.login("testing.feb@yopmail.com", "Sweatworks!1");
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Hospitality", "/hospitality/catalogue");
  });

  after(() => {
    cy.logout();
  });
});
