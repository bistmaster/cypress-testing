describe("Captain Dashboard - Purchase History", () => {
  before(() => {
    // Captain User
    cy.login("testing.feb@yopmail.com", "Sweatworks!1");
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Purchase History", "/purchase-history");
  });

  after(() => {
    cy.logout();
  });
});
