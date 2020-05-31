import React from "react";
import SearchIcon from "./../../../asset/images/search.svg";
import MenuIcon from "./../../../asset/images/menu.svg";

import "./style.sass";

const Menu = () => {
  return (
    <div className="menu-wrapper">
      <div className="menu">
        <div className="menu__logo">
          <span className="logo-wiki">Wiki</span>
          <span className="logo-pedia">pedia</span>
          <span className="logo-icon">W</span>
        </div>

        <div className="menu__search">
          <div className="menu__search-icon">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search Wikipedia"
            className="menu__search-input"
          />
        </div>
        <div className="menu__main">
          <button className="menu__button">VIEW SOURCE</button>
          <button className="menu__button" id="theme-switch">
            LIGHT MODE
          </button>
          <button className="menu__button menu__icon">
            <MenuIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
