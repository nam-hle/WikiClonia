import React from "react";
import Label from "./../Label";

import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import relativeTime from "dayjs/plugin/relativeTime";

import dayjs from "dayjs";
dayjs.extend(relativeTime);

const CustomTooltip = withStyles(() => ({
  tooltip: {
    maxWidth: 500,
    padding: 16,
    backgroundColor: "white",
    boxShadow: "0px 0px 10px -2px rgba(0,0,0,0.75)"
  }
}))(Tooltip);

/* eslint babel/camelcase: "off" */
const IssueTooltip = ({ created_at, number, body, labels, title }) => {
  return (
    <CustomTooltip
      arrow
      title={
        <div className="issue__tooltip">
          <span className="issue__tooltip-header">
            {"facebook/create-react-app on " +
              dayjs(created_at).format("MMM DD")}
          </span>
          <br />
          <span className="issue__tooltip-title">{title}</span>
          <span className="issue__tooltip-number">{" #" + number}</span>
          <br />
          <br />
          <span className="issue__tooltip-body">
            {body &&
              body
                .split(" ")
                .map((s, i) => (i > 20 ? "" : s))
                .join(" ") + "..."}
          </span>
          <br />
          {labels.map((label, index) => (
            <Label key={index} name={label.name} color={label.color} />
          ))}
          <br />
          <br />
        </div>
      }
    >
      <a href="#" className="issue__title">
        {title}
      </a>
    </CustomTooltip>
  );
};

export default IssueTooltip;
