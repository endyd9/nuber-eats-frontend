import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Login } from "../pages/login";
import { Join } from "../pages/join";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/join"}>
          <Join />
        </Route>
        <Route path={"/"}>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
