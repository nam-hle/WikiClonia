import React, { Fragment, useState, useEffect } from "react";
import { main } from "./../../../wiki_parser";

// const Data = React.createContext({});

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
//
//

const Text = ({ content }) => {
  let [text, setText] = useState("");
  useEffect(() => {
    let paragraphs = content.split("\n\n"),
      res = [];
    for (let i = 0; i < paragraphs.length; i++) {
      res.push(<span key={-i - 1}>{paragraphs[i]}</span>);
      if (i < paragraphs.length - 1) {
        res.push(<br key={i} />);
      }
    }
    setText(res);
  }, []);
  return <Fragment>{text}</Fragment>;
};

const Template = ({ content }) => {
  // console.log(content);
  if (typeof content === "string") {
    // console.log("string");
    return <span>{content}</span>;
  }
  if (Array.isArray(content)) {
    // console.log("array");
    return (
      <Fragment>
        {content.map((e, i) => (
          <Element key={i} props={e} />
        ))}
      </Fragment>
    );
  }
  // console.log("cite");
  return (
    <a className="wiki-cite" href={content.attribute.url}>
      {content.attribute.title}
    </a>
  );
};

const Element = ({ props, images }) => {
  let { elementName, content } = props;

  if (elementName == "Text") {
    return <Text {...{ content }} />;
  }

  if (elementName == "Template") {
    return <Template {...{ content }} />;
  }

  let renderContent;
  if (Array.isArray(content)) {
    renderContent = content.map((e, i) => <Element key={i} props={e} />);
  }

  if (elementName == "Bold") {
    return <span className="wiki-bold">{renderContent}</span>;
  }

  if (elementName == "Italic") {
    return <span className="wiki-italic">{renderContent}</span>;
  }

  if (elementName == "Block Quote") {
    return <blockquote>{renderContent}</blockquote>;
  }

  if (elementName == "Heading") {
    return <h2>{renderContent}</h2>;
  }

  if (elementName == "Link") {
    let type = props.content.type;
    if (type == "wikiLink") {
      return (
        <a href={"https://en.wikipedia.org/wiki/" + props.content.url}>
          {props.content.displayText}
        </a>
      );
    }
    if (type == "media") {
      if (images[props.content.url]) {
        return (
          <img
            style={{ float: "left", height: "80px" }}
            src={images[props.content.url].url}
          />
        );
      }
    }
  } else if (props.elementName == "Reference") {
    console.log(content);
    return (
      //<span>
      //        {content.innerHTML.map((e, i) => (
      // {/*<Element key={i} props={e} />*/}
      // ))}
      // </span>
      <sup>{content.referenceIndex}</sup>
    );
  }
  return JSON.stringify(props);
};

const Article = () => {
  const [content, setContent] = useState([]);
  const [images, setImages] = useState({});
  // const [references, setReferences] = useState([]);
  // get main content
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

  // get references
  // useEffect(() => {
  //   let res = [];
  //   for (const element of content) {
  //     if (element.elementName == "Reference") {
  //       res.push(element);
  //     }
  //   }
  //   setReferences(res);
  // }, [content]);

  // get images
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
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  // console.log(references);

  return (
    <React.Fragment>
      {content.map((element, index) => {
        return <Element key={index} props={element} images={images} />;
      })}
    </React.Fragment>
  );
};

export default Article;
