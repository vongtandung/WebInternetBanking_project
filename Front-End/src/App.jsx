import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import User from './components/User';

import Header from "./components/Layouts/Header";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Header />
          <Switch>
            <Route path="/user" component={User}/>
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
