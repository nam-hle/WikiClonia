import React, { useState } from "react";
import SearchIcon from "./../../../asset/images/search.svg";
import "./style.sass";
import { v4 as uuidv4 } from "uuid";
import { buildURL, searchParams } from "./../../../WikiWrapper";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SearchItem = ({ title, description }) => {
  const history = useHistory();

  return (
    <div
      className="searchbar__item"
      onMouseDown={() => {
        document.body.scrollTop = 0;
        history.push("/" + encodeURIComponent(title));
      }}
    >
      <div className="searchbar__title">{title}</div>
      <Link
        to={"/" + encodeURIComponent(title)}
        className="searchbar__overview"
        dangerouslySetInnerHTML={{ __html: description }}
      ></Link>
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
      searchResultsRef.current.classList.remove("show");
    };
    inputRef.current.addEventListener("focus", reveal);
    inputRef.current.addEventListener("blur", hidden);

    return () => {
      inputRef.current.removeEventListener("focus", reveal);
      inputRef.current.removeEventListener("blur", hidden);
    };
  }, []);

  React.useEffect(() => {
    let source = axios.CancelToken.source();
    if (!value) {
      setMovies([]);
    } else {
      axios
        .get(buildURL(searchParams(value)), { cancelToken: source.token })
        .then(response => response.data)
        .then(json => {
          let title = json?.query?.search?.map(movie => ({
            title: movie.title,
            description: movie.snippet
          }));
          setMovies(title);
        })
        .catch(function(thrown) {
          if (axios.isCancel(thrown)) {
            console.log("Request canceled", thrown.message);
          } else {
            // handle error
          }
        });
    }
    return () => source.cancel("Canlling in cleanup");
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
