import { render } from "@testing-library/react";
import { SearchBar } from "../search-bar";

describe("<SearchBar />", () => {
  it("renders OK", () => {
    const { debug } = render(<SearchBar />);
  });
});
