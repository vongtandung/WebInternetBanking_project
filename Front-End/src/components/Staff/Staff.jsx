import React, { Component } from "react";
import "./Staff.css";
import HeaderStaff from "./HeaderStaff";

class Staff extends Component {
  componentWillMount() {
    this.props.isLogged(true);
  }
  render() {
    return (
      <div className="locate">
        <HeaderStaff />
        <div id="wrapper">
          <div>
            <ul className="sidebar navbar-nav">
              <div className="scroll-box">
                <div className="scroll-box-content" />
              </div>
            </ul>
          </div>
          <div id="content-wrapper">
            <div className="" />
          </div>
        </div>
      </div>
    );
  }
}

export default Staff;
