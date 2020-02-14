describe("Series Admin Dashboard - Users", () => {
  before(() => {
    // Series Admin User
    cy.login("erodelo@sweatworks.net", "Asd123...");
  });

  it("Click on the navigation link", () => {
    cy.get("#preloader-jpmcc").should("not.be.visible");
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
    cy.get("div.users-list__row-wrapper").should("have.length.above", 1);
  });

  it("Check on the Users Pagination", () => {
    cy.get("ul.pagination").should("be.visible");
    cy.get("li.page-item").should("have.length.above", 1);
  });

  it("New User", () => {
    cy.contains("a", "+ New User").click();
    cy.get("[name=permission]").click();
  });

  after(() => {
    cy.logout();
  });
});
