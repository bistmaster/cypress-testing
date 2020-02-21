// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorageCache", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorageCache", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add("login", (email, password, url) => {
  if (!url) {
    url = "https://dev.jpmcc-sw.com";
  }
  cy.visit(`${url}/login`);
  cy.wait(500);

  cy.server();
  cy.route("POST", `${url}/dev/auth/login`).as("login");
  cy.get("[id=email]").type(email);
  cy.get("[id=password]").type(password);
  cy.get("button[type=submit]").click();
  cy.wait("@login");
  cy.get("@login").then(response => {
    expect(response.status).to.eq(200);
    expect(response.method).to.eq("POST");
    expect(response.responseBody).to.have.property("success");
    expect(response.responseBody).to.have.property("data");
    expect(response.responseBody.data).to.have.property("accessToken");
    expect(response.responseBody.data).to.have.property("refreshToken");
  });
});

Cypress.Commands.add("logout", () => {
  cy.get("button.account-container__button").click();
  cy.contains("button", "Logout");
});

Cypress.Commands.add("verifyNameAndUrl", (name, url) => {
  cy.contains("span", name).click();
  cy.url().should("include", url);
});
