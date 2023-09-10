import { fireEvent, render, waitFor } from "@testing-library/react";
import { SearchBar } from "../search-bar";
import userEvent from "@testing-library/user-event";

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

describe("<SearchBar />", () => {
  it("renders OK", () => {
    const { debug } = render(<SearchBar />);
  });

  it("should be Searching", async () => {
    const { getByPlaceholderText } = render(<SearchBar />);

    const term = getByPlaceholderText("검색어를 입력하세요.");

    userEvent.type(term, "test");
    fireEvent.submit(term);
    await waitFor(() => {
      expect(mockedPush).toHaveBeenCalledWith({
        pathname: "/search",
        search: `term=test`,
      });
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
