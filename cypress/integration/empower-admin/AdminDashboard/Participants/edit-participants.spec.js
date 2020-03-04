const faker = require("faker");
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();

describe("Series Admin Dashboard > Participants > Edit", () => {
  before(() => {
    // Series Admin User
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Edit Participants", () => {
    const dateInput = faker.date.past(10, "02/19/2000");
    const {
      subEventId,
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
      nameToEdit,
      nameNew
    } = Cypress.env("participantInfo");

    // cy.get("div.main-loader").should("not.be.visible");
    cy.verifyNameAndUrl("Participants", "/participants");
    // check rows
    cy.countRows("div.event-row-wrapper", 0);

    // search participants
    cy.search("div.event-row-wrapper", nameToEdit);
    // click on edit button
    cy.get("div.main-loader").should("not.be.visible");
    cy.waitRequest("/*", "span.action-buttons > a", "getParticipantInfo");
    cy.get("div.main-loader").should("not.be.visible");
    cy.get("div.MuiDrawer-paper").should("be.visible");
    cy.editText("input[name=firstName]", firstName);
    cy.editText("input[name=lastName]", lastName);
    cy.editText("input[name=displayName]", firstName);
    cy.editText("input[name=workEmail]", email);
    cy.editText(
      "input[name=dob]",
      `${dateInput.getMonth()}/${dateInput.getDate()}/${dateInput.getFullYear()}`
    );
    cy.editText("input[name=businessNumber]", "123 456 7890");
    cy.editText("input[name=mobileNumber]", "123 456 7890");
    cy.editText("input[name=companyAddress]", faker.address.streetAddress());
    cy.editText("input[name=companyCity]", faker.address.city());
    cy.editText("input[name=companyZipCode]", faker.address.zipCode());
    cy.get("select[name=companyCountry]").select(companyCountry);
    cy.get("select[name=companyState]").select(companyState);
    cy.get("select[name=careerFunction]").select(careerFunction);
    cy.get("select[name=careerLevel]").select(careerLevel);
    cy.get("select[name=tShirtSize]").select("men_l");
    cy.get("select[name=paceMM]").select(paceMM);
    cy.get("select[name=paceSS]").select(paceSS);
    cy.get("select[name=walkerOrRunner]").select(walkerOrRunner);
    cy.get("select[name=disabilityAssistance]").select(disabilityAssistance);
    cy.editText("input[name=emergencyContactName]", faker.name.findName());
    cy.editText(
      "input[name=emergencyContactRelation]",
      emergencyContactRelation
    );
    cy.editText("input[name=emergencyContactEmail]", faker.internet.email());
    cy.editText("input[name=emergencyContactPhone]", phone);
    cy.get("button[type=submit]").click();
    cy.get("div.main-loader").should("be.visible");
    cy.get("div.MuiDrawer-paper").should("not.be.visible");
    cy.get("div.main-loader").should("not.be.visible");
  });

  it("Search Participant", () => {
    cy.search("div.event-row-wrapper", firstName);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });

  after(() => {
    //cy.logout();
  });
});
