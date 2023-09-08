import { render, waitFor } from "@testing-library/react";
import { Header } from "../header";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import { ME_QUERY } from "../../hooks/useMe";

describe("<Header />", () => {
  it("renders verify user", async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "test@user.com",
                    role: "Client",
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );

      await new Promise((res) => setTimeout(res, 0));

      expect(queryByText("이메일 인증을 완료해 주세요.")).toBeNull();
    });
  });

  it("renders verify user", async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "test@user.com",
                    role: "Client",
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );

      await new Promise((res) => setTimeout(res, 0));
      getByText("이메일 인증을 완료해 주세요.");
    });
  });
});
