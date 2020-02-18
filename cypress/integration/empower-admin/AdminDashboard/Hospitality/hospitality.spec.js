describe("Series Admin Dashboard - Hospitality", () => {
  before(() => {
    // Series Admin User
    cy.login("erodelo@sweatworks.net", "Asd123...");
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Click on the navigation link", () => {
    cy.get("div.main-loader").should("not.be.visible");
    cy.verifyNameAndUrl("Hospitality", "/hospitality");
    cy.contains("span.tab--light-grey", "Products");
    cy.contains("span.tab--light-grey", "Packages");
  });

  it("Check Products", () => {
    cy.get("div.main-loader").should("not.be.visible");
    cy.contains("span.tab--light-grey", "Products").click();
    cy.get("tr.MuiTableRow-root").should("have.length.above", 1);
    cy.contains("span.list__header__text", "CATEGORy").click();
    console.log(cy.get("tr td").first());
  });

  it("Check Packages", () => {
    cy.get("div.main-loader").should("not.be.visible");
    cy.contains("span.tab--light-grey", "Packages").click();
    cy.get("tr.MuiTableRow-root").should("have.length.above", 1);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });

  after(() => {
    cy.logout();
  });
});
