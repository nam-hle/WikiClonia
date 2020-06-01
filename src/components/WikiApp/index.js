import React from "react";
import Article from "./Article";
import Menu from "./Menu";
import Footer from "./Footer";
import { Switch, Route, Redirect } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <Menu />
      <Switch>
        <Route path="/:title">
          <Article />
        </Route>
        <Route path="/">
          <Redirect to="/wikipedia" />
        </Route>
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default App;
