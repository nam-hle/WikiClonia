import React, { Fragment, useEffect, useState } from "react";
import { Menu, MenuItem, MenuHeader } from "./../Menu";
import { makeStyles } from "@material-ui/core";

const style = makeStyles({
  content: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  "color-box": {
    display: "inline-block",
    height: 15,
    width: 15,
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: props => props.color
  }
});

const LabelMenuItem = MenuItem(({ id, color }) => {
  const classes = style({ color });
  return (
    <div className={classes.content}>
      <div className={classes["color-box"]} />
      {id}
    </div>
  );
});

export const MenuContent = ({ chooseItem, handleClose }) => {
  const [labels, setLabels] = useState([]);
  const authorization = new Headers({
    Authorization: "token 60a779656bb643ecf69c55e3ea0872cb1e7934b4"
  });

  useEffect(() => {
    fetch("https://api.github.com/repos/facebook/create-react-app/labels", {
      headers: authorization
    })
      .then(response => response.json())
      .then(labels => setLabels(labels))
      .catch(error => console.error(error));
  }, []);

  return (
    <Fragment>
      <MenuHeader text="Filter by label" />
      {labels.map((label, index) => (
        <LabelMenuItem
          key={index}
          id={label.name}
          color={"#" + label.color}
          choose={label.name == chooseItem}
          onClick={handleClose}
        />
      ))}
    </Fragment>
  );
};

export const LabelMenu = Menu("Labels", MenuContent);
