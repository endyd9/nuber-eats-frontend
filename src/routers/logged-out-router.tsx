import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Login } from "../pages/login";
import { Join } from "../pages/join";
import { NotFound } from "../pages/404";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/join"}>
          <Join />
        </Route>
        <Route path={"/"} exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
