import React, { useState, useEffect } from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import Issue from "./../Issue/index.jsx";
import parse from "parse-link-header";
import { SortMenu } from "./../SortMenu/index.jsx";
import { LabelMenu } from "./../LabelMenu/index.jsx";

const range = (_from, _to) =>
  [...Array(_to - _from + 1)].map((_, i) => i + _from);

const BASE_URL =
  "https://api.github.com/repos/facebook/create-react-app/issues?state=all&per_page=15";

const PaginationButtonGroup = ({ currentPage, maxPage, onClick }) => {
  const calculate = (curPage, minPage = 1, maxPage = 20) => {
    if (maxPage - minPage <= 8) return [...range(minPage, maxPage)];

    let closeToLeft = curPage - 2 - (minPage + 1) <= 2,
      closeToRight = maxPage - 1 - (curPage + 2) <= 2;

    if (closeToLeft) {
      return closeToRight
        ? [range(minPage, maxPage)]
        : [...range(minPage, curPage + 2), 0, ...range(maxPage - 1, maxPage)];
    }

    if (closeToRight)
      return [
        ...range(minPage, minPage + 1),
        0,
        ...range(curPage - 2, maxPage)
      ];

    return [
      ...range(minPage, minPage + 1),
      0,
      ...range(curPage - 2, curPage + 2),
      0,
      ...range(maxPage - 1, maxPage)
    ];
  };

  return (
    <ButtonGroup
      style={{ alignSelf: "center", marginTop: 20 }}
      color="primary"
      aria-label="outlined primary button group"
    >
      <Button
        variant="outlined"
        color="primary"
        disabled={currentPage == 1}
        onClick={() => onClick("prev")}
      >
        Previous
      </Button>

      {calculate(currentPage, 1, maxPage).map((page, index) => (
        <Button
          key={index}
          variant={currentPage == page ? "contained" : "outlined"}
          color="primary"
          onClick={() => onClick(page)}
          disabled={page == 0}
        >
          {page ? page : "..."}
        </Button>
      ))}

      <Button
        variant="outlined"
        color="primary"
        disabled={currentPage == maxPage}
        onClick={() => onClick("next")}
      >
        Next
      </Button>
    </ButtonGroup>
  );
};

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(20);
  const [attrSort, setAttrSort] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    let sort = "",
      direction = "";
    if (attrSort != "") {
      sort = attrSort.includes("updated")
        ? "updated"
        : attrSort.includes("commented")
        ? "comments"
        : "created";
      direction =
        attrSort.includes("Least") || attrSort.includes("Oldest")
          ? "asc"
          : "desc";
    }
    fetch(
      BASE_URL +
        `&page=${currentPage}` +
        (attrSort == "" ? "&q=" : `&sort=${sort}&direction=${direction}`) +
        (label == "" ? "" : `&labels=${label}`),
      {
        headers: new Headers({
          Authorization: "token 7f55ccbdd686af502c38f572ede46065fe038087"
        })
      }
    )
      .then(response => {
        let links = parse(response.headers.get("Link"));
        if (links.last && maxPage != +links.last.page)
          setMaxPage(+links.last.page);
        return response.json();
      })
      .then(_data => setData(_data))
      .catch(error => console.error(error));
  }, [currentPage, attrSort, label]);

  const handlePaginationButtonClick = page => {
    if (page == "prev") {
      setCurrentPage(currentPage - 1);
    } else if (page == "next") {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(+page);
    }
  };

  const handleSortButtonClick = attr =>
    setAttrSort(attrSort == attr ? "" : attr);

  const handleLabelButtonClick = newLabel =>
    setLabel(newLabel === label ? "" : newLabel);

  return (
    <div className="app">
      <div className="main ">
        <div className="filters">
          <button>Author</button>
          <LabelMenu attr={label} onClick={handleLabelButtonClick} />
          <button>Projects</button>
          <button>Milestones</button>
          <button>Assignee</button>
          <SortMenu attr={attrSort} onClick={handleSortButtonClick} />
        </div>
        {data.length && data.map(issue => <Issue key={issue.id} {...issue} />)}
      </div>
      <PaginationButtonGroup
        style={{ "margin-top": "20px" }}
        maxPage={maxPage}
        currentPage={currentPage}
        onClick={page => handlePaginationButtonClick(page)}
      />
    </div>
  );
};

export default App;
