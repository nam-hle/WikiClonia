import React from "react";
import Article from "./";
import renderer from "react-test-renderer";

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });

const titles = [
  "Pet_door",
  "New_York_City",
  "The_Last_Supper_(Leonardo)",
  "Leonardo_da_Vinci",
  "Mona_Lisa",
  "Renaissance"
];

for (const title of titles) {
  it("renders correctly with " + title, () => {
    const tree = renderer.create(<Article title={title} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
}
