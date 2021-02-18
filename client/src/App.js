import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Upcoming from "./components/matches/Upcoming";
import CurrentMatches from "./components/matches/CurrentMatches";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/upcoming" component={Upcoming} />
              <Route exact path="/current" component={CurrentMatches} />

            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
