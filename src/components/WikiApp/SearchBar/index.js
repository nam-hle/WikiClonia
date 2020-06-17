import React, { useState } from "react";
import SearchIcon from "./../../../asset/images/search.svg";
import "./style.sass";
import { v4 as uuidv4 } from "uuid";

const SearchItem = ({ title, overview }) => {
  return (
    <div className="searchbar__item">
      <div className="searchbar__title">{title}</div>
      <div className="searchbar__overview">{overview}</div>
    </div>
  );
};

const SearchResults = ({ results }) => {
  return (
    <div className="searchbar__results">
      {results &&
        results.map(item => (
          <SearchItem key={uuidv4()} title={item[0]} overview={item[1]} />
        ))}
    </div>
  );
};

const SeachBar = () => {
  let [movies, setMovies] = useState([
    [
      "Titanic",
      "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with he…"
    ],
    [
      "Aliens vs. Titanic",
      "Offering only the finest amenities, the ‘TITAN 1C’ space-cruiser is considered the most luxurious star-liner ever built. Futur…"
    ],
    [
      "Aliens vs. Titanic",
      "Offering only the finest amenities, the ‘TITAN 1C’ space-cruiser is considered the most luxurious star-liner ever built. Futur…"
    ]
  ]);
  // let [loading, setLoading] = useState(false);
  let [value, setValue] = useState("");

  React.useEffect(() => {
    const search = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=e432fea9485ba7dcbad7d23e084cdc74`
      );
      const json = await response.json();

      if (json) {
        let title = json?.results.map(movie => [movie.title, movie.overview]);
        setMovies(title);
        console.log(title);
      }
    };
    if (value) search();
  }, [value]);

  const onChangeHandler = e => setValue(e.target.value);

  return (
    <div className="menu__search">
      <div className="menu__search-icon">
        <SearchIcon />
      </div>
      <div className="menu__searchbar">
        <input
          onChange={e => onChangeHandler(e)}
          value={value}
          type="text"
          placeholder="Search Wikipedia"
          className="menu__search-input"
        />
        <SearchResults results={movies} />
      </div>
    </div>
  );
};

export default SeachBar;
