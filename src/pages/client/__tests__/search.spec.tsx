import { ApolloProvider } from "@apollo/client";
import { RenderResult, act, render, waitFor } from "../../../test-utils";
import { SERACH_RESTAURANT, Search } from "../search";
import { createMockClient } from "mock-apollo-client";

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useLoacuton: () => {
      return {
        search: "?term=test",
      };
    },
    useHistory: () => {
      return {
        replace: jest.fn(),
        push: jest.fn(),
      };
    },
  };
});

describe("<Search />", () => {
  let renderResult: RenderResult;
  const mockStorage = `[{"__typename":"Category","id":5,"name":"분식","coverImg":"/images/category/분식.png","restaurantCount":1,"slug":"분식"}]`;
  beforeEach(async () => {
    const mockedClient = createMockClient();
    const mockedLazyQueryResponse = jest.fn().mockResolvedValue({
      data: {
        serachRestaurant: {
          ok: true,
          error: "error",
          totalPages: 1,
          totalResult: 1,
          restaurants: [
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
        },
      },
    });

    mockedClient.setRequestHandler(SERACH_RESTAURANT, mockedLazyQueryResponse);
    await waitFor(() => {
      jest
        .spyOn(Storage.prototype, "getItem")
        .mockImplementation(() => mockStorage);
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Search />
        </ApolloProvider>
      );
    });
  });
  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Nuber-Eats | Search");
    });
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
