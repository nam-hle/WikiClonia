import React, { Fragment } from "react";

const Sidebar = ({ headings }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__title">TABLE OF CONTENT</div>
      {headings &&
        Object.keys(headings).map((h1, i) => {
          let h2s = headings[h1];
          return (
            <Fragment key={i}>
              <div className="sidebar__item" key={h1}>
                <div className="sidebar__h1">{`${i + 1}. ` + h1}</div>
                <div className="sidebar__h2s">
                  {h2s.map((h2, j) => (
                    <div className="sidebar__h2" key={h2}>
                      {`${i + 1}.${j + 1}. ` + h2}
                    </div>
                  ))}
                </div>
              </div>
            </Fragment>
          );
        })}
    </div>
  );
};

export default Sidebar;
