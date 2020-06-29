import React from "react";
import "./style.sass";

const Footer = () => {
  return (
    <div className="footer">
      <div className="subfooter subfooter__about-project">
        <div className="subfooter__title">ABOUT PROJECT</div>
        <div className="subfooter__content">
          {`This project redefines the way we use wikipedia entirely. From actual wikitext format in each article, we parse and convert it into new beautiful websites with React library.`}
          <a href="#">Source</a>
        </div>
      </div>

      <div className="subfooter subfooter__about-me">
        <div className="subfooter__title">ABOUT ME</div>
        <div className="subfooter__content">
          <a href="https://github.com/">GitHub</a>
          <a href="https://stackoverflow.com">Stack Overflow</a>
          <a href="https://facebook.com">Facebook</a>
          <a href="https://google.com">Mail</a>
        </div>
      </div>

      <div className="subfooter subfooter__quick-links">
        <div className="subfooter__title">QUICK LINKS</div>
        <div className="subfooter__content">
          <a href="#">Home</a>
          <a href="#">Top of page</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
