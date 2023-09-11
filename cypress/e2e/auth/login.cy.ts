describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should see login page", () => {
    cy.title().should("eq", "Nuber-Eats | Login");
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
    cy.findByRole("alert").should("have.text", "비밀번호는 10자 이상입니다.");

    cy.findByPlaceholderText(/password/i)
      .type("12345")
      .clear();
    cy.findByRole("alert").should("have.text", "비밀번호를 입력해주세요.");

    cy.findByPlaceholderText(/password/i).type("12345123123");
    cy.findByRole("btn").click();
    cy.findByRole("alert").should("have.text", "가입되지 않은 이메일 입니다");

    cy.findByPlaceholderText(/email/i).clear().type("endyd9@gmail.com");
    cy.findByRole("btn").click();
    cy.findByRole("alert").should("have.text", "비밀번호가 일치하지 않습니다");
  });

  it("can login", () => {
    cy.login("im@robot.com", "123123123123");
  });
});
