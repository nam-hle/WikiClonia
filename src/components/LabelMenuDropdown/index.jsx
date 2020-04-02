// import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Octicon, { getIconByName } from "@primer/octicons-react";

const useStyles = makeStyles({
  menu__item: {
    display: "grid",
    "grid-template-columns": "30px 1fr",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 8,
    borderTop: "1px solid #E3E5E8",
    fontSize: "inherit",
    "&:hover": {
      backgroundColor: "#F6F8FA"
    }
  },
  item__text: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontWeight: "semi-bold"
  },
  "menu__color-box": {
    display: "inline-block",
    height: 16,
    width: 16,
    marginRight: 8,
    borderRadius: 2,
    backgroundColor: props => props.color
  },
  menu__header: {
    backgroundColor: "#F6F8FA",
    padding: 8,
    paddingLeft: 16,
    fontWeight: 700,
    color: "#24292E"
  }
});

const StyledMenu = withStyles(() => ({
  paper: {
    margin: 0,
    padding: 0,
    minWidth: 300,
    maxHeight: 500,
    fontSize: 12
  },
  list: {
    padding: 0,
    border: "1px solid #D1D5DA"
  }
}))(Menu);

const CustomMenuItem = ({ name, color, choose, onClick }) => {
  const classes = useStyles({ color, choose });
  return (
    <MenuItem className={classes["menu__item"]} onClick={() => onClick(name)}>
      <div>{choose && <CheckIcon fontSize="small" />}</div>
      <div className={classes["item__text"]}>
        <div className={classes["menu__color-box"]} />
        {name}
      </div>
    </MenuItem>
  );
};

export const LabelMenu = ({ onClick, attr }) => {
  const classes = useStyles();
  const [labels, setLabels] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const authorization = new Headers({
    Authorization: "token 4db2956775d596ffedacb7b7a79e84a96f0bf188"
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
      <button onClick={handleClick}>
        Label <Octicon size="small" icon={getIconByName("triangle-down")} />
      </button>
      <StyledMenu
        className={classes["MuiMenu-list"]}
        id="label-menu"
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
      </StyledMenu>
    </div>
  );
};
