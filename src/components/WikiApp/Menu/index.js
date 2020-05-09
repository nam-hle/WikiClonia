import React from "react";
import SearchIcon from "./../../../asset/images/search.svg";
// import ProfileIcon from "./../../../asset/images/profile.svg";
import "./style.sass";

const Menu = () => {
  return (
    <div className="menu-wrapper">
      <div className="menu">
        <div className="menu__left">
          <span className="logo-wiki">Wiki</span>
          <span className="logo-pedia">pedia</span>
        </div>

        <div className="menu__right">
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
        </div>
      </div>
    </div>
  );
};

export default Menu;
