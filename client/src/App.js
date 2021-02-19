import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/layout/Navbar";
import Upcoming from "./components/matches/Upcoming";
import MatchesShow from "./components/matches/MatchesShow";
import Matches from "./components/matches/Matches";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div style={{ height: "92vh" }} className="container">
          <Switch>
            <Route exact path="/upcoming" component={Upcoming} />
            <Route exact path="/matches" component={Matches} />
            <Route exact path="/matches/:id" component={MatchesShow} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
