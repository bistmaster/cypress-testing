const faker = require("faker");
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();

describe("Series Admin Dashboard > Participants", () => {
  before(() => {
    // Series Admin User
    cy.login("erodelo@sweatworks.net", "Asd123...");
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

  it("Add Participants", () => {
    const dateInput = faker.date.past(10, "02/19/2000");
    const {
      companyRegistrationId,
      companyCountry,
      companyState,
      careerLevel,
      careerFunction,
      paceMM,
      paceSS,
      walkerOrRunner,
      disabilityAssistance,
      emergencyContactRelation,
      phone,
      color
    } = Cypress.env("participantInfo");
    cy.contains("a", "+ New Participant").click();
    cy.get("div.main-loader").should("not.be.visible");
    cy.get("div.MuiDrawer-paper").should("be.visible");
    cy.contains("p.section-container--label", "Participants Information");
    cy.get("select[name=subEventId]").select("2");
    cy.get("div.main-loader").should("be.visible");
    cy.get("select[name=companyRegistrationId]").select(companyRegistrationId);
    cy.get("div.main-loader").should("be.visible");
    cy.get("input[name=firstName]").type(firstName);
    cy.get("input[name=lastName]").type(lastName);
    cy.get("input[name=displayName]").type(firstName);
    cy.get("input[name=workEmail]").type(email);
    cy.get("input[name=dob]").type(
      `${dateInput.getMonth()}/${dateInput.getDate()}/${dateInput.getFullYear()}`
    );
    cy.get("input[name=businessNumber]").type("123 456 7890");
    cy.get("input[name=mobileNumber]").type("123 456 7890");
    cy.get("input[name=companyAddress]").type(faker.address.streetAddress());
    cy.get("input[name=companyCity]").type(faker.address.city());
    cy.get("input[name=companyZipCode]").type(faker.address.zipCode());
    cy.get("select[name=companyCountry]").select(companyCountry);
    cy.get("select[name=companyState]").select(companyState);
    cy.get("select[name=careerFunction]").select(careerFunction);
    cy.get("select[name=careerLevel]").select(careerLevel);
    cy.get("select[name=tShirtSize]").select("men_l");
    cy.get("select[name=paceMM]").select(paceMM);
    cy.get("select[name=paceSS]").select(paceSS);
    cy.get("select[name=walkerOrRunner]").select(walkerOrRunner);
    cy.get("select[name=disabilityAssistance]").select(disabilityAssistance);
    cy.get("input[name=emergencyContactName]").type(faker.name.findName());
    cy.get("input[name=emergencyContactRelation]").type(
      emergencyContactRelation
    );
    cy.get("input[name=emergencyContactEmail]").type(faker.internet.email());
    cy.get("input[name=emergencyContactPhone]").type(phone);
    cy.get("input[name='generatedCustomFields[0].entry[0]']").type(
      faker.lorem.sentence()
    );
    cy.get("select[name='generatedCustomFields[1].entry[0]']").select(color);
    cy.get("button[type=submit]").click();
    cy.get("div.main-loader").should("be.visible");
  });

  it("Search new participant", () => {
    cy.get("div.main-loader").should("not.be.visible");
    cy.get("input[id=header-search-input]").clear();
    cy.get("input[id=header-search-input]").type(firstName);
    cy.get("div.event-row-wrapper").should("have.length.above", 0);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });

  after(() => {
    //cy.logout();
  });
});
