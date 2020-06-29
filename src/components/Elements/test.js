import { main } from "./../../wiki_parser";
import { new_york } from "./../../wiki_parser/test_input";
import renderer from "react-test-renderer";
import { Element } from "./";
import React from "react";
import { BrowserRouter } from "react-router-dom";

test(`Should work with new york article`, () => {
  let elements = main(new_york).children;
  for (const element of elements) {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Element props={element} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  }
});
