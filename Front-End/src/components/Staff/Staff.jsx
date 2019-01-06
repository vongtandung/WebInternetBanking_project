import React, { Component } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import "./Staff.css";
import HeaderStaff from "./HeaderStaff";
import CreateAcc from "./CreateAcc";
import ManageAcc from "./ManageAcc";

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
                    to="/staff/manage"
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
                <Route exact path="/staff/create" component={CreateAcc} />
                <Route exact path="/staff/manage" component={ManageAcc} />
                <Route exact render={() => <Redirect to="/staff/create" />} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Staff;
