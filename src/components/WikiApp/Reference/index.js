import React, { Fragment } from "react";
import { Element } from "./../Elements";

const Reference = ({ references }) => {
  return (
    <Fragment>
      {references.map((reference, index) => (
        <li className="wiki-ref" key={index}>
          <span>{reference.referenceIndex + ". "}</span>
          {reference.children.map((child, childIndex) => (
            <Element key={childIndex} props={child} />
          ))}
        </li>
      ))}
    </Fragment>
  );
};

export default Reference;
