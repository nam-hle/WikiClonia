import React from "react";
import SearchIcon from "./../../../asset/images/search.svg";
import ProfileIcon from "./../../../asset/images/profile.svg";
import "./style.sass";

const Menu = () => (
  <div className="menu">
    <div className="menu__left">
      <span className="logo-wiki">Wiki</span>
      <span className="logo-pedia">pedia</span>
    </div>
    <div className="menu__main">
      <button className="menu__button button--choose">Article</button>
      <button className="menu__button">Talk</button>
      <button className="menu__button button--choose">Read</button>
      <button className="menu__button">View source</button>
      <button className="menu__button">View history</button>
    </div>
    <div className="menu__search-icon">
      <SearchIcon />
    </div>
    <div className="menu__right">
      <input
        type="text"
        placeholder="Search Wikipedia"
        className="menu__search-input"
      />
      <div className="menu__profile-icon">
        <ProfileIcon />
      </div>
    </div>
  </div>
);

export default Menu;
