const faker = require("faker");
const dateInput = faker.date.between("2020-03-03", "2020-12-31");
const { add } = Cypress.env("event");

describe("Series Admin Dashboard > Events > Add", () => {
  before(() => {
    // Series Admin User
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  it("Add Event with empty fields", () => {
    cy.verifyNameAndUrl("Events", "/events");
    cy.contains("h1", "Events");
    cy.contains("a.multi-button-medium", "+ New Event").click();
    cy.get("div.MuiDrawer-paper").should("be.visible");
    cy.contains("button[type=submit]", "Next").click();
    cy.contains("p.input-error-message", "Event Name is required");
    cy.contains("p.select-error-message", "Event City is required");
    cy.contains("p.input-error-message", "Event Date is required");
    cy.confirm(false);
  });

  it("Add Event", () => {
    const name = `${
      add.name
    } - ${dateInput.getMonth()}/${dateInput.getDate()}/${dateInput.getFullYear()}`;
    cy.verifyNameAndUrl("Events", "/events");
    cy.contains("h1", "Events");
    cy.contains("a.multi-button-medium", "+ New Event").click();
    cy.get("div.MuiDrawer-paper").should("be.visible");

    cy.get("div.form-drawer__content").within(() => {
      // Event Details
      cy.get("input[name='event.name']").type(name);
      cy.get("select[name='event.marketId']").select(add.city);

      cy.get("input[name='event.eventStartDate']").type(
        `${dateInput.getMonth()}/${dateInput.getDate()}/${dateInput.getFullYear()}`
      );
      cy.wait(500);
      cy.contains("button[type=submit]", "Next").click();

      // Companies
      cy.wait(200);
      cy.contains("div.inputs-main-label", "Companies").should("be.visible");
      cy.contains("button[type=button]", "Next").click();

      // Participants
      cy.wait(200);
      cy.contains("div.inputs-main-label", "Participants").should("be.visible");
      cy.contains("span.tab--light-grey", "Waivers").click();

      // Waivers and Save
      cy.wait(200);
      cy.contains("p.create-event-form--label", "Waivers").should("be.visible");
      cy.contains("button[type=submit]", "Save").click();
    });

    cy.get("div.MuiDrawer-paper").should("not.be.visible");
    cy.get("div.main-loader").should("be.visible");
    cy.wait(500);
    cy.search("div.event-row-wrapper", name);
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });
});
