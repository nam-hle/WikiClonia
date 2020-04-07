import { makeStyles } from "@material-ui/core";
import React from "react";
import tinycolor from "tinycolor2";

// const getContrast = function(hexcolor) {
//   if (hexcolor.slice(0, 1) === "#") {
//     hexcolor = hexcolor.slice(1);
//   }

//   if (hexcolor.length === 3) {
//     hexcolor = hexcolor.split``.map(hex => hex + hex).join``;
//   }

//   let r = parseInt(hexcolor.substr(0, 2), 16),
//     g = parseInt(hexcolor.substr(2, 2), 16),
//     b = parseInt(hexcolor.substr(4, 2), 16),
//     yiq = (r * 299 + g * 587 + b * 114) / 1000;

//   return yiq >= 128 ? "black" : "white";
// };

const style = makeStyles({
  root: {
    display: "inline-block",
    fontSize: 12,
    padding: "0 8px",
    margin: "0 4px",
    borderRadius: 4,
    backgroundColor: props => "#" + props.color,
    // backgroundColor: "#F0F0F3",
    // color: props => getContrast(props.color),
    color: props =>
      tinycolor("#" + props.color).getLuminance() > 0.5 ? "black" : "white",
    cursor: "pointer",
    boxShadow: props =>
      `1px -1px 2px ${tinycolor(props.color).darken(
        20
      )}, -1px 1px 2px ${tinycolor(props.color).brighten(20)}`,
    "&:hover": {
      boxShadow: props =>
        `inset 1px -1px 2px ${tinycolor(props.color).darken(
          20
        )}, inset -1px 1px 2px ${tinycolor(props.color).brighten(20)}`
    }
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
