import React from "react";
import MenuIcon from "./../../../asset/images/menu.svg";
import SearchBar from "./../SearchBar";

import "./style.sass";
import "./style.css";

const Menu = () => {
  React.useEffect(() => {
    let toggle = document.getElementById("theme-switch");

    let switcher = function(e) {
      e.preventDefault();
      if (document.body.classList.contains("funky")) {
        toggle.innerText = "LIGHT MODE";
        document.body.classList.remove("funky");
      } else {
        toggle.innerText = "DARK MODE";
        document.body.classList.add("funky");
      }
    };
    toggle?.addEventListener("click", switcher);

    return () => toggle.removeEventListener("click", switcher);
  }, []);

  return (
    <div className="menu-wrapper">
      <div className="menu">
        <div className="menu__logo">
          <span className="logo-wiki">Wiki</span>
          <span className="logo-pedia">pedia</span>
          <span className="logo-icon">W</span>
        </div>

        <SearchBar className="menu__search" />

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
