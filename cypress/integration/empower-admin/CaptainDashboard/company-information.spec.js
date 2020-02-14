describe("Captain Dashboard - Company Information", () => {
  before(() => {
    // Captain User
    cy.login("jdeere@yopmail.com", "Tester123!");
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Company Information", "/company-information");
  });

  after(() => {
    cy.logout();
  });
});
