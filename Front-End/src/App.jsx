import React, { Component } from "react";
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import store from './store';
import "./App.css";

import Header from "./components/Layouts/Header";
import Error from "./components/Layouts/Error";
import Popup from "./components/Layouts/Popup";
import Login from "./components/Authen/Login";
import User from "./components/User";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false
    };
  }
  hideLayout = value => {
    this.setState({ isLogged: value });
  };
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {this.state.isLogged ? null : <Header />}
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/login" />} />
              <Route path="/user" render={props => <User {...props} isLogged={this.hideLayout} />} />
              <Route
                exact
                path="/login"
                render={props => <Login {...props} isLogged={this.hideLayout} />}
              />
              <Route
                exact
                render={props => <Error {...props} isLogged={this.hideLayout} />}
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
