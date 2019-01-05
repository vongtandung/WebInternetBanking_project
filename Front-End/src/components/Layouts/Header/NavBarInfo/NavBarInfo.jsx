import React, { Component } from "react";
import "./NavBarInfo.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import WebService from "../../../../utilities/WebServices";
import searchIco from "../../../../assets/images/ico/search-ico.png";
import homeIco from "../../../../assets/images/ico/home-ico.png";
import tradeIco from "../../../../assets/images/ico/trade-history-ico.png";
import profileIco from "../../../../assets/images/ico/profile-menu-ico.png";
import notiIco from "../../../../assets/images/ico/notification-ico.png";
import avatar from "../../../../assets/images/pic/avartar-sp.jpg";
import logo from "../../../../assets/images/pic/bank-logo.png";

class NavBarInfo extends Component {
  constructor() {
    super();
    this.webService = new WebService();
  }
  
  handleLogoutOnClick = () =>{
    this.webService.logout();
  }
  render() {
    const {title} = this.props.pageTitle
    return (
      <div className="navbar-header">
        <div className="navbar-info">
          <div className="navbar-info-left">
            <div className="navbar-info-symbol">
              <a href="/" className="navbar-info-symbol-logo">
                <img src={logo} alt="" />
              </a>
            </div>
            <div className="navbar-info-title">
            <span className="navbar-info-title-child">{title}</span>
            </div>
            <div className="navbar-info-search">
              <form method="post" className="navbar-search-form">
                <input
                  type="text"
                  className="search-form-textbox"
                  placeholder="Tìm kiếm ..."
                />
                <button type="button" className="search-form-button">
                  <img
                    src={searchIco}
                    alt=""
                    className="search-form-button-ico"
                  />
                </button>
              </form>
            </div>
          </div>
          <div className="navbar-info-right">
            <div className="user-control">
              <div className="user-ctrl-req">
                <button type="button" className="btn-user-noti">
                  <img src={notiIco} alt="" />
                  <div className="btn-user-label btn-user-label-bg3">6</div>
                </button>
              </div>
            </div>
            <div className="user-inf user-option">
              <div className="user-inf-img">
                <img src={avatar} alt="" />
                <span className="icon-status online" />
              </div>
              <div className="user-inf-content">
                <div className="author-title">
                  <span className="author-name">
                    {this.webService.getUserName()}
                  </span>
                </div>
                <span className="author-subtitle">
                  Số dư: 123132312
                </span>
              </div>
              <div className="user-inf-carpet">
                <i className="fas fa-caret-down" style={{ color: "white" }} />
              </div>
              <div className="user-option">
                <ul className="user-option-dropdown more-with-triangle">
                  <li>
                    <a href="/login" onClick={this.handleLogoutOnClick}>
                      Đăng xuất
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-header-reponsive">
          <NavLink
            to="/user/home"
            className="nav-repo-home box-repo"
            activeClassName="menu-home-active-repon"
          >
            <div className="nav-repo-home box-repo">
              <img src={homeIco} alt="" />
              <span>Trang chủ</span>
            </div>
          </NavLink>
          <NavLink
            to="/user/history"
            className="nav-repo-home box-repo"
            activeClassName="menu-trade-active-repon"
          >
            <div className="nav-repo-trade box-repo">
              <img src={tradeIco} alt="" />
              <span>Giao dịch</span>
            </div>
          </NavLink>
          <div className="nav-repo-profile box-repo">
            <img src={profileIco} alt="" />
            <span>Cá nhân</span>
          </div>
        </div>
      </div>
    );
  }
  c;
}

const mapStateToProps = state => ({
  pageTitle: state.pageTitle
});

export default connect(
  mapStateToProps,
  null
)(NavBarInfo);
