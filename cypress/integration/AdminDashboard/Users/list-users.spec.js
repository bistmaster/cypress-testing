const faker = require("faker");
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const { subEventId } = Cypress.env();
describe("Series Admin Dashboard > Users > Add User", () => {
  before(() => {
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
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
    cy.countRows("div.users-list__row-wrapper", 1);
  });

  it("Check on the Users Pagination", () => {
    cy.verifyPagination();
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
