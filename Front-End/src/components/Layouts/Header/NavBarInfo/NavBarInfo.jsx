import React, { Component } from "react";
import "./NavBarInfo.css";
import { NavLink } from "react-router-dom";
import WebService from "../../../../utilities/WebServices";
import searchIco from "../../../../assets/images/ico/search-ico.png";
import homeIco from "../../../../assets/images/ico/home-ico.png";
import tradeIco from "../../../../assets/images/ico/trade-history-ico.png";
import profileIco from "../../../../assets/images/ico/profile-menu-ico.png";
import notiIco from "../../../../assets/images/ico/notification-ico.png";
import avatar from "../../../../assets/images/pic/avartar-sp.jpg";
import logo from "../../../../assets/images/pic/bank-logo.png";

class NavBarInfo extends Component {
  constructor(){
    super();
    this.webService = new WebService();
  }
  render() {
    return (
      <div className="navbar-header">
        <div className="navbar-info">
          <div className="navbar-info-left">
            <div className="navbar-info-symbol">
              <a href="/" className="navbar-info-symbol-logo">
                <img src={logo} alt="" />
              </a>
            </div>
            <div className="navbar-info-title">Newsfeed</div>
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
            <div className="user-inf inline-items">
              <div className="user-inf-img">
                <img src={avatar} alt="" />
                <span className="icon-status online" />
                <div class="more-dropdown more-with-triangle">
						<div class="mCustomScrollbar ps ps--theme_default" data-mcs-theme="dark" data-ps-id="b4b06a41-8ecc-06cc-7f68-746321274b59">
							<div class="ui-block-title ui-block-title-small">
								<h6 class="title">Your Account</h6>
							</div>

							<ul class="account-settings">
								<li>
									<a href="29-YourAccount-AccountSettings.html">
										<span>Profile Settings</span>
									</a>
								</li>
								<li>
									<a href="36-FavPage-SettingsAndCreatePopup.html">
										<span>Create Fav Page</span>
									</a>
								</li>
								<li>
									<a href="#">
										<span>Log Out</span>
									</a>
								</li>
							</ul>
</div>
					</div>
              </div>
              <div class="user-inf-content">
                <div class="author-title">
                  {this.webService.getUserName()}
                  <span></span>
                </div>
                <span class="author-subtitle">Số dư: 12311  </span>
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

export default NavBarInfo;
