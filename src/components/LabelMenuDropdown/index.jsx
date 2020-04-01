import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  "menu-item": {
    display: "grid",
    "grid-template-columns": "30px auto",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: props => (props.choose ? 600 : "inherit")
  },
  "menu-item__text": {
    height: 16,
    width: 16,
    borderRadius: 2,
    display: "inline-block",
    marginRight: 16,
    backgroundColor: props => props.color
  }
});

const SubMenu = ({ name, color, choose }) => {
  const classes = useStyles({ color, choose });
  return (
    <div className={classes["menu-item"]}>
      <div>{choose && <CheckIcon fontSize="small" />}</div>
      <div>
        <div className={classes["menu-item__text"]} />
        {name}
      </div>
    </div>
  );
};

const CustomMenuItem = withStyles(() => ({
  root: {
    padding: 8,
    paddingLeft: 0,
    borderTop: "1px solid #E3E5E8",
    "&:hover": {
      backgroundColor: "#F6F8FA"
    }
  }
}))(MenuItem);

const CustomMenu = withStyles(() => ({
  paper: {
    margin: 0,
    padding: 0,
    minWidth: 300
  },
  list: {
    padding: 0,
    border: "1px solid #D1D5DA"
  }
}))(Menu);

export const LabelMenu = () => {
  const [labels, setLabels] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const authorization = new Headers({
    Authorization: "token 56b5fed798d2886c76230ce995418db3eb07b19d"
  });

  useEffect(() => {
    fetch("https://api.github.com/repos/facebook/create-react-app/labels", {
      headers: authorization
    })
      .then(response => response.json())
      .then(_labels => setLabels(_labels))
      .catch(error => console.error(error));
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // onClick(attr);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="label-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Labels
      </Button>
      <CustomMenu
        id="label-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <div className="submenu-header">Filter by label</div>
        {labels.map((label, index) => (
          <CustomMenuItem key={index} onClick={() => handleClose(label.name)}>
            <SubMenu name={label.name} color={label.color} />
          </CustomMenuItem>
        ))}
      </CustomMenu>
    </div>
  );
};
