import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/Layouts/Header";
import Login from "./components/Authen/Login";
import User from './components/User';


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Header />
          <Switch>
            <Route path="/user" component={User}/>
            <Route exact path="/login" component={Login}/>
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
