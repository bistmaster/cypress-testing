describe("Captain Dashboard > Team Roster", () => {
  before(() => {
    // Captain User
    const { captain_user } = Cypress.env();
    cy.login(captain_user.email, captain_user.password);
  });

  it("Click on the navigation link", () => {
    cy.verifyNameAndUrl("Team Roster", "/team-roster");
    cy.get("div.fullscreen-loader").should("not.be.visible");
  });

  after(() => {
    cy.logout();
  });
});
