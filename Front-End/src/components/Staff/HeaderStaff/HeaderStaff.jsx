import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./HeaderStaff.css";
import logo from "../../../assets/images/pic/bank-logo.png";
import WebService from "../../../utilities/WebServices";

class HeaderStaff extends Component {
  constructor(props) {
    super(props);
    this.webService = new WebService();
  }
  handleLogoutStaff = () =>{
    this.webService.logout();
    this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
          <a className="navbar-brand mr-1" href="/staff">
            <img src={logo} alt="" />
            <span>Nhân viên</span>
          </a>
          {/* Navbar Search */}
          <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>
          <ul className="navbar-nav ml-auto ml-md-0">
            <li className="nav-item dropdown no-arrow">
              <div
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-user-circle fa-fw fa-2x" />
              </div>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="userDropdown"
              >
                <button
                  className="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#logoutModal"
                  onClick={this.handleLogoutStaff}
                >
                  Đăng xuất
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default withRouter(HeaderStaff);
