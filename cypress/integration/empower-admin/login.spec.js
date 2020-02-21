describe("/login", () => {
  beforeEach(() => {
    cy.visit("https://dev.jpmcc-sw.com/login");
    cy.wait(500);
  });

  it("Greets with Login header", () => {
    cy.contains("p", "Login");
  });

  it("Contains input forms", () => {
    cy.contains("label", "Email");
    cy.contains("label", "Password");
  });

  it("Checks the required fields", () => {
    cy.get("button[type=submit]").click();
    cy.contains("p", "Email is required");
    cy.contains("p", "Password is required");
  });

  it("login with incorrect credentials", () => {
    cy.get("[id=email]").type("asdas@msadd.com");
    cy.get("[id=password]").type("sample");
    cy.get("button[type=submit]").click();
    cy.contains("p", "Invalid username and password combination");
  });

  it("login with correct credentials", () => {
    const { captain_user } = Cypress.env();
    cy.login(captain_user.email, captain_user.password);
  });
});
