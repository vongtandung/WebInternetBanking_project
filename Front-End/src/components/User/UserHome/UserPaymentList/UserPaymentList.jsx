import React, { Component } from "react";
import "./UserPaymentList.css"
class UserPaymentList extends Component {
  componentWillMount() {
    this.handleRoute(true);
  }
  componentWillUnmount(){
    this.handleRoute(false);
  }
  handleRoute = (value) => {
    this.props.isRoute(value);
  };
  render() {
    return (
      <div className="user-send-money">
      <div className="send-money-ico">
      </div>
      </div>
    );
  }
}

export default UserPaymentList;
