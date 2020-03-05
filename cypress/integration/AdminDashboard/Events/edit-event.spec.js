const faker = require("faker");
const dateInput = faker.date.between("2020-03-03", "2020-12-31");
const { edit } = Cypress.env("event");
describe("Series Admin Dashboard > Events > Edit", () => {
  before(() => {
    // Series Admin User
    const { email, password } = Cypress.env("series_admin_user");
    cy.login(email, password);
  });

  it("Edit Company", () => {
    const name = cy.verifyNameAndUrl("Events", "/events");
    cy.contains("h1", "Events");

    cy.search("div.event-row-wrapper", edit.name);
    cy.wait(200);
    //click on edit button
    cy.waitRequest("subEvents/*", "span.action-buttons > img", "getEventInfo");
    cy.get("div.MuiDrawer-paper").should("be.visible");
    cy.get("div.form-drawer__content").within(() => {
      // Event Details
      cy.editText("input[name='event.name']", edit.nameNew);
      cy.get("select[name='event.marketId']").select(edit.city);

      cy.editText(
        "input[name='event.eventStartDate']",
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

    cy.waitOnSave("companyRegistrationInputs/*", "PUT", "updateEventInfo");
    cy.wait(500);
    cy.search("div.event-row-wrapper", edit.nameNew);
  });
});
