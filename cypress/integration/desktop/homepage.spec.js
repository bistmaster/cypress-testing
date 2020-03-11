describe("Images - Homepage", () => {
  context("Desktop resolution ", () => {
    beforeEach(() => {
      cy.verifyTitle();
    });

    it("Check Google Logo", () => {
      cy.get("div[id=hplogo]").should("have.css", "height", "92px");
      cy.get("div[id=hplogo]").should("have.css", "width", "272px");
      cy.get("div[id=hplogo]").should("have.attr", "align", "left");
    });

    it("Check the header", () => {
      cy.get("div.gb_Jf>a[role=button]").should("be.visible");
      cy.get("div.gb_Jf>a#gb_70").should("be.visible");
      cy.get("div.gb_Jf>a#gb_70").contains("Sign in");
      cy.get("a.gb_ce").should("be.visible");
    });

    it("Check the footer", () => {
      cy.get("div.fbar").should("be.visible");
      cy.contains("span#fsr", "Privacy");
      cy.contains("span#fsr", "Terms");
      cy.contains("span#fsr", "Settings");
      cy.contains("span#fsl", "Advertising");
      cy.contains("span#fsl", "Business");
      cy.contains("span#fsl", "About");
      cy.contains("span#fsl", "How Search works");
    });
  });
});
