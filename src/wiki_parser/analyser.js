const extractHeadingText = heading => {
  let text = "";
  for (const child of heading.children) {
    if ("Text" === child.elementName) text += child.text;
  }
  return text;
};

const analyseHeadings = headings => {
  if (!headings.length) return null;
  let getLevel = heading => +/^Heading(\d)$/.exec(heading.elementName)[1];
  let currentLevel = 0,
    res = {},
    currentHeading = res;

  res.indices = [];

  for (const heading of headings) {
    console.log(heading);
    let level = getLevel(heading),
      headingText = extractHeadingText(heading).trim(),
      headingId = headingText.replace(/\s/, "") + "_" + level;

    // add metadata
    heading.level = level;
    heading.text = headingText;
    heading.id = headingId;
    heading.className = "wiki-heading-" + level;
    heading.indices = currentHeading.indices.slice();

    // connect heading to heading tree
    if (level > currentLevel) {
      heading.indices.push(1);

      if (!currentHeading.childrenHeadings)
        currentHeading.childrenHeadings = [];
      heading.parentHeading = currentHeading;
      currentHeading.childrenHeadings.push(heading);
    } else if (level == currentLevel) {
      heading.indices[heading.indices.length - 1]++;

      let parent = currentHeading.parentHeading;
      parent.childrenHeadings.push(heading);
      heading.parentHeading = parent;
    } else {
      heading.indices = heading.indices.slice(0, level);
      heading.indices[heading.indices.length - 1]++;

      let grandParent = currentHeading.parentHeading.parentHeading;
      grandParent.childrenHeadings.push(heading);
      heading.parentHeading = grandParent;
    }
    currentHeading = heading;
    currentLevel = level;
  }
  return res;
};

export { analyseHeadings };
