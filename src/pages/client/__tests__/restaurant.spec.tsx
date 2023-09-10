import { MockApolloClient, createMockClient } from "mock-apollo-client";
import { RenderResult, render, waitFor } from "../../../test-utils";
import { ApolloProvider } from "@apollo/client";
import { Restaurant } from "../restaurant";

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useParams: () => ({ id: "1" }),
  };
});

jest.mock("@apollo/client", () => {
  const realModule = jest.requireActual("@apollo/client");
  return {
    ...realModule,
    useQuery: () => ({
      data: {
        restaurant: {
          ok: true,
          error: "test-error",
          restaurant: {
            __typename: "Restaurant",
            id: 1,
            name: "rname",
            coverImg: "xxx",
            address: "addr",
            isPromoted: true,
            category: {
              name: "cname",
            },
          },
        },
      },
      loading: false,
    }),
  };
});

describe("<Restaurant />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;

  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Restaurant />
        </ApolloProvider>
      );
    });
  });

  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Nuber-Eats | rname");
    });
  });

  it("should show title", async () => {
    const { getByRole } = renderResult;
    await waitFor(() => {
      expect(getByRole("title").firstChild).toHaveTextContent("rname");
      expect(getByRole("title").getElementsByTagName("a")[0]).toHaveAttribute(
        "href",
        "/category/cname"
      );
      expect(getByRole("title").lastChild).toHaveTextContent("addr");
    });
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
