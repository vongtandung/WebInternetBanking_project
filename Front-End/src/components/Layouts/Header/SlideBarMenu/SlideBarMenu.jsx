import React, { Component } from 'react';
import './SlideBarMenu.css';
import homeIco from '../../../../assets/images/ico/home-ico.png';
import tradeIco from '../../../../assets/images/ico/trade-history-ico.png';
import profileIco from '../../../../assets/images/ico/profile-menu-ico.png';

class SlideBarMenu extends Component {
  render() {
    return (
      <div className="slidebar-menu">
        <div className="menu-home">
          <button type="button" className="menu-home-btn hvr-pulse">
            <img src={homeIco} alt="Home" />
          </button>
          <span>Trang chủ</span>
        </div>
        <div className="menu-trade">
          <button type="button" className="menu-trade-btn hvr-pulse">
            <img src={tradeIco} alt="Trade" />
          </button>
          <span>Giao dịch</span>
        </div>
        <div className="menu-profile">
          <button type="button" className="menu-profile-btn hvr-pulse">
            <img src={profileIco} alt="Profile" />
          </button>
          <span>Cá nhân</span>
        </div>
      </div>
    );
  }
}

export default SlideBarMenu;
