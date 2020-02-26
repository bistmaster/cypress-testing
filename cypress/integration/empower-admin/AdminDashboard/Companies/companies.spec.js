const faker = require("faker");
const { subEventId, companyInfo, phone } = Cypress.env();
const companyName = faker.company.companyName(0);
describe("Series Admin Dashboard - Companies", () => {
  before(() => {
    // Series Admin User
    cy.login("erodelo@sweatworks.net", "Asd123...");
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

  it("Adding Company", () => {
    cy.contains("a", "+ New Company").click();
    cy.get("input[name='company.name']").type(companyName);
    cy.get("select[name='companyRegistration.subEventId']").select(subEventId);
    cy.get("div.autocomplete-select__control").should("be.visible");
    cy.get("div.autocomplete-select__control").click();
    cy.get("div.autocomplete-select__value-container").should("be.visible");
    cy.get("div.autocomplete-select__input > input").type(
      companyInfo.teamCaptain
    );

    cy.server();
    cy.route(
      "GET",
      `/dev/users/searchTcUsers?search=${companyInfo.teamCaptain}&subEventId=${subEventId}`
    ).as("searchCaptain");
    cy.wait("@searchCaptain");
    cy.get("@searchCaptain").then(response => {
      cy.get("div.autocomplete-select__menu-list").should("be.visible");
      cy.get("div.autocomplete-select__option").click();
    });

    cy.phoneSelect("div[id='company.phoneCountryCode']", "Philippines");
    cy.get("input[name='company.phone']").type(phone);
    cy.phoneSelect(
      "div[id='companyRegistration.mobileNumberCountryCode']",
      "China"
    );
    cy.get("input[name='companyRegistration.mobileNumber']").type(phone);
    cy.get("input[name='company.address']").type(
      faker.address.secondaryAddress()
    );
    cy.get("input[name='company.city']").type(faker.address.city());
    cy.get("input[name='company.zipCode']").type(faker.address.zipCode());
    cy.get("select[name='company.country']").select(companyInfo.country);
    cy.get("select[name='company.state']").select(companyInfo.state);
    cy.get("input[name='company.hrFirstName']").type(faker.name.firstName());
    cy.get("input[name='company.hrLastName']").type(faker.name.lastName());
    cy.phoneSelect("div[id='company.hrPhoneNumberCountryCode']", "Hong Kong");
    cy.get("input[name='company.hrPhoneNumber']").type(phone);
    cy.get("input[name='company.ceoName']").type(faker.name.findName());
    cy.get("select[name='company.annualRevenue']").select(
      companyInfo.annualRevenue
    );
    cy.get("select[name='company.industryCategory']").select(
      companyInfo.industryCategory
    );
    cy.get("input[name='companyRegistration.estimatedNumMembers']").type(
      faker.random.number({ min: 50, max: 100 })
    );
    cy.get("input[name='companyRegistration.customPrice']").type(
      faker.commerce.price()
    );
    cy.get("select[name='companyRegistration.whoPays']").select(
      companyInfo.whoPays
    );
    cy.get("select[name='companyRegistration.paymentMethod']").select(
      companyInfo.paymentMethod
    );
    cy.get("textarea[name='companyRegistration.paymentNotes']").type(
      faker.lorem.sentence()
    );
    cy.get("input[name='generatedCustomFields[0].entry[0]']").type(
      companyInfo.customInformation[0]
    );
    cy.get("select[name='generatedCustomFields[1].entry[0]']").select(
      companyInfo.customInformation[1]
    );

    cy.get(
      ".radio_button > .inline_radio > :nth-child(3) > .checkmark"
    ).click();

    cy.server();
    cy.route("POST", `/dev/companies`, {}).as("createCompany");
    cy.get("button[type=submit]").click();
    cy.wait("@createCompany");
    cy.get("@createCompany").then(response => {
      cy.get("div.main-loader").should("not.be.visible");
      cy.get("div.MuiDrawer-paper").should("be.visible");
    });
  });

  // it("Search Company", () => {
  //   cy.search("div.event-item-container", companyName);
  // });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });

  after(() => {
    // cy.logout();
  });
});
