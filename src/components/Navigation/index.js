import React, { useRef } from "react";
import LeftButton from "./../../asset/images/left.svg";
import RightButton from "./../../asset/images/right.svg";
import "./style.sass";

const Navigation = ({ headings }) => {
  const headingsRef = useRef(null);

  const handle = direction => {
    let width = headingsRef.current.scrollWidth;
    let pos = headingsRef.current.scrollLeft;
    let visibleWidth = headingsRef.current.clientWidth;
    let maxPos = width - visibleWidth;
    let slideWidth = maxPos * 0.15;

    headingsRef.current.scrollLeft =
      direction == "right"
        ? Math.min(maxPos, pos + slideWidth)
        : Math.max(0, pos - slideWidth);
  };

  const handle2 = id => {
    let heading = document.getElementById(id);
    let button = document.getElementById(id + "__btn");
    let navigation = document.getElementsByClassName("navigation__headings")[0];
    let [buttonWidth, buttonPosition] = [button.offsetWidth, button.offsetLeft];

    let [navigationClientWidth, navigationScrollLeft] = [
      navigation.clientWidth,
      navigation.scrollLeft
    ];

    let buttonMin = buttonPosition,
      buttonMax = buttonPosition + buttonWidth;
    let windowMin = navigationScrollLeft,
      windowMax = navigationScrollLeft + navigationClientWidth;

    if (buttonMin > windowMax || buttonMax < windowMin) {
      console.log("out of bound");
    } else if (buttonMin >= windowMin && buttonMax <= windowMax) {
      console.log("entire");
    } else {
      let delta = buttonWidth * 0.5;
      if (buttonMin < windowMin) {
        delta += windowMin - buttonMin;
        navigation.scrollLeft -= delta;
      } else {
        delta += buttonMax - windowMax;
        navigation.scrollLeft += delta;
      }
    }

    document.body.scrollTop = heading.offsetTop;
  };
  return (
    <div className="navigation-wrapper">
      <div className="navigation">
        <div className="navigation__content">
          <button
            onClick={() => handle("left")}
            className="navigation__button navigation__left-button"
          >
            <LeftButton />
          </button>
          <div ref={headingsRef} className="navigation__headings">
            {headings?.childrenHeadings.map((heading, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handle2(heading.id)}
                  id={heading.id + "__btn"}
                >
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
    </div>
  );
};

export default Navigation;
