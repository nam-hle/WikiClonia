import React from "react";
import MenuIcon from "./../../asset/images/menu.svg";
import SearchBar from "./../SearchBar";

import "./style.sass";

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

    const reveal = () => {
      const classes = [
        "menu__search",
        "menu__view-source-button",
        "menu__switch-theme-button"
      ];
      for (const className of classes) {
        let el = document.getElementsByClassName(className)[0];
        el.classList.toggle("mobile-hidden");
      }
    };

    let sandwich = document.getElementsByClassName("menu__sandwich-button")[0];
    sandwich.addEventListener("click", reveal);
    return () => {
      toggle.removeEventListener("click", switcher);
      sandwich.removeEventListener("click", reveal);
    };
  }, []);

  return (
    <div className="menu-wrapper">
      <div className="menu">
        <div className="menu__logo">
          <span className="menu__logo--large logo-wiki">Wiki</span>
          <span className="menu__logo--large logo-clonia">Clonia</span>
          <span className="menu__logo--small logo-W">W</span>
        </div>

        <SearchBar />

        <button className="menu__button menu__view-source-button mobile-hidden">
          VIEW SOURCE
        </button>

        <button
          className="menu__button menu__switch-theme-button mobile-hidden"
          id="theme-switch"
        >
          LIGHT MODE
        </button>

        <button className="menu__button  menu__sandwich-button">
          <MenuIcon />
        </button>
      </div>
    </div>
  );
};

export default Menu;
