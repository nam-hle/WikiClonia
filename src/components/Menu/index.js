import CheckIcon from "@material-ui/icons/Check";
import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Theme } from "./../../asset/theme.js";

export const customStyle = makeStyles({
  menu: {
    position: "relative",
    fontSize: 12
  },
  menu__content: {
    position: "absolute",
    right: 0,
    zIndex: 1,
    width: 300,
    maxHeight: 500,
    overflow: "auto",
    backgroundColor: "white",
    boxShadow:
      "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)"
  },
  menu__header: {
    display: "flex",
    alignItems: "center",
    padding: 8,
    paddingLeft: 20,
    fontWeight: "bold",
    backgroundColor: Theme.headerBackgroundColor,
    cursor: "default"
  },
  menu__item: {
    display: "grid",
    gridTemplateColumns: "30px 1fr",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 8,
    borderTop: `1px solid ${Theme.borderColor}`,
    color: Theme.textColor,
    backgroundColor: Theme.backgroundColor,
    "&:hover": {
      backgroundColor: Theme.headerBackgroundColor
    }
  },
  item__text: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "-apple-system, Helvetica Neue, sans-serif",
    fontWeight: props => (props.choose ? 600 : "inherit")
  },
  hidden: {
    display: "none"
  }
});

export const MenuHeader = ({ text }) => {
  const classes = customStyle();
  return <div className={classes["menu__header"]}>{text}</div>;
};

export const MenuItem = Content => props => {
  const { id, choose, onClick } = props;
  const classes = customStyle({ choose });
  return (
    <a href="#" className={classes["menu__item"]} onClick={() => onClick(id)}>
      <div>{choose && <CheckIcon fontSize="small" />}</div>
      <Content className={classes["item__text"]} {...props} id={id} />
    </a>
  );
};

export const Menu = (title, Content) => ({ onClick, chooseItem }) => {
  const classes = customStyle();
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [contentRef]);

  const handleClick = () => setOpen(!open);

  const handleClose = chooseItem => {
    onClick(chooseItem);
    setOpen(false);
  };

  return (
    <div className={`${classes["menu"]}`}>
      <div>
        <button ref={buttonRef} onClick={handleClick}>
          {title}
        </button>
      </div>
      <div
        ref={contentRef}
        className={`${classes["menu__content"]} ${
          open ? "" : classes["hidden"]
        }`}
      >
        <Content {...{ chooseItem, handleClose }} />
      </div>
    </div>
  );
};
