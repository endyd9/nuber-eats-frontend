describe("join", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByText("Create an Account").click();
  });
  it("should see join page", () => {
    cy.title().should("eq", "Nuber-Eats | Join");
  });

  it("should email & password validation errors", () => {
    cy.findByPlaceholderText(/email/i).type("bad@email");
    cy.findByRole("alert").should(
      "have.text",
      "유효하지 않은 이메일 형식입니다."
    );

    cy.findByPlaceholderText(/email/i).clear();
    cy.findByRole("alert").should("have.text", "이메일을 입력해주세요.");

    cy.findByPlaceholderText(/email/i).type("good@email.com");
    cy.findByPlaceholderText(/password/i).type("12345");
    cy.findByRole("alert").should(
      "have.text",
      "비밀번호는 10자 이상의 문자열입니다."
    );

    cy.findByPlaceholderText(/password/i)
      .type("12345")
      .clear();
    cy.findByRole("alert").should("have.text", "비밀번호를 입력해주세요.");

    cy.findByPlaceholderText(/email/i).clear().type("di@di.com");
    cy.findByPlaceholderText(/password/i)
      .clear()
      .type("123123123123");
    cy.findByRole("btn").click();
    cy.findByRole("alert").should("have.text", "이미 가입된 이메일 입니다.");
  });

  it("should be create user and login", () => {
    cy.intercept("http://localhost:4000/graphql", (req) => {
      const { operationName } = req.body;
      if (operationName && operationName === "createAccount") {
        req.reply((res) => {
          res.send({ fixture: "auth/join.json" });
        });
      }
    });
    cy.findByPlaceholderText(/email/i).type("im@robot.com");
    cy.findByPlaceholderText(/password/i).type("123123123123");
    cy.findByRole("btn").click();

    cy.wait(1000);
    cy.title().should("eq", "Nuber-Eats | Login");

    cy.login("im@robot.com", "123123123123");
  });
});
