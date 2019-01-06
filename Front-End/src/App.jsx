import React, { Component } from "react";
import { Provider } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import store from "./store";
import WebService from "./utilities/WebServices";
import "./App.css";

import Header from "./components/Layouts/Header";
import Error from "./components/Layouts/Error";
import Popup from "./components/Layouts/Popup";
import Login from "./components/Authen/Login";
import User from "./components/User";
import Staff from "./components/Staff";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false
    };
    this.webService = new WebService();
  }
  hideLayout = value => {
    this.setState({ isLogged: value });
  };
  render() {
    const isAdmin = this.webService.isAdminPermiss();
    const isUser = this.webService.isUserPermiss();
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {this.state.isLogged ? null : <Header />}
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/login" />} />
              {isAdmin ? (
                <Route
                  path="/staff"
                  render={props => (
                    <Staff {...props} isLogged={this.hideLayout} />
                  )}
                />
              ) : null}
              {isUser ? (
                <Route
                  path="/user"
                  render={props => (
                    <User {...props} isLogged={this.hideLayout} />
                  )}
                />
              ) : null}
              <Route
                exact
                path="/login"
                render={props => (
                  <Login {...props} isLogged={this.hideLayout} />
                )}
              />
              <Route
                exact
                render={props => (
                  <Error {...props} isLogged={this.hideLayout} />
                )}
              />
            </Switch>
            <Popup />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
