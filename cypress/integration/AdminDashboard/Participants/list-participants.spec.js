const faker = require("faker");
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();

describe("Series Admin Dashboard > Participants > List", () => {
  before(() => {
    // Series Admin User
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Click on the navigation link", () => {
    cy.get("div.main-loader").should("not.be.visible");
    cy.verifyNameAndUrl("Participants", "/participants");
  });

  it("Check Participants lists", () => {
    cy.get("div.main-loader").should("not.be.visible");
    cy.get("div.event-row-wrapper").should("have.length.above", 1);
  });

  it("Check on the Participants Pagination", () => {
    cy.get("ul.pagination").should("be.visible");
    cy.get("li.page-item").should("have.length.above", 1);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });

  after(() => {
    //cy.logout();
  });
});
