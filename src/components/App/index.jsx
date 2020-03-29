import React, { useState, useEffect } from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import Issue from "./../Issue/index.jsx";
import parse from "parse-link-header";

const authorization = new Headers({
  Authorization: "token bd171785f57e7294e2c9df7725f4aa047c244a5a"
});

const range = (_from, _to) =>
  [...Array(_to - _from + 1)].map((_, i) => i + _from);

const BASE_URL =
  "https://api.github.com/repos/facebook/create-react-app/issues?per_page=25&state=all";

const PaginationButtonGroup = ({ currentPage, maxPage, onClick }) => {
  const calculate = (curPage, minPage = 1, maxPage = 20) => {
    if (maxPage - minPage <= 8) return [range(minPage, maxPage)];

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
      style={{ alignSelf: "center" }}
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
  const MAX_PAGE = 20;

  useEffect(() => {
    fetch(BASE_URL + `&page=${currentPage}`, { headers: authorization })
      .then(response => {
        console.log(parse(response.headers.get("Link")));
        return response.json();
      })
      .then(_data => setData(_data))
      .catch(error => console.error(error));
  }, [currentPage]);

  const handlePaginationButtonClick = page => {
    if (page == "prev") {
      setCurrentPage(currentPage - 1);
    } else if (page == "next") {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(+page);
    }
  };

  return (
    <div className="app">
      <PaginationButtonGroup
        maxPage={MAX_PAGE}
        currentPage={currentPage}
        onClick={page => handlePaginationButtonClick(page)}
      />
      {data.map(issue => (
        <Issue key={issue.id} {...issue} />
      ))}
    </div>
  );
};

export default App;
