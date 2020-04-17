import React from "react";
import SearchIcon from "./../../../asset/images/search.png";
// import MenuIcon from "./../../../asset/images/circles.svg";
// import ProfileIcon from "./../../../asset/images/profile.png";

const Menu = () => (
  <div className="menu">
    <div className="menu__left-panel">
      <div className="logo">
        <span className="logo-wiki">Wiki</span>
        <span className="logo-pedia">pedia</span>
      </div>
      <div className="menu__button-wrapper">
        <button className="menu__button button--choose">Article</button>
        <button className="menu__button">Talk</button>
        <div className="menu__button-spacer" />
        <button className="menu__button button--choose">Read</button>
        <button className="menu__button">View source</button>
        <button className="menu__button">View history</button>
      </div>
    </div>
    <div className="menu__right-panel">
      <div className="menu__search-icon">
        <img src={SearchIcon} />
      </div>
      <div className="menu__input-wrapper">
        <input
          type="text"
          placeholder="Search Wikipedia"
          className="menu__search-input"
        />
      </div>
    </div>
  </div>
);

export default Menu;
