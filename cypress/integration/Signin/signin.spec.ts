describe("Signin Flow", () => {
  it("Should navigate to Home Page", () => {
    cy.visit("/");
  });
  it("Should navigate to Sign In Page", () => {
    cy.get('[data-cy="signin"]', { timeout: 10000 }).click();
    cy.url().should("include", "/signin");
    cy.contains("Login");
  });
});
