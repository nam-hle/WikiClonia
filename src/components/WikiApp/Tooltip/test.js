import React from "react";
import Tooltip from "./";
import renderer from "react-test-renderer";

const titles = [
  "Pet_door",
  "New_York_City",
  "The_Last_Supper_(Leonardo)",
  "Leonardo_da_Vinci",
  "Mona_Lisa",
  "Renaissance"
];

for (const title of titles) {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Tooltip url={title}>
          <a href="#">Test</a>
        </Tooltip>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
}
