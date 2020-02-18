const faker = require("faker");

const user = {
  create: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email()
  },
  edit: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email()
  }
};

describe("Series Admin Dashboard - Users", () => {
  before(() => {
    cy.login("erodelo@sweatworks.net", "Asd123...");
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
    cy.verifyNameAndUrl("Users", "/users");
    cy.contains("h1", "Users");
  });

  it("Check on the Users table headers", () => {
    cy.contains("span.item-text", "ROLE");
    cy.contains("span.item-text", "NAME");
    cy.contains("span.item-text", "EVENT NAME");
    cy.contains("span.item-text", "STATUS");
    cy.contains("span.item-text", "ACTIONS");
  });

  it("Check on the Users table rows", () => {
    cy.get("div.users-list__row-wrapper").should("have.length.above", 1);
  });

  it("Create New User", () => {
    cy.contains("a", "+ New User").click();
    cy.get("div.MuiDrawer-paper").should("be.visible");
    cy.get("select[name=permission]").select("TC");
    cy.get("input[name=firstName]").type(user.create.firstName);
    cy.get("input[name=lastName]").type(user.create.lastName);
    cy.get("input[name=email]").type(user.create.email);
    cy.get("div.country-code-select__control").click();
    cy.get("input[name=phone]").type("123 456 7890");
    cy.get("select[name='subEventsUsers[0].subEventId']").select("170");
    cy.get("button[type=submit]").click();
  });

  it("Verify user Created", () => {
    cy.get("div.MuiDrawer-paper").should("be.not.visible");
    cy.get("input[id=header-search-input]").type(user.create.firstName);
    cy.get("div.users-list__row-wrapper").should("have.length.above", 0);
    cy.get("input[id=header-search-input]").clear();
  });

  it("Edit User", () => {
    cy.get("input[id=header-search-input]").type(user.create.firstName);
    cy.get("div.users-list__row-wrapper").should("have.length", 1);
    cy.get("button.action-button")
      .invoke("show")
      .click();
    cy.get("div.MuiDrawer-paper").should("be.visible");
    cy.get("input[name=firstName]").clear();
    cy.get("input[name=firstName]").type(user.edit.firstName);
    cy.get("input[name=lastName]").clear();
    cy.get("input[name=lastName]").type(user.edit.lastName);
    cy.get("input[name=email]").clear();
    cy.get("input[name=email]").type(user.edit.email);
    cy.get("button[type=submit]").click();
    cy.get("div.MuiDrawer-paper").should("be.not.visible");
  });

  it("Verify user edited", () => {
    cy.get("input[id=header-search-input]").clear();
    cy.get("input[id=header-search-input]").type(user.edit.firstName);
    cy.get("div.users-list__row-wrapper").should("have.length.above", 0);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
