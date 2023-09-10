import { MockApolloClient, createMockClient } from "mock-apollo-client";
import { RenderResult, render, waitFor } from "../../../test-utils";
import { Category } from "../category";
import { ApolloProvider } from "@apollo/client";

const mockedPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useParams: () => ({ slug: "test" }),
    useHistory: () => {
      return {
        push: mockedPush,
      };
    },
  };
});

jest.mock("@apollo/client", () => {
  const realModule = jest.requireActual("@apollo/client");
  return {
    ...realModule,
    useQuery: () => ({
      data: {
        category: {
          ok: true,
          error: "test-error",
          totalPages: 1,
          totalResult: 1,
          restaruants: [
            {
              __typename: "Restaruant",
              id: 1,
              name: "rname",
              coverImg: "xxx",
              category: {
                name: "cname",
              },
              address: "addr",
              isPromoted: true,
            },
          ],
          category: {
            __typename: "Category",
            id: 1,
            name: "cname",
            coverImg: "xxx",
            restaurantCount: 1,
            slug: "cslug",
          },
        },
      },
      loading: false,
    }),
  };
});

describe("<Category />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  const mockStorage = `[{"__typename":"Category","id":5,"name":"분식","coverImg":"/images/category/분식.png","restaurantCount":1,"slug":"분식"}]`;

  beforeEach(async () => {
    jest
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => mockStorage);
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Category />
        </ApolloProvider>
      );
    });
  });
  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Nuber-Eats | Category");
    });
  });

  it("should show restaurants", async () => {
    const { getByRole, debug } = renderResult;

    await waitFor(() => {
      expect(getByRole("restaurant"));
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
