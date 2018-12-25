import React, { Component } from "react";
import "./UserHome.css";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import UserPaymentList from "./UserPaymentList";
import UserSend from "./UserSend";
import UserContact from "./UserContact";
import UserAcc from "./UserAcc";
import acclistIco from "../../../assets/images/ico/home-watch-ico.png";
import moneysendIco from "../../../assets/images/ico/home-send-ico.png";
import accaddrIco from "../../../assets/images/ico/home-addr-ico.png";
import acchistoryIco from "../../../assets/images/ico/home-history-ico.png";
import acccloseIco from "../../../assets/images/ico/home-acc-ico.png";

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
          <NavLink to="/user/home/contact" className="user-home-box">
            <img src={accaddrIco} alt="" className="user-home-btn" />
          </NavLink>
          <NavLink to="/user/history" className="user-home-box">
            <img src={acchistoryIco} alt="" className="user-home-btn" />
          </NavLink>
          <NavLink to="/user/home/close" className="user-home-box">
            <img src={acccloseIco} alt="" className="user-home-btn" />
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
            <Route
              exact
              path="/user/home/contact"
              render={props => (
                <UserContact {...props} isRoute={this.handleRoute} />
              )}
            />
            <Route
              exact
              path="/user/home/close"
              render={props => (
                <UserAcc {...props} isRoute={this.handleRoute} />
              )}
            />
            {this.state.isRoute === true ? (
              <Route exact render={() => <Redirect to="/user/" />} />
            ) : null}
          </Switch>
        </div>
      </div>
    );
  }
}

export default UserHome;
