import React, { useState, useEffect } from "react";

const App = () => {
  const [text, setText] = useState("@");

  useEffect(() => {
    var url =
      "https://en.wikipedia.org/w/api.php?action=parse&page=Pet_door&format=json&prop=wikitext&origin=*";
    fetch(url)
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(_text => {
        console.log(_text);
        setText(_text);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  return <div>{text && text.parse && text.parse.wikitext["*"]}</div>;
};

export default App;
