import { MockApolloClient, createMockClient } from "mock-apollo-client";
import { RenderResult, render, waitFor } from "../../../test-utils";
import { ApolloProvider } from "@apollo/client";
import { EDIT_PROFILE_MUTATION, EditProfile } from "../edit-profile";
import userEvent from "@testing-library/user-event";

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

describe("<EditProfile />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    mockedClient = createMockClient();
    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <EditProfile />
        </ApolloProvider>
      );
    });
  });
  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Nuber-Eats | Edit-Profile");
    });
  });

  it("should save edited data", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        editProfile: {
          ok: true,
          error: "mutation error",
        },
      },
    });
    mockedClient.setRequestHandler(
      EDIT_PROFILE_MUTATION,
      mockedMutationResponse
    );
    userEvent.type(getByPlaceholderText("******"), "123");
    userEvent.click(getByRole("btn"));
    await waitFor(() => {
      expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
      expect(mockedMutationResponse).toHaveBeenCalledWith({
        input: {
          email: "test@email.com",
          password: "123",
        },
      });
    });
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
