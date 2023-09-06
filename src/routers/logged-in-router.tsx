import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Restaurants } from "../pages/client/restaurants";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { Search } from "../pages/client/search";

const ClientRouter = [
  <Route path="/" exact key={Math.random()}>
    <Restaurants />
  </Route>,
  <Route path="/confirm" exact key={Math.random()}>
    <ConfirmEmail />
  </Route>,
  <Route path="/edit-profile" exact key={Math.random()}>
    <EditProfile />
  </Route>,
  <Route path="/search" key={Math.random()}>
    <Search />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Client" && ClientRouter}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
