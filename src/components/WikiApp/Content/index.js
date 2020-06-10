import React from "react";
import { Element } from "./../Elements";
import { v4 as uuidv4 } from "uuid";
const Content = ({ content }) => {
  return (
    <div className="wiki-content">
      {content
        ? content.map(element => {
            return <Element key={uuidv4()} props={element} />;
          })
        : "Loading..."}
    </div>
  );
};

export default Content;
