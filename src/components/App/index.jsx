import React, { useState, useEffect } from "react";
import parse from "parse-link-header";
import { ButtonGroup, Button } from "@material-ui/core";

import whyDidYouRender from "@welldone-software/why-did-you-render";

whyDidYouRender(React, {
  trackAllPureComponents: true
});

const authorization = new Headers({
  Authorization: "token bd171785f57e7294e2c9df7725f4aa047c244a5a"
});

const Issue = ({ id, title, labels, since, user }) => {
  const Label = ({ name, color }) => {
    return (
      <span className="label" style={{ backgroundColor: `#${color}` }}>
        {" " + name + " "}
      </span>
    );
  };
  return (
    <div className="issue">
      <div className="icon">
        <svg
          className="octicon octicon-issue-opened open"
          viewBox="0 0 14 16"
          version="1.1"
          width="14"
          height="16"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            style={{ fill: "#28A745" }}
            d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
          ></path>
        </svg>
      </div>
      <div className="header">
        <span className="title">{title}</span>
        {labels.map((label, index) => (
          <Label key={index} name={label.name} color={label.color} />
        ))}
      </div>
      <div className="info">
        &#9839;{id} opened {since} ago by {user.login}
      </div>
    </div>
  );
};

const range = (_from, _to) =>
  [...Array(_to - _from + 1)].map((_, i) => i + _from);

const BASE_URL =
  "https://api.github.com/repos/facebook/create-react-app/issues";

const PaginationButtonGroup = ({ links, onClick }) => {
  const getCurrentPage = links =>
    +(links.prev
      ? +links.prev.page + 1
      : links.next
      ? +links.next.page - 1
      : 1);

  const calculatedPage = links => {
    let firstPage = 1,
      lastPage = 20;
    let currentPage = +(links.prev
      ? +links.prev.page + 1
      : links.next
      ? +links.next.page - 1
      : 1);
    let minPage = Math.max(firstPage, currentPage - 2),
      maxPage = Math.min(lastPage, currentPage + 2);
    return minPage > maxPage ? [maxPage, minPage] : [minPage, maxPage];
  };

  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <Button
        variant="outlined"
        color="primary"
        disabled={!links.prev}
        onClick={() => onClick(links.prev ? links.prev.url : null)}
      >
        Previous
      </Button>

      {range(...calculatedPage(links)).map(page => (
        <Button
          key={page}
          variant={getCurrentPage(links) == page ? "contained" : "outlined"}
          color="primary"
          onClick={() => onClick(BASE_URL + `?page=${page}`)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outlined"
        color="primary"
        disabled={!links.next}
        onClick={() => onClick(links.next ? links.next.url : null)}
      >
        Next
      </Button>
    </ButtonGroup>
  );
};

const calculate = (curPage, minPage = 1, maxPage = 20) => {
  if (maxPage - minPage <= 8) return [range(minPage, maxPage)];

  let closeToLeft = curPage - 2 - (minPage + 1) <= 2,
    closeToRight = maxPage - 1 - (curPage + 2) <= 2;

  if (closeToLeft) {
    return closeToRight
      ? [range(minPage, maxPage)]
      : [range(minPage, curPage + 2), range(maxPage - 1, maxPage)];
  }

  if (closeToRight)
    return [range(minPage, minPage + 1), range(curPage - 2, maxPage)];

  return [
    range(minPage, minPage + 1),
    range(curPage - 2, curPage + 2),
    range(maxPage - 1, maxPage)
  ];
};

for (let i = 1; i <= 20; i++) {
  console.log(i, JSON.stringify(calculate(i)));
}

const App = () => {
  const [data, setData] = useState([]);
  const [links, setLinks] = useState({});
  const [url, setUrl] = useState(BASE_URL);

  useEffect(() => {
    fetch(url == BASE_URL ? url + "?page=1" : url, { headers: authorization })
      .then(response => {
        setLinks(parse(response.headers.get("Link")));
        return response.json();
      })
      .then(_data => setData(_data))
      .catch(error => console.error(error));
  }, [url]);

  const handlePaginationButtonClick = url => setUrl(url);
  return (
    <div className="app">
      <PaginationButtonGroup
        links={links}
        onClick={url => handlePaginationButtonClick(url)}
      />
      {data.map(issue => (
        <Issue key={issue.id} {...issue} />
      ))}
    </div>
  );
};

export default App;
