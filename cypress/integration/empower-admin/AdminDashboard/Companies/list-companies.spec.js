const faker = require("faker");
const { subEventId, companyInfo, phone } = Cypress.env();
const companyName = faker.company.companyName(0);
describe("Series Admin Dashboard - Companies", () => {
  before(() => {
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Navigation", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Companies", "/companies");
    cy.contains("h1", "Companies");
  });

  it("List Companies", () => {
    cy.get("div.main-loader").should("not.be.visible");
    cy.get("div.event-item-container").should("have.length.above", 1);
  });

  it("Pagination", () => {
    cy.get("ul.pagination").should("be.visible");
    cy.get("li.page-item").should("have.length.above", 1);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
