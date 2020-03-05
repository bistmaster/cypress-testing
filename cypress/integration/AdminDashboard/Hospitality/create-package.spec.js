const faker = require("faker");
const packageName = faker.commerce.productAdjective();

describe("Series Admin Dashboard > Hospitality > Add Package", () => {
  before(() => {
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Go to Hospitality and click Add Package", () => {
    cy.get("div.main-loader").should("not.be.visible");
    cy.verifyNameAndUrl("Hospitality", "/hospitality");
    cy.contains("span.tab--light-grey", "Products");
    cy.contains("span.tab--light-grey", "Packages");
    cy.contains("a.hospitality__button--medium", "+ Package").click();
    cy.get("div.main-loader").should("not.be.visible");
    cy.get("div.MuiDrawer-paper").should("be.visible");
  });

  it("Adding Package", () => {
    const { subEventId, products } = Cypress.env();
    cy.get("div.main-loader").should("not.be.visible");
    cy.get("select[name=subEventId]").select(subEventId);
    cy.get("input[name=title]").type(packageName);
    cy.get("textarea[name=description]").type(faker.lorem.sentence());

    for (let x = 0; x < products.length; x++) {
      cy.get("div.pack-products__form select[name=productName]").select(
        products[x]
      );
      cy.get("div.pack-products__form input[type=number]").type(
        faker.random.number({ min: 1, max: 10 })
      );
      cy.get("div.pack-products__form button[type=button]").click();
    }
    cy.get("tr.MuiTableRow-root").should("have.length.above", 1);
    cy.get("input[name=price]").type(faker.commerce.price());
    cy.get("input[name=tax]").type(faker.random.number({ min: 1, max: 10 }));

    cy.get("button[type=submit]").click();
    cy.get("div.MuiDrawer-paper").should("not.be.visible");
  });

  it("Search Package Created", () => {
    cy.get("input[id=header-search-input]").clear();
    cy.get("input[id=header-search-input]").type(packageName);
    cy.get("tr.MuiTableRow-root").should("have.length.above", 0);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
