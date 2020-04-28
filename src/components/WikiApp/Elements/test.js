import { main } from "./../../../wiki_parser";
import { new_york } from "./../../../wiki_parser/test_input";
import renderer from "react-test-renderer";
import { Element } from "./";
import React from "react";

test(`Should work with new york article`, () => {
  let elements = main(new_york).children;
  for (const element of elements) {
    const tree = renderer.create(<Element props={element} />).toJSON();
    expect(tree).toMatchSnapshot();
  }
});
