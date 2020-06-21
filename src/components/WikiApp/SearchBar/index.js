import React, { useState } from "react";
import SearchIcon from "./../../../asset/images/search.svg";
import "./style.sass";
import { v4 as uuidv4 } from "uuid";
import { buildURL, searchParams } from "./../../../WikiWrapper";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SearchItem = ({ title, description }) => {
  const history = useHistory();

  return (
    <div
      className="searchbar__item"
      onMouseDown={() => {
        history.push("/" + title);
      }}
    >
      <div className="searchbar__title">{title}</div>
      <Link
        to={"/" + title}
        className="searchbar__overview"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

const SearchResults = ({ results, _ref }) => {
  return (
    <div ref={_ref} className="searchbar__results">
      {results &&
        results.map(item => (
          <SearchItem
            key={uuidv4()}
            title={item.title}
            description={item.description}
          />
        ))}
    </div>
  );
};

const SeachBar = () => {
  let [movies, setMovies] = useState([]);
  let [value, setValue] = useState("");
  let inputRef = React.useRef(null);
  let searchResultsRef = React.useRef(null);

  React.useEffect(() => {
    const reveal = () => {
      searchResultsRef.current.classList.add("show");
    };
    const hidden = () => {
      console.log("hidden");
      searchResultsRef.current.classList.remove("show");
    };
    inputRef.current.addEventListener("focusin", reveal);
    inputRef.current.addEventListener("blur", hidden);

    return () => {
      inputRef.current.removeEventListener("focusin");
      inputRef.current.removeEventListener("blur");
    };
  }, []);

  React.useEffect(() => {
    // const search = async () => {
    //   const response = await fetch(buildURL(searchParams(value)));
    //   const json = await response.json();

    //   if (json) {
    //     let title = json?.query?.search?.map(movie => [movie.title]);
    //     setMovies(title);
    //   }
    // };
    // if (value) {
    //   search();
    // } else setMovies([]);

    const controller = new AbortController();

    if (!value) {
      setMovies([]);
    } else {
      fetch(buildURL(searchParams(value)), { signal: controller.signal })
        .then(response => response.json())
        .then(json => {
          let title = json?.query?.search?.map(movie => ({
            title: movie.title,
            description: movie.snippet
          }));
          setMovies(title);
        });
    }
    return () => controller.abort();
  }, [value]);

  const onChangeHandler = e => setValue(e.target.value);

  return (
    <div className="menu__search">
      <div className="menu__search-icon">
        <SearchIcon />
      </div>
      <div className="menu__searchbar">
        <input
          ref={inputRef}
          onChange={e => onChangeHandler(e)}
          value={value}
          type="text"
          placeholder="Search Wikipedia"
          className="menu__search-input"
        />
        <SearchResults _ref={searchResultsRef} results={movies} />
      </div>
    </div>
  );
};

export default SeachBar;
