import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import "./Staff.css";
import HeaderStaff from "./HeaderStaff";
import CreateAcc from "./CreateAcc";

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
                <div className="scroll-box-content">
                  <NavLink
                    to="/staff/create"
                    className="nav-link-custom"
                    activeClassName="nav-link-custom-active"
                  >
                    <div className="menu-staff-ele">
                      <span className="menu-staff-title">
                        <i className="far fa-address-card fa-2x" />
                      </span>
                      <span className="menu-staff-title">
                        &nbsp;Tạo tài khoản khách hàng
                      </span>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/staff/user-manager"
                    className="nav-link-custom"
                    activeClassName="nav-link-custom-active"
                  >
                    <div className="menu-staff-ele">
                      <span className="menu-staff-title">
                        <i className="far fa-list-alt fa-2x" />
                      </span>
                      <span className="menu-staff-title">
                        &nbsp;&nbsp;Quản lý khách hàng
                      </span>
                    </div>
                  </NavLink>
                </div>
              </div>
            </ul>
          </div>
          <div id="content-wrapper">
            <div className="content-wrapper-box">
              <Switch>
                <Route path="/staff/create" component={CreateAcc} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Staff;
