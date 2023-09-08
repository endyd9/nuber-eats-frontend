import { render, waitFor } from "@testing-library/react";
import App from "../app";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../../apollo";
import { act } from "react-dom/test-utils";

jest.mock("../../routers/logged-out-router", () => {
  return {
    LoggedOutRouter: () => <span>logout</span>,
  };
});

jest.mock("../../routers/logged-in-router", () => {
  return {
    LoggedInRouter: () => <span>login</span>,
  };
});

describe("<App />", () => {
  it("renders LoggedOutRouter", () => {
    const { getByText } = render(<App />);
    getByText("logout");
  });
  it("renders LoggedInRouter", async () => {
    const { getByText } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    getByText("login");
  });
});
