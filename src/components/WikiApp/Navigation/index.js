import React, { useRef } from "react";
import LeftButton from "./../../../asset/images/left.svg";
import RightButton from "./../../../asset/images/right.svg";
import "./style.sass";

const Navigation = ({ headings }) => {
  const headingsRef = useRef(null);

  const handle = direction => {
    let width = headingsRef.current.scrollWidth;
    let pos = headingsRef.current.scrollLeft;
    let visibleWidth = headingsRef.current.clientWidth;
    let maxPos = width - visibleWidth;
    let slideWidth = maxPos * 0.15;

    console.log({ width, pos, visibleWidth, maxPos });
    headingsRef.current.scrollLeft =
      direction == "right"
        ? Math.min(maxPos, pos + slideWidth)
        : Math.max(0, pos - slideWidth);
  };

  const handle2 = id => {
    let heading = document.getElementById(id);
    let body = document.body;
    body.scrollTop =
      heading.offsetTop -
      document.getElementsByClassName("menu")[0].offsetHeight;
  };
  return (
    <div className="navigation">
      <div className="navigation__content">
        <button
          onClick={() => handle("left")}
          className="navigation__button navigation__left-button"
        >
          <LeftButton />
        </button>
        <div ref={headingsRef} className="navigation__headings">
          {headings &&
            headings.childrenHeadings.map((heading, index) => {
              return (
                <button key={index} onClick={() => handle2(heading.id)}>
                  {heading.text}
                </button>
              );
            })}
        </div>
        <button
          onClick={() => handle("right")}
          className="navigation__button navigation__right-button"
        >
          <RightButton />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
