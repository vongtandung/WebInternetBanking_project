import React, { Component } from 'react';
import './NavBarInfo.css';
import searchIco from '../../../../assets/images/ico/search-ico.png';
import homeIco from '../../../../assets/images/ico/home-ico.png';
import tradeIco from '../../../../assets/images/ico/trade-history-ico.png';
import profileIco from '../../../../assets/images/ico/profile-menu-ico.png';
import notiIco from '../../../../assets/images/ico/notification-ico.png';
import avatar from '../../../../assets/images/pic/avartar-sp.jpg';

class NavBarInfo extends Component {
  render() {
    return (
      <div className="navbar-header">
        <div className="navbar-info">
          <div className="navbar-info-left">
            <div className="navbar-info-symbol">
              <a href="/" className="navbar-info-symbol-logo">

              </a>
            </div>
            <div className="navbar-info-title">
              Newsfeed
          </div>
            <div className="navbar-info-search">
              <form method="post" className="navbar-search-form">
                <input type="text" className="search-form-textbox" placeholder="Tìm kiếm ..." />
                <button type="button" className="search-form-button">
                  <img src={searchIco} alt="" className="search-form-button-ico" />
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
            <div className="user-inf">
              <div className="user-inf-img">
                <img src={avatar} alt="" />
                <span className="icon-status online"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-header-reponsive">
          <div className="nav-repo-home box-repo">
            <img src={homeIco} alt="" />
            <span>Trang chủ</span>
          </div>
          <div className="nav-repo-trade box-repo">
            <img src={tradeIco} alt="" />
            <span>Giao dịch</span>
          </div>
          <div className="nav-repo-profile box-repo">
            <img src={profileIco} alt="" />
            <span>Cá nhân</span>
          </div>
        </div>
      </div>
    );
  } c
}

export default NavBarInfo;
