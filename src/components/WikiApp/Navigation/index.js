import React, { useRef } from "react";
import LeftButton from "./../../../asset/images/left.svg";
import RightButton from "./../../../asset/images/right.svg";

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
  return (
    <div className="navigation">
      <div className="navigation__content">
        <button
          onClick={() => handle("left")}
          className="navigation__button navigation__left-button"
        >
          {/*<img className="navigation__btn-img" src={LeftButton} />*/}
          {/*<SVG src="./../../../asset/images/left.svg" />*/}
          <LeftButton />
        </button>
        <div ref={headingsRef} className="navigation__headings">
          {headings &&
            headings.childrenHeadings.map((heading, index) => {
              return (
                <a key={index} href={"#" + heading.id}>
                  {heading.text}
                </a>
              );
            })}
        </div>
        <button
          onClick={() => handle("right")}
          className="navigation__button navigation__right-button"
        >
          {/*<img className="navigation__btn-img" src={RightButton} />*/}
          {/*<SVG src="./../../../asset/images/right.svg" />*/}
          <RightButton />
        </button>
      </div>
    </div>
  );
};

export default Navigation;

// headings.childrenHeadings.map((heading, index) => {
//   return (
//     <a key={index} href={"#" + heading.id}>
//       {heading.text}
//     </a>
//   );
// })
