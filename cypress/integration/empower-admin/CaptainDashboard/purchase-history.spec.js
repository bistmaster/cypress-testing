describe("Captain Dashboard - Purchase History", () => {
  before(() => {
    // Captain User
    cy.login("jdeere@yopmail.com", "Tester123!");
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Purchase History", "/purchase-history");
  });

  after(() => {
    cy.logout();
  });
});
