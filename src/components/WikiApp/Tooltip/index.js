import React, { useState } from "react";
import { buildURL, summaryParams } from "./../../../WikiWrapper";
// import Skeleton from "react-loading-skeleton";
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/core";

import "./style.sass";

const extractSummary = (json, maxchar = 300) => {
  let content = json.query?.pages,
    extract = null,
    title = json.query?.normalized?.[0]?.to;
  for (const key in content) extract = content[key]?.extract;
  extract = extract.substr(0, maxchar) + "...";
  return { extract, title };
};

const override = css`
  margin: 0 auto;
  display: flex;
  justifycontent: center;
  alignitems: center;
`;

const Tooltip = props => {
  const { url, children } = props;
  const [show, setShow] = useState(false);
  const [summary, setSummary] = useState(null);
  const [title, setTitle] = useState(null);
  const handleMouseIn = () => setShow(true);
  const handleMouseOut = () => setShow(false);

  React.useEffect(() => {
    if (show && !summary) {
      fetch(buildURL(summaryParams(url)))
        .then(response => response.json())
        .then(json => {
          let { extract, title } = extractSummary(json);
          setSummary(extract);
          setTitle(title || url);
        })
        .catch(error => console.error(error));
    }
  }, [show]);

  return (
    <span
      className="tooltip"
      onMouseOver={handleMouseIn}
      onMouseLeave={handleMouseOut}
    >
      {show && (
        <div className="tooltip-content top">
          {title ? (
            <h3
              style={{ marginTop: 0, marginBottom: "5rem" }}
              className="tooltip-title"
            >
              {title}
            </h3>
          ) : (
            <PulseLoader
              css={override}
              color={getComputedStyle(
                document.documentElement
              ).getPropertyValue("--text-color")}
            />
          )}
          {summary}
        </div>
      )}

      {React.Children.toArray(children)}
    </span>
  );
};

export default Tooltip;
