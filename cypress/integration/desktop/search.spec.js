describe("Images - Search", () => {
  context("Desktop resolution ", () => {
    before(() => {
      cy.verifyTitle();
    });

    it("Search Input text box", () => {
      cy.get("input[title=Search]").should("be.visible");
      cy.get("input[title=Search]").should("have.attr", "role", "combobox");
      cy.get("input[title=Search]").should("have.attr", "name", "q");
      cy.get("input[title=Search]").should("have.attr", "maxlength", "2048");
      cy.get("input[title=Search]").should(
        "have.attr",
        "autocapitalize",
        "off"
      );
      cy.get("span.BwoPOe").should("be.visible");
      cy.get("span.BwoPOe").should("have.css", "height", "24px");
      cy.get("span.BwoPOe").should("have.css", "width", "24px");
      cy.get("span.BwoPOe").should(
        "have.css",
        "background",
        'rgba(0, 0, 0, 0) url("https://www.gstatic.com/images/icons/material/system/2x/photo_camera_grey600_24dp.png") no-repeat scroll 0px 0px / 24px padding-box border-box'
      );
      cy.get("span.HPVvwb").should("be.visible");
      cy.get("span.HPVvwb").should("have.css", "height", "24px");
      cy.get("span.HPVvwb").should("have.css", "width", "24px");
      cy.get("span.HPVvwb").should(
        "have.css",
        "background",
        'rgba(0, 0, 0, 0) url("https://www.gstatic.com/images/branding/googlemic/2x/googlemic_color_24dp.png") no-repeat scroll 0px 0px / 24px padding-box border-box'
      );
    });
  });
});
