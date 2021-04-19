import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import DetailPage from "./pages/DetailPage";
import { Favorite } from "@material-ui/icons";
import NowPlayingPage from "./pages/NowPlayingPage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/now" component={NowPlayingPage} />
          <Route exact path="/movie/:id" component={DetailPage} />
          <Route exact path="/favorite" component={Favorite} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
