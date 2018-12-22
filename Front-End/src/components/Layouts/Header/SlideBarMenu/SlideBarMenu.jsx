import React, { Component } from "react";
import "./SlideBarMenu.css";
import { NavLink } from "react-router-dom";
import homeIco from "../../../../assets/images/ico/home-ico.png";
import tradeIco from "../../../../assets/images/ico/trade-history-ico.png";
import profileIco from "../../../../assets/images/ico/profile-menu-ico.png";

class SlideBarMenu extends Component {
  render() {
    return (
      <div className="slidebar-menu">
        <NavLink to="/user" activeClassName="menu-home-active">
          <div className="menu-home">
            <div className="hvr-icon-grow">
              <img src={homeIco} alt="Home" className="hvr-icon" />
              <span className="hvr-text">Trang chủ</span>
            </div>
          </div>
        </NavLink>
        <NavLink to="/ddd" activeClassName="menu-trade-active">
        <div className="menu-trade">
          <div className="hvr-icon-grow">
            <img src={tradeIco} alt="Trade" className="hvr-icon" />
            <span className="hvr-text">Giao dịch</span>
          </div>
        </div>
        </NavLink>
        <NavLink to="/asd" activeClassName="menu-profile-active">
        <div className="menu-profile">
          <div className="hvr-icon-grow">
            <img src={profileIco} alt="Profile" className="hvr-icon" />
            <span className="hvr-text">Cá nhân</span>
          </div>
        </div>
        </NavLink>
      </div>
    );
  }
}

export default SlideBarMenu;
