const faker = require("faker");
const { products } = Cypress.env("sorting");
describe("Series Admin Dashboard > Hospitality > Sort Product", () => {
  before(() => {
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Sorting Product", () => {
    cy.get("div.main-loader").should("not.be.visible");
    cy.verifyNameAndUrl("Hospitality", "/hospitality");
    cy.get("div.main-loader").should("not.be.visible");
    cy.verifyNameAndUrl("Hospitality", "/hospitality");
    cy.get("tbody>tr").should("have.length.above", 1);
    cy.get("tbody>tr")
      .eq(0)
      .contains(products.first);
    cy.contains("span.list__header__text", "CATEGORy").click();
    cy.get("tbody>tr")
      .eq(0)
      .contains(products.second);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
