const faker = require("faker");
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();

describe("Series Admin Dashboard > Users > Add User", () => {
  before(() => {
    cy.login("erodelo@sweatworks.net", "Asd123...");
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Click on the navigation link", () => {
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

  it("Check on the Users Pagination", () => {
    cy.get("ul.pagination").should("be.visible");
    cy.get("li.page-item").should("have.length.above", 1);
  });

  it("Create New User", () => {
    cy.contains("a", "+ New User").click();
    cy.get("select[name=permission]").select("TC");
    cy.get("input[name=firstName]").type(firstName);
    cy.get("input[name=lastName]").type(lastName);
    cy.get("input[name=email]").type(email);
    cy.get("div.country-code-select__control").click();
    cy.get("input[name=phone]").type("123 456 7890");
    cy.get("select[name='subEventsUsers[0].subEventId']").select("170");
    cy.get("button[type=submit]").click();
  });

  it("Verify user Created", () => {
    cy.get("input[id=header-search-input]").type(firstName);
    cy.get("div.users-list__row-wrapper").should("have.length.above", 0);
    cy.get("input[id=header-search-input]").type(" ");
  });

  it("Create Existing User", () => {
    cy.contains("a", "+ New User").click();
    cy.get("select[name=permission]").select("TC");
    cy.get("input[name=firstName]").type(firstName);
    cy.get("input[name=lastName]").type(lastName);
    cy.get("input[name=email]").type(email);
    cy.get("div.country-code-select__control").click();
    cy.get("input[name=phone]").type(faker.phone.phoneNumberFormat(0));
    cy.get("select[name='subEventsUsers[0].subEventId']").select("170");
    cy.get("button[type=submit]").click();
    cy.contains("p", "User already exists.");
    cy.get("div.user_form__right_panel_close").click();
    cy.get("div[role=dialog]").should("be.visible");
    cy.contains("div", "Continue without saving").click();
    cy.get("div.MuiDrawer-paper").should("not.be.visible");
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
