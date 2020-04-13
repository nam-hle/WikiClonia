import React, { Fragment } from "react";
import { Element } from "./../Elements";

const find = (array, predicate) => {
  let index = 0,
    length = array.length;
  for (; index < length; index++) {
    if (predicate(array[index])) return index;
  }
  return length;
};

const predicate = element =>
  element.elementName == "Heading1" &&
  element.children[0].text == " References ";

const Content = ({ content, images }) => {
  if (!content) return "Loading...";

  return (
    <Fragment>
      {content.slice(0, find(content, predicate)).map((element, index) => (
        <Element key={index} props={element} images={images} />
      ))}
    </Fragment>
  );
};

export default Content;
