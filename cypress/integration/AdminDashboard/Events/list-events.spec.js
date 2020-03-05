describe("Series Admin Dashboard > Events > List", () => {
  before(() => {
    // Series Admin User
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Events", "/events");
    cy.contains("h1", "Events");
  });

  it("List Participants", () => {
    cy.countRows("div.event-row-wrapper", 0);
    cy.verifyPagination();
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
