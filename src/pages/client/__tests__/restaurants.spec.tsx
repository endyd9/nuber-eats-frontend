import { ApolloProvider } from "@apollo/client";
import { RenderResult, act, render, waitFor } from "../../../test-utils";
import { Restaurants } from "../restaurants";
import { MockApolloClient, createMockClient } from "mock-apollo-client";
import userEvent from "@testing-library/user-event";

jest.mock("@apollo/client", () => {
  const realModule = jest.requireActual("@apollo/client");
  return {
    ...realModule,
    useQuery: () => ({
      data: {
        restaurants: {
          ok: true,
          error: "test-error",
          totalPages: 2,
          totalResult: 4,
          results: [
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
            {
              __typename: "Restaruant",
              id: 2,
              name: "rname2",
              coverImg: "xxx",
              category: {
                name: "cname",
              },
              address: "addr",
              isPromoted: true,
            },
            {
              __typename: "Restaruant",
              id: 3,
              name: "rname3",
              coverImg: "xxx",
              category: {
                name: "cname",
              },
              address: "addr",
              isPromoted: true,
            },
            {
              __typename: "Restaruant",
              id: 4,
              name: "rname4",
              coverImg: "xxx",
              category: {
                name: "cname",
              },
              address: "addr",
              isPromoted: true,
            },
          ],
        },
        allCategories: {
          oK: true,
          error: "error",
          categories: [
            {
              __typename: "Category",
              id: 1,
              name: "cname",
              coverImg: "xxx",
              restaurantCount: 1,
              slug: "cslug",
            },
          ],
        },
      },
      loading: false,
    }),
  };
});

describe("<Restaurants />", () => {
  let mockedCliet: MockApolloClient;
  let renderReslut: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedCliet = createMockClient();
      renderReslut = render(
        <ApolloProvider client={mockedCliet}>
          <Restaurants />
        </ApolloProvider>
      );
    });
  });

  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Nuber-Eats | Home");
    });
  });

  it("should render next, prev page", async () => {
    const { getByRole, debug } = renderReslut;
    act(() => {
      userEvent.click(getByRole("nextPage"));
    });
    await waitFor(() => {
      expect(getByRole("page")).toHaveTextContent("Page 2 of 2");
    });
    act(() => {
      userEvent.click(getByRole("prevPage"));
    });
    await waitFor(() => {
      expect(getByRole("page")).toHaveTextContent("Page 1 of 2");
    });
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
