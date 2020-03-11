Cypress.Commands.add("verifyTitle", () => {
  cy.visit("/");
  cy.url().should("eq", "https://images.google.com/");
  cy.title().should("eq", "Google Images");
  cy.document()
    .its("contentType")
    .should("eq", "text/html");
  cy.location().should(loc => {
    expect(loc.protocol).to.eq("https:");
    expect(loc.hostname).to.eq("images.google.com");
  });
});
