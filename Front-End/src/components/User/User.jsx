import React, { Component } from "react";
import "./User.css";
import { Switch, Route, Redirect } from "react-router-dom";
import UserHome from "./UserHome";
class User extends Component {
  render() {
    return (
      <div className="user">
        <div className="user-box user-box-container">
          <Switch>
            <Route path="/user/home" component={UserHome} />
            <Route exact render={() => <Redirect to="/user/home" />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default User;
