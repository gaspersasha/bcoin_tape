import React from 'react'
import { slide as Menu } from 'react-burger-menu'


export const MobileMenu = () => {
  return (
    <Menu right pageWrapId="page" outerContainerId="app">
      <a id="home" className="menu-item" href="/">Roulette</a>
      <a id="about" className="menu-item" href="/Balance">Balance</a>
      <a id="about" className="menu-item" href="/Exchange">Exchange</a>
      <a id="contact" className="menu-item" href="/About">About</a>
      <a className="menu-item--small" href="/">Settings</a>
    </Menu>
  )
}

// Header.propTypes = {

// };

export default MobileMenu;
