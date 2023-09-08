import { render } from "@testing-library/react";
import { Button } from "../button";

describe("<Button />", () => {
  it("should render acttionText", () => {
    const { getByText } = render(
      <Button canClick={true} loading={false} acttionText={"test"} />
    );
    getByText("test");
  });

  it("should display loading", () => {
    const { getByText, container } = render(
      <Button canClick={false} loading={true} acttionText={"test"} />
    );
    getByText("Loading...");
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });
});
