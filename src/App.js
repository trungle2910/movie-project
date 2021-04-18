import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TvShows from "./pages/TvShows";
import TvTopRate from "./components/TvTopRate";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/tv" component={TvTopRate} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
