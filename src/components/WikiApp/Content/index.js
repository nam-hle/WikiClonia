import React from "react";
import { Element } from "./../Elements";

const Content = ({ content }) => {
  return (
    <div className="wiki-content">
      {content
        ? content.map((element, index) => (
            <Element key={index} props={element} />
          ))
        : "Loading..."}
    </div>
  );
};

export default Content;
