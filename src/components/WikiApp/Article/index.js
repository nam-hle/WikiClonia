import React, { Fragment, useState, useEffect } from "react";
import { main } from "./../../../wiki_parser";
import Sidebar from "./../SideBar";
import Reference from "./../Reference";
import Content from "./../Content";
import Menu from "./../Menu";

const Article = () => {
  const [images, setImages] = useState({});
  const [references, setReferences] = useState([]);
  const [parsed, setParsed] = useState({});

  // get main content
  useEffect(() => {
    var url =
      "https://en.wikipedia.org/w/api.php?action=parse&page=Norway&format=json&prop=wikitext&origin=*";
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(_text => {
        let rawText = _text.parse.wikitext["*"];
        let startIndex = rawText.indexOf(
          "'''Norway''' ([[Norwegian language|Norwegian]]:"
        );
        let cutoffText = rawText.slice(startIndex);
        setParsed(main(cutoffText));
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  // get references
  useEffect(() => {
    if (parsed.children) {
      let res = [];
      for (const element of parsed.children) {
        if (element.elementName == "Reference") {
          res.push(element);
        }
      }
      setReferences(res);
    }
  }, [parsed]);

  // get images
  useEffect(() => {
    var url =
      "https://en.wikipedia.org/w/api.php?action=query&titles=Norway&generator=images&gimlimit=20&prop=imageinfo&iiprop=url|dimensions|mime&format=json&origin=*";
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        let imgs = data.query.pages,
          res = {};
        for (const key in imgs) {
          res[imgs[key].title] = imgs[key].imageinfo[0];
        }
        setImages(res);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  return (
    <Fragment>
      <Menu />
      <div className="article">
        {parsed.headings && <Sidebar headings={parsed.headings} />}
        <div className="hero">
          <div className="hero__title">Norway</div>
          <Content content={parsed.children} images={images} />
          <Reference {...{ references }} />
        </div>
      </div>
    </Fragment>
  );
};

export default Article;
