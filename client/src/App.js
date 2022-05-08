import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home2 from "./Home";
import Register from "./Register";
import Customer from "./Customer";
import Bank from "./Bank";

import "./assets/scss/style.scss";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home2} />
          <Route path="/register" exact component={Register} />
          <Route path="/customer" exact component={Customer} />
          <Route path="/bank" exact component={Bank} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
