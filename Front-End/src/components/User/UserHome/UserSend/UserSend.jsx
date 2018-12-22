import React, { Component } from "react";
import "./UserSend.css";
import moneySendIco from "../../../../assets/images/ico/send-money-ico.png";
class UserSend extends Component {
  componentWillMount() {
    this.handleRoute(true);
  }
  componentWillUnmount() {
    this.handleRoute(false);
  }
  handleRoute = value => {
    this.props.isRoute(value);
  };
  render() {
    return (
      <div className="user-send-money">
        <div className="send-money-ico">
        <img src={moneySendIco} alt=""/>
        </div>
      </div>
    );
  }
}

export default UserSend;
