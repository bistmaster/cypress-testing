describe("Captain Dashboard - Hospitality Catalogue", () => {
  before(() => {
    // Captain User
    cy.login("jdeere@yopmail.com", "Tester123!");
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Hospitality", "/hospitality/catalogue");
  });

  after(() => {
    cy.logout();
  });
});
