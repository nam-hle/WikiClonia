import React, { useState, useEffect } from "react";
import { main } from "./../../../wiki_parser";

// const Image = ({ url, options, caption }) => {
//   useEffect(() => {
//     var url =
//       "http://en.wikipedia.org/w/api.php?action=query&titles=Pet_door&prop=pageimages&format=json&origin=*";
//     fetch(url)
//       .then(function(response) {
//         return response.json();
//       })
//       .then(_text => {})
//       .catch(function(error) {
//         console.log(error);
//       });
//   }, []);
// };

const Element = ({ props, images }) => {
  let { elementName, content } = props;
  if (elementName == "Text") {
    let paragraphs = content.split("\n\n"),
      res = [];
    for (let i = 0; i < paragraphs.length; i++) {
      res.push(<span key={-i - 1}>{paragraphs[i]}</span>);
      if (i < paragraphs.length - 1) {
        res.push(<br key={i} />);
      }
    }
    return <React.Fragment>{res}</React.Fragment>;
  }

  let renderContent;
  if (Array.isArray(content)) {
    renderContent = content.map((e, i) => <Element key={i} props={e} />);
  }

  if (elementName == "Bold") {
    return <span style={{ fontWeight: "bold" }}>{renderContent}</span>;
  }

  if (elementName == "Italic") {
    return <span style={{ fontWeight: "italic" }}>{renderContent}</span>;
  }

  if (elementName == "Block Quote") {
    return <blockquote>{renderContent}</blockquote>;
  }

  if (elementName == "Heading") {
    return <h2>{renderContent}</h2>;
  }

  if (elementName == "Link") {
    let type = props.content.type;
    // console.log(content);
    if (type == "wikiLink") {
      return (
        <a href={"https://en.wikipedia.org/wiki/" + props.content.url}>
          {props.content.displayText}
        </a>
      );
    }
    if (type == "media") {
      console.log(images);
      if (images[props.content.url]) {
        return (
          <img
            style={{ float: "left", height: "80px" }}
            src={images[props.content.url].url}
          />
        );
      }
    }
    return "";
  } else if (props.elementName == "Reference") {
    return <a href={props.content.url}>{props.content.title}</a>;
  } else {
    return JSON.stringify(props);
  }
};

const Article = () => {
  const [content, setContent] = useState([]);
  const [images, setImages] = useState({});
  useEffect(() => {
    var url =
      "https://en.wikipedia.org/w/api.php?action=parse&page=Pet_door&format=json&prop=wikitext&origin=*";
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(_text => {
        setContent(main(_text.parse.wikitext["*"], null, 0).content);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var url =
      "https://en.wikipedia.org/w/api.php?action=query&titles=Pet_door&generator=images&gimlimit=10&prop=imageinfo&iiprop=url|dimensions|mime&format=json&origin=*";
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
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      {content.map((element, index) => {
        return <Element key={index} props={element} images={images} />;
      })}
      {JSON.stringify(images)}
    </React.Fragment>
  );
};

export default Article;
