const faker = require("faker");
const { product } = Cypress.env("hospitality");
describe("Series Admin Dashboard > Hospitality > Edit Product", () => {
  before(() => {
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Edit Product", () => {
    cy.get("div.main-loader").should("not.be.visible");
    cy.verifyNameAndUrl("Hospitality", "/hospitality");
    cy.contains("span.tab--light-grey", "Products").click();
    //search product to edit
    cy.search("tbody > tr.MuiTableRow-root", product.nameToEdit);
    cy.waitRequest("products/*", "button.action-button", "getProductInfo");
    //Start to edit product
    cy.get("input[name=altCategoryName]").type(faker.commerce.product());
    cy.get("input[name=title]").clear();
    cy.get("input[name=title]").type(product.nameNew);
    cy.get("textarea[name=description]").clear();
    cy.get("textarea[name=description]").type(faker.lorem.sentence());
    cy.get("input[name=price]").clear();
    cy.get("input[name=price]").type(faker.commerce.price());
    cy.get("input[name=tax]").clear();
    cy.get("input[name=tax]").type(faker.random.number({ min: 1, max: 10 }));
    cy.get("input[name=minQuantity]").clear();
    cy.get("input[name=minQuantity]").type(
      faker.random.number({ min: 10, max: 20 })
    );
    cy.get("input[name=maxQuantity]").clear();
    cy.get("input[name=maxQuantity]").type(
      faker.random.number({ min: 20, max: 50 })
    );
    cy.get("input[name=initialInventory]").clear();
    cy.get("input[name=initialInventory]").type(
      faker.random.number({ min: 100, max: 200 })
    );
    cy.get("input[name=vendor]").clear();
    cy.get("input[name=vendor]").type(faker.company.companyName());
    cy.get("button[type=submit]").click();
    cy.get("div.main-loader").should("be.visible");
    cy.search("tr.MuiTableRow-root", product.nameNew);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
