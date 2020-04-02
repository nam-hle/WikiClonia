import CheckIcon from "@material-ui/icons/Check";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Menu, { styled } from "./../Menu/index.jsx";

const CustomMenuItem = ({ name, choose, onClick }) => {
  const classes = styled({ choose });
  return (
    <MenuItem className={classes["menu__item"]} onClick={() => onClick(name)}>
      <div>{choose && <CheckIcon fontSize="small" />}</div>
      <div className={classes["item__text"]}>{name}</div>
    </MenuItem>
  );
};

export const SortMenu = ({ attr, onClick }) => {
  const classes = styled();
  const Name = [
    "Newest",
    "Oldest",
    "Most commented",
    "Least commented",
    "Recently updated",
    "Least recently updated"
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = attr => {
    onClick(attr);
    setAnchorEl(null);
  };

  return (
    <div>
      <button onClick={handleClick}>Sorted</button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        transitionDuration={0}
      >
        <div className={classes["menu__header"]}>Filter by label</div>
        {Name.map((name, index) => (
          <CustomMenuItem
            key={index}
            onClick={handleClose}
            name={name}
            choose={name == attr}
          ></CustomMenuItem>
        ))}
      </Menu>
    </div>
  );
};
