import React, { Fragment } from "react";
import { Element } from "./../Elements";

const Content = ({ content, images }) => {
  if (!content) return "Loading...";

  return (
    <Fragment>
      {content.map((element, index) => (
        <Element key={index} props={element} images={images} />
      ))}
    </Fragment>
  );
};

export default Content;
