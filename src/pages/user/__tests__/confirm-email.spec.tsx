import { ApolloProvider } from "@apollo/client";
import { RenderResult, act, render, waitFor } from "../../../test-utils";
import { ConfirmEmail, VERIFY_EMAIL_MUTATION } from "../confirm-email";
import { MockApolloClient, createMockClient } from "mock-apollo-client";

jest.mock("../../../hooks/useMe", () => {
  const realModule = jest.requireActual("../../../hooks/useMe");
  return {
    ...realModule,
    useMe: () => {
      return {
        data: {
          me: {
            id: 1,
            email: "test@email.com",
            role: "Client",
            verified: false,
          },
        },
        refetch: jest.fn(),
      };
    },
  };
});

describe("<ConfirmEmail />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;

  beforeEach(async () => {
    mockedClient = createMockClient();

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        verifyEmail: {
          ok: true,
          error: "mutation error",
        },
      },
    });

    mockedClient.setRequestHandler(
      VERIFY_EMAIL_MUTATION,
      mockedMutationResponse
    );

    await act(async () => {
      await waitFor(() => {
        renderResult = render(
          <ApolloProvider client={mockedClient}>
            <ConfirmEmail />
          </ApolloProvider>
        );
      });
    });
  });

  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Nuber-Eats | Confirm");
    });
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
