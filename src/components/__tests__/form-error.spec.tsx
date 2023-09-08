import { render } from "@testing-library/react";
import { FormError } from "../form-error";

describe("<FromError />", () => {
  it("renders OK with props", () => {
    const { getByText } = render(<FormError errorMessage="test" />);
    getByText("test");
  });
});
