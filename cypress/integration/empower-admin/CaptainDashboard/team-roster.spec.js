describe("Captain Dashboard - Team Roster", () => {
  before(() => {
    // Captain User
    cy.login("jdeere@yopmail.com", "Tester123!");
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Team Roster", "/team-roster");
  });

  after(() => {
    cy.logout();
  });
});
