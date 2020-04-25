import React, { Fragment } from "react";
import { Element } from "./../Elements";
import Skeleton from "react-loading-skeleton";

const Content = ({ content, images }) => {
  return (
    <Fragment>
      {content ? (
        content.map((element, index) => (
          <Element key={index} props={element} images={images} />
        ))
      ) : (
        <Skeleton count={30} duration={1} />
      )}
    </Fragment>
  );
};

export default Content;
