const faker = require("faker");
const { package: pacKage } = Cypress.env("hospitality");
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
    cy.contains("span.tab--light-grey", "Packages").click();
    cy.get("div.main-loader").should("be.visible");

    //check if there are rows
    cy.countRows("tr.MuiTableRow-root", 0);
    //search product to edit
    cy.search("tbody > tr.MuiTableRow-root", pacKage.nameToEdit);
    //click the edit button
    cy.get("div.main-loader").should("not.be.visible");
    cy.waitRequest("packages/*", "a.action-button", "getPackageInfo");

    //Start to edit product
    cy.get("div.main-loader").should("not.be.visible");
    cy.editText("input[name=title", pacKage.nameNew);
    cy.editText("textarea[name=description]", faker.lorem.sentence());

    for (let x = 0; x < pacKage.productsToAdd.length; x++) {
      cy.get("div.pack-products__form select[name=productName]").select(
        pacKage.productsToAdd[x]
      );
      cy.editText(
        "div.pack-products__form input[type=number]",
        faker.random.number({ min: 1, max: 3 })
      );
      cy.get("div.pack-products__form button[type=button]").click();
    }
    cy.get("tr.MuiTableRow-root").should("have.length.above", 1);
    cy.editText("input[name=price]", faker.commerce.price());
    cy.editText("input[name=tax]", faker.random.number({ min: 1, max: 5 }));
    cy.get("button[type=submit]").click();
    cy.get("div.MuiDrawer-paper").should("not.be.visible");
    cy.search("tr.MuiTableRow-root", pacKage.nameNew);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
