import { CREATE_ACCOUNT_MUTATION, Join } from "../join";
import { ApolloProvider } from "@apollo/client";
import { MockApolloClient, createMockClient } from "mock-apollo-client";
import { RenderResult, render, waitFor } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { UserRole } from "../../gql/graphql";

const mockedPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockedPush,
      };
    },
  };
});

describe("<Join />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Join />
        </ApolloProvider>
      );
    });
  });

  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Nuber-Eats | Join");
    });
  });

  it("render errors", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;

    const email = getByPlaceholderText(/email/i);
    const btn = getByRole("btn");

    userEvent.type(email, "bad@email");
    await waitFor(() => {
      expect(getByRole("alert")).toHaveTextContent(
        "유효하지 않은 이메일 형식입니다."
      );
    });
    userEvent.clear(email);
    await waitFor(() => {
      expect(getByRole("alert")).toHaveTextContent("이메일을 입력해주세요.");
    });
    userEvent.type(email, "good@email.com");
    userEvent.click(btn);
    await waitFor(() => {
      expect(getByRole("alert")).toHaveTextContent("비밀번호를 입력해주세요.");
    });
  });

  it("submits mutation with form value", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;

    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const btn = getByRole("btn");

    const formData = {
      email: "good@email.com",
      password: "123123123123",
      role: UserRole.Client,
    };
    const mockedLoginMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: "error",
        },
      },
    });

    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedLoginMutationResponse
    );

    jest.spyOn(window, "alert").mockImplementation(() => null);

    userEvent.type(email, formData.email);
    userEvent.type(password, formData.password);
    userEvent.click(btn);

    await waitFor(() => {
      expect(mockedLoginMutationResponse).toHaveBeenCalledTimes(1);
      expect(mockedLoginMutationResponse).toHaveBeenCalledWith({
        createAccountInput: {
          ...formData,
        },
      });
      expect(getByRole("alert")).toHaveTextContent("error");
      expect(window.alert).toHaveBeenCalledWith("회원가입이 완료 되었습니다.");
      expect(mockedPush).toHaveBeenCalledWith("/");
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
