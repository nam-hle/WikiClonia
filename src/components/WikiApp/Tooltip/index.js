import React, { useState } from "react";
import { buildURL, summaryParams } from "./../../../WikiWrapper";
import { BarLoader as Loader } from "react-spinners";
import axios from "axios";
import { css } from "@emotion/core";

import "./style.sass";

const extractSummary = (json, maxchar = 300) => {
  let content = json?.query?.pages,
    extract = null,
    title = json?.query?.normalized?.[0]?.to;
  for (const key in content) extract = content[key]?.extract;
  extract = extract?.substr(0, maxchar) + "...";
  return { extract, title };
};

const override = css`
  width: 50%;
  margin: 0 auto;
  height: 10vh;
  maxheight: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const Tooltip = props => {
  const ref = React.useRef(null);
  const { url, children } = props;
  const [summary, setSummary] = useState(null);
  const [title, setTitle] = useState(null);
  const handleMouseIn = () => {
    setShow(true);
  };
  const handleMouseOut = () => setShow(false);
  let [show, setShow] = useState(false);

  React.useEffect(() => {
    let source = axios.CancelToken.source();
    if (show && !summary) {
      axios
        .get(buildURL(summaryParams(url)), { cancelToken: source.token })
        .then(response => response.data)
        .then(json => {
          let { extract, title } = extractSummary(json);
          setSummary(extract);
          setTitle(title || url);
        })
        .catch(() => {});
    }
    return () => source.cancel("");
  }, [show]);

  return (
    <span
      className="tooltip"
      onMouseOver={handleMouseIn}
      onMouseLeave={handleMouseOut}
    >
      {show && (
        <div ref={ref} className="tooltip-content top">
          {title ? (
            <h3
              style={{ marginTop: 0, marginBottom: "5rem" }}
              className="tooltip-title"
            >
              {title}
            </h3>
          ) : (
            <Loader
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
