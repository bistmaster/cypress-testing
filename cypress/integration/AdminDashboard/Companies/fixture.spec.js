describe("Series Admin Dashboard - Companies", () => {
  before(async () => {
    const { email, password } = Cypress.env("series_admin_user");
    console.log({ email, password });
  });
  it("test", () => {
    console.log("test");
  });
});
