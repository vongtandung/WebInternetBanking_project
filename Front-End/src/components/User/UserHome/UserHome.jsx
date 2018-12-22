import React, { Component } from "react";
import "./UserHome.css";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import UserPaymentList from "./UserPaymentList";
import UserSend from "./UserSend";
import acclistIco from "../../../assets/images/ico/home-watch-ico.png";
import moneysendIco from "../../../assets/images/ico/home-send-ico.png";
import accaddrIco from "../../../assets/images/ico/home-addr-ico.png";

class UserHome extends Component {
  state = {
    isRoute: false
  };
  handleRoute = boolean => {
    this.setState({ isRoute: boolean });
  };
  render() {
    return (
      <div className="user-home">
        <div hidden={this.state.isRoute} className="user-home-navigate">
          <NavLink to="/user/home/paylist" className="user-home-box">
            <img src={acclistIco} alt="" className="user-home-btn" />
          </NavLink>
          <NavLink to="/user/home/send" className="user-home-box">
            <img src={moneysendIco} alt="" className="user-home-btn" />
          </NavLink>
          <NavLink to="/user" className="user-home-box">
            <img src={accaddrIco} alt="" className="user-home-btn" />
          </NavLink>
        </div>
        <div hidden={!this.state.isRoute} className="user-home-route">
          <Switch>
            <Route
              exact
              path="/user/home/paylist"
              render={props => (
                <UserPaymentList {...props} isRoute={this.handleRoute} />
              )}
            />
            <Route
              exact
              path="/user/home/send"
              render={props => (
                <UserSend {...props} isRoute={this.handleRoute} />
              )}
            />
            {this.state.isRoute === true ? (
              <Route
                exact
                render={() => (
                  <Redirect
                    to="/user/
            
            "
                  />
                )}
              />
            ) : null}
          </Switch>
        </div>
      </div>
    );
  }
}

export default UserHome;
