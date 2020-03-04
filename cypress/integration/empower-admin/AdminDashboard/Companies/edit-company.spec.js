const faker = require("faker");
const { companyNameToEdit, companyNameNew } = Cypress.env("companyInfoEdit");
describe("Series Admin Dashboard - Companies", () => {
  before(() => {
    // Series Admin User
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Edit Company", () => {
    cy.verifyNameAndUrl("Companies", "/companies");
    cy.search("div.event-item-container", companyNameToEdit);

    cy.server();
    cy.route("GET", `${Cypress.config().baseUrl}/dev/*`).as("getCompanyInfo");
    cy.get("span.action-buttons > a")
      .first()
      .click({ force: true });
    cy.wait("@getCompanyInfo");
    cy.get("@getCompanyInfo").then(response => {
      expect(response.status).to.eq(200);
      cy.get("div.MuiDrawer-paper").should("be.visible");
    });
    cy.get("input[name='company.name']").clear();
    cy.get("input[name='company.name']").type(companyNameNew);
    cy.phoneSelect(
      "div[id='companyRegistration.mobileNumberCountryCode']",
      "Taiwan"
    );
    cy.get("input[name='company.address']").clear();
    cy.get("input[name='company.address']").type(
      faker.address.secondaryAddress()
    );
    cy.get("input[name='company.city']").clear();
    cy.get("input[name='company.city']").type(faker.address.city());
    cy.get("input[name='company.zipCode']").clear();
    cy.get("input[name='company.zipCode']").type(faker.address.zipCode());
    cy.get("input[name='company.hrFirstName']").clear();
    cy.get("input[name='company.hrFirstName']").type(faker.name.firstName());
    cy.get("input[name='company.hrLastName']").clear();
    cy.get("input[name='company.hrLastName']").type(faker.name.lastName());

    cy.server();
    cy.route(
      "PUT",
      `${Cypress.config().baseUrl}/dev/companyRegistrations/*`
    ).as("companyRegistrations");
    cy.get("button[type=submit]").click();
    cy.wait("@companyRegistrations");
    cy.get("@companyRegistrations").then(response => {
      expect(response.status).to.eq(200);
      cy.get("div.MuiDrawer-paper").should("not.be.visible");
    });
  });

  it("Search Company", () => {
    cy.search("div.event-item-container", companyNameNew);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
