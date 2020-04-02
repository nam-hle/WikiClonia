import CheckIcon from "@material-ui/icons/Check";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState, useEffect } from "react";
import Menu, { styled } from "./../Menu/index.jsx";

const CustomMenuItem = ({ name, color, choose, onClick }) => {
  const classes = styled({ color, choose });
  return (
    <MenuItem className={classes["menu__item"]} onClick={() => onClick(name)}>
      <div>{choose && <CheckIcon fontSize="small" />}</div>
      <div className={classes["item__text"]}>
        <div className={classes["item__color-box"]} />
        {name}
      </div>
    </MenuItem>
  );
};

export const LabelMenu = ({ onClick, attr }) => {
  const classes = styled();
  const [labels, setLabels] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const authorization = new Headers({
    Authorization: "token 7f55ccbdd686af502c38f572ede46065fe038087"
  });

  useEffect(() => {
    fetch("https://api.github.com/repos/facebook/create-react-app/labels", {
      headers: authorization
    })
      .then(response => response.json())
      .then(data => setLabels(data))
      .catch(error => console.error(error));
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = attr => {
    onClick(attr);
    setAnchorEl(null);
  };

  return (
    <div>
      <button onClick={handleClick}>Label</button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        transitionDuration={0}
      >
        <div className={classes["menu__header"]}>Filter by label</div>
        {labels.map((label, index) => (
          <CustomMenuItem
            key={index}
            onClick={handleClose}
            {...{
              name: label.name,
              color: label.color,
              choose: label.name == attr
            }}
          />
        ))}
      </Menu>
    </div>
  );
};
