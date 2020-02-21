const faker = require("faker");
const productName = faker.commerce.productName();
describe("Series Admin Dashboard > Hospitality > Add Product", () => {
  before(() => {
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Go to Hospitality and click Add Product", () => {
    cy.get("div.main-loader").should("not.be.visible");
    cy.verifyNameAndUrl("Hospitality", "/hospitality");
    cy.contains("span.tab--light-grey", "Products");
    cy.contains("span.tab--light-grey", "Packages");
    cy.contains("a.hospitality__button--medium", "+ Product").click();
    cy.get("div.main-loader").should("not.be.visible");
    cy.get("div.MuiDrawer-paper").should("be.visible");
  });

  it("Adding Product", () => {
    const { subEventId, hospitalityCategoryId } = Cypress.env();
    cy.get("select[name=subEventId]").select(subEventId);
    cy.get("select[name=hospitalityCategoryId]").select(hospitalityCategoryId);
    cy.get("input[name=altCategoryName]").type(faker.commerce.product());
    cy.get("input[name=title]").type(productName);
    cy.get("textarea[name=description]").type(faker.lorem.sentence());
    cy.get("input[name=price]").type(faker.commerce.price());
    cy.get("input[name=tax]").type(faker.random.number({ min: 1, max: 10 }));
    cy.get("input[name=minQuantity]").type(
      faker.random.number({ min: 10, max: 20 })
    );
    cy.get("input[name=maxQuantity]").type(
      faker.random.number({ min: 20, max: 50 })
    );
    cy.get("input[name=initialInventory]").type(
      faker.random.number({ min: 100, max: 200 })
    );
    cy.get("input[name=vendor]").type(faker.company.companyName());
    cy.get("button[type=submit]").click();
    cy.get("div.main-loader").should("be.visible");
  });

  it("Search Product Created", () => {
    cy.get("input[id=header-search-input]").clear();
    cy.get("input[id=header-search-input]").type(productName);
    cy.get("tr.MuiTableRow-root").should("have.length.above", 0);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
