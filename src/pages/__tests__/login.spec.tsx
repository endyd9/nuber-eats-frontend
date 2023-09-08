import { RenderResult, render, waitFor } from "@testing-library/react";
import { LOGIN_MUTATION, Login } from "../login";
import { ApolloProvider } from "@apollo/client";
import { MockApolloClient, createMockClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<Login />", () => {
  let renderResult: RenderResult;
  let mockClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockClient}>
              <Login />
            </ApolloProvider>
          </Router>
        </HelmetProvider>
      );
    });
  });
  it("renders OK", async () => {
    waitFor(() => {
      expect(document.title).toBe("Nuber-Eats | Login");
    });
  });

  it("display email validation errors", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    userEvent.type(email, "WorngEmail");
    await waitFor(() => {
      expect(getByRole("alert")).toHaveTextContent(
        "유효하지 않은 이메일 형식입니다."
      );
    });
    userEvent.clear(email);
    await waitFor(() => {
      expect(getByRole("alert")).toHaveTextContent("이메일을 입력해주세요.");
    });
  });

  it("display password required errors", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const btn = getByRole("btn");
    userEvent.type(email, "good@email.com");
    userEvent.click(btn);
    await waitFor(() => {
      expect(getByRole("alert")).toHaveTextContent("비밀번호를 입력해주세요.");
    });
  });

  it("submits form and calls mutaion", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const pass = getByPlaceholderText(/password/i);
    const btn = getByRole("btn");
    const formData = {
      email: "good@email.com",
      password: "123123123123",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "xxxx",
          error: "mutation error",
        },
      },
    });
    mockClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, "setItem");

    userEvent.type(email, formData.email);
    userEvent.type(pass, formData.password);
    userEvent.click(btn);

    await waitFor(() => {
      expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
      expect(mockedMutationResponse).toHaveBeenCalledWith({
        loginInput: {
          email: formData.email,
          password: formData.password,
        },
      });
    });
    expect(getByRole("alert")).toHaveTextContent("mutation error");
    expect(localStorage.setItem).toHaveBeenCalledWith("nuber-token", "xxxx");
  });
});
