describe("Images - Homepage", () => {
  context("ipad-mini resolution", () => {
    it.only("Check the header", () => {
      cy.viewport("ipad-mini");
      cy.visit("/");
      cy.reload(true, { log: true });
      cy.get("div[role=button]").should("be.visible");
    });

    it("Check the header", () => {});

    it("Check the footer", () => {
      cy.get("div.fbar").should("be.visible");
      cy.contains("span#fsl", "Advertising");
      cy.contains("span#fsl", "Business");
      cy.contains("span#fsl", "About");
      cy.contains("span#fsl", "How Search works");
    });
  });
});
