import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/layout/Navbar";
import Upcoming from "./components/matches/Upcoming";
import MatchesShow from "./components/matches/MatchesShow";
import MatchesShowAdmin from "./components/matches/MatchesShowAdmin";
import Matches from "./components/matches/Matches";
import LandingPage from "./LandingPage";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import { Container } from "@material-ui/core";
import history from "./history";

function App() {
  return (
    <Provider store={store}>
      <Router forceRefresh history={history}>
        <Navbar />
        <Route exact path="/" component={LandingPage} />
        <Container maxWidth="md">
          <div style={{ height: "92vh", marginTop: "100px" }}>
            <Switch>
              <Route exact path="/upcoming" component={Upcoming} />
              <Route exact path="/matches" component={Matches} />
              <Route exact path="/matches/:id" component={MatchesShow} />
              <Route
                exact
                path="/matches/:id/admin"
                component={MatchesShowAdmin}
              />
            </Switch>
          </div>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
