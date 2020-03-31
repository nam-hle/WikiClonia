import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Label from "./../Label/index.jsx";
import IssueTooltip from "./../IssueTooltip/index.jsx";

dayjs.extend(relativeTime);

console.log(2);
/* eslint babel/camelcase: "off" */
const Issue = ({ number, title, labels, created_at, user, body }) => {
  return (
    <div className="issue">
      <div className="icon">
        <svg
          className="octicon octicon-issue-opened open"
          viewBox="0 0 14 16"
          version="1.1"
          width="14"
          height="16"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            style={{ fill: "#28A745" }}
            d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
          ></path>
        </svg>
      </div>

      <div className="header" style={{ display: "inline" }}>
        <IssueTooltip {...{ created_at, number, body, labels, title }} />
        {labels.map((label, index) => (
          <Label key={index} name={label.name} color={label.color} />
        ))}
      </div>
      <div className="info">
        {`#${number}`} opened{" "}
        {dayjs()
          .from(dayjs(created_at))
          .replace(" in", "")}{" "}
        ago by {user.login}
      </div>
    </div>
  );
};

export default Issue;
