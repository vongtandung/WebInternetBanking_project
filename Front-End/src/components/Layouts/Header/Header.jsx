import React, { Component } from 'react';
import './Header.css'
import NavBarInfo from './NavBarInfo';
import SlideBarMenu from './SlideBarMenu';
class Header extends Component {
  render() {
    return (
      <header className="header">
        <NavBarInfo />
        <SlideBarMenu />
      </header>
    );
  }
}

export default Header;
