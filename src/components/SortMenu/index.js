import React, { Fragment } from "react";
import { Menu, MenuItem, MenuHeader } from "./../Menu";

const SortMenuItem = MenuItem(({ id }) => <div>{id}</div>);

const SortMenuContent = ({ chooseItem, handleClose }) => {
  const data = [
    "Newest",
    "Oldest",
    "Most commented",
    "Least commented",
    "Recently updated",
    "Least recently updated"
  ];
  return (
    <Fragment>
      <MenuHeader text="Sort by" />
      {data.map((id, index) => (
        <SortMenuItem
          key={index}
          id={id}
          choose={id == chooseItem}
          onClick={handleClose}
        />
      ))}
    </Fragment>
  );
};

const SortedMenu = Menu("Sort", SortMenuContent);

export default SortedMenu;
