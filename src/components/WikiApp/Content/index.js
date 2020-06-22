import React from "react";
import { Element } from "./../Elements";
import { v4 as uuidv4 } from "uuid";
import { GridLoader as Loader } from "react-spinners";
import { css } from "@emotion/core";
const override = css`
  margin: 20vh auto;
`;
const Content = ({ content, loading }) => {
  console.log(loading);
  return (
    <div className="wiki-content">
      {!loading && content ? (
        content.map(element => {
          return <Element key={uuidv4()} props={element} />;
        })
      ) : (
        <Loader
          css={override}
          color={getComputedStyle(document.documentElement).getPropertyValue(
            "--text-color"
          )}
        />
      )}
    </div>
  );
};

export default Content;
