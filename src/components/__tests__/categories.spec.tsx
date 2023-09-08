import { render } from "@testing-library/react";
import { Categories } from "../categories";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Categories />", () => {
  it("renders OK", () => {
    const categoryProps = {
      id: 1,
      coverImg: "x",
      name: "category1",
      slug: "category1",
    };
    const { debug, getByText, container } = render(
      <Router>
        <Categories {...categoryProps} />
      </Router>
    );
    getByText(categoryProps.name);
    getByText(categoryProps.slug);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/category/${categoryProps.slug}`
    );
  });
});
