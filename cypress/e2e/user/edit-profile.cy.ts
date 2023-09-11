describe("editProfile", () => {
  beforeEach(() => {
    cy.login("im@robot.com", "123123123123");
  });
  it("can go to /edit-profile using the header", () => {
    cy.get('a[href="/edit-profile/"]').click();
    cy.wait(1000);
    cy.chkTitle("Edit-Profile");
  });
  it("can change email", () => {
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      if (req.body.operationName === "editProfile") {
        //@ts-ignore
        req.body?.variables?.input?.email = "im@robot.com";
      }
    });
    cy.get('a[href="/edit-profile/"]').click();
    cy.findByPlaceholderText(/email/i).clear().type("im@robot.too");
    cy.findByRole("btn").click();
  });
});
