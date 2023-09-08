import { render } from "@testing-library/react";
import { Restaurant } from "../restaurant";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Restaurant / >", () => {
  const NotPromotedRestaurantProps = {
    id: 1,
    name: "name",
    categoryName: "cate",
    coverImg: "none",
    isPromoted: false,
  };
  const PromotedRestaurantProps = {
    id: 2,
    name: "name",
    categoryName: "cate",
    coverImg: "none",
    isPromoted: true,
  };
  const SearchRomotedRestaurantProps = {
    id: 1,
    name: "name",
    categoryName: "cate",
    coverImg: "none",
    isPromoted: true,
    isSearch: true,
  };
  it("should render PromotedRestaurant Only", () => {
    const { getByText, container, rerender } = render(
      <Router>
        <Restaurant {...PromotedRestaurantProps} />
      </Router>
    );
    getByText(PromotedRestaurantProps.name);
    getByText(PromotedRestaurantProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurant/${PromotedRestaurantProps.id}`
    );
    rerender(
      <Router>
        <Restaurant {...NotPromotedRestaurantProps} />
      </Router>
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render All Restaurant", () => {
    const { getByText, container, rerender } = render(
      <Router>
        <Restaurant {...PromotedRestaurantProps} />
      </Router>
    );
    getByText(PromotedRestaurantProps.name);
    getByText(PromotedRestaurantProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurant/${PromotedRestaurantProps.id}`
    );

    rerender(
      <Router>
        <Restaurant {...NotPromotedRestaurantProps} isSearch />
      </Router>
    );
    getByText(NotPromotedRestaurantProps.name);
    getByText(NotPromotedRestaurantProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurant/${NotPromotedRestaurantProps.id}`
    );

    rerender(
      <Router>
        <Restaurant {...SearchRomotedRestaurantProps} />
      </Router>
    );
    getByText(SearchRomotedRestaurantProps.name);
    getByText(SearchRomotedRestaurantProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurant/${SearchRomotedRestaurantProps.id}`
    );
  });
});
