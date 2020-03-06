const faker = require("faker");
const { packages } = Cypress.env("sorting");
describe("Series Admin Dashboard > Hospitality > Sort", () => {
  before(() => {
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Sorting Package", () => {
    cy.get("div.main-loader").should("not.be.visible");
    cy.verifyNameAndUrl("Hospitality", "/hospitality");
    cy.get("div.main-loader").should("not.be.visible");
    cy.verifyNameAndUrl("Hospitality", "/hospitality");
    cy.contains("span.tab--light-grey", "Packages").click();
    cy.countRows("tbody>tr", 1);
    cy.contains("span.list__header__text", "PRODUCT").click();
    cy.get("tbody > tr")
      .eq(0)
      .contains(packages.first);

    cy.contains("span.list__header__text", "PRODUCT").click();
    cy.get("tbody > tr")
      .eq(0)
      .contains(packages.second);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
