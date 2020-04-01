import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
// import ListSubheader from "@material-ui/core/ListSubheader";

const SubMenu = ({ name, choose }) => {
  const CheckPlaceholder = ({ choose }) => {
    return (
      <div className="submenu__checkbox">
        {choose && <CheckIcon fontSize="small" />}
      </div>
    );
  };

  return (
    <div className="submenu">
      <CheckPlaceholder {...{ choose }} />
      <div
        className="submenu__title"
        style={{ fontWeight: choose ? 600 : "inherit" }}
      >
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

const SimpleMenu = ({ attr, onClick }) => {
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
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Sorted
      </Button>
      <CustomMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <div className="submenu-header">Sort by</div>
        {Name.map((name, index) => (
          <CustomMenuItem key={index} onClick={() => handleClose(name)}>
            <SubMenu {...{ name, choose: name == attr }} />
          </CustomMenuItem>
        ))}
        <div className="submenu-header">Most reactions</div>
      </CustomMenu>
    </div>
  );
};

export default SimpleMenu;
