import React, { Component } from "react";
import "./User.css";
import { Switch, Route, Redirect } from "react-router-dom";
import UserHome from "./UserHome";
import UserHistory from "./UserHistory";

class User extends Component {
  render() {
    return (
      <div className="user">
        <div className="user-box user-box-container">
          <Switch>
            <Route path="/user/home" component={UserHome} />
            <Route exact path="/user/history" component={UserHistory} />
            <Route exact render={() => <Redirect to="/user/home" />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default User;
