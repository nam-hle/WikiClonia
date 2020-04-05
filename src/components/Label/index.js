import { makeStyles } from "@material-ui/core";
import React from "react";

const getContrast = function(hexcolor) {
  if (hexcolor.slice(0, 1) === "#") {
    hexcolor = hexcolor.slice(1);
  }

  if (hexcolor.length === 3) {
    hexcolor = hexcolor.split``.map(hex => hex + hex).join``;
  }

  let r = parseInt(hexcolor.substr(0, 2), 16),
    g = parseInt(hexcolor.substr(2, 2), 16),
    b = parseInt(hexcolor.substr(4, 2), 16),
    yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? "black" : "white";
};

const style = makeStyles({
  root: {
    display: "inline-block",
    fontSize: 12,
    padding: "0 8px",
    margin: "0 4px",
    backgroundColor: props => "#" + props.color,
    color: props => getContrast(props.color),
    cursor: "pointer"
  }
});

const Label = ({ name, color, onClick }) => {
  const classes = style({ color });
  return (
    <span className={classes.root} onClick={() => onClick(name)}>
      {` ${name} `}
    </span>
  );
};

export default Label;
