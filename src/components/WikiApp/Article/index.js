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

const Text = ({ text }) => {
  let [splitText, setSplitText] = useState("");
  useEffect(() => {
    let paragraphs = text.split("\n\n"),
      res = [];
    for (let i = 0; i < paragraphs.length; i++) {
      res.push(<span key={-i - 1}>{paragraphs[i]}</span>);
      if (i < paragraphs.length - 1) {
        res.push(<br key={i} />);
      }
    }
    setSplitText(res);
  }, []);
  return <Fragment>{splitText}</Fragment>;
};

const Template = ({ props }) => {
  // if (typeof props.children === "string") {
  //   return <span>{props.children}</span>;
  // }
  console.log(props);
  if (Array.isArray(props.children)) {
    // console.log("array");
    return (
      <Fragment>
        {props.children.map((e, i) => (
          <Element key={i} props={e} />
        ))}
      </Fragment>
    );
  }
  let { attribute } = props;

  return (
    <Fragment>
      <a className="wiki-cite" href={attribute.url}>
        {attribute.title}
      </a>
      {}
    </Fragment>
  );
  //{
  /*return <span>{JSON.stringify(props)}</span>;*/
  //}
};

const Element = ({ props, images }) => {
  let { elementName, children } = props;

  if (elementName == "Text") {
    return <Text text={props.text} />;
  }

  if (elementName == "Template") {
    return <Template {...{ props }} />;
  }

  let renderChildren;
  if (Array.isArray(children)) {
    renderChildren = children.map((e, i) => <Element key={i} props={e} />);
  }

  if (elementName == "Bold") {
    return <span className="wiki-bold">{renderChildren}</span>;
  }

  if (elementName == "Italic") {
    return <span className="wiki-italic">{renderChildren}</span>;
  }

  if (elementName == "Block Quote") {
    return <blockquote>{renderChildren}</blockquote>;
  }

  if (elementName == "Heading") {
    return <h2>{renderChildren}</h2>;
  }

  if (elementName == "Link") {
    let type = props.type;
    if (type == "wikiLink") {
      return (
        <a href={"https://en.wikipedia.org/wiki/" + props.url}>
          {props.displayText}
        </a>
      );
    }
    if (type == "media") {
      if (images[props.url]) {
        return (
          <Fragment>
            <div
              style={{
                float: "right",
                marginLeft: "0.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "240px"
              }}
            >
              <img style={{ maxWidth: "220px" }} src={images[props.url].url} />
              <div style={{ fontSize: "0.8rem", paddingLeft: "0.5rem" }}>
                {props.caption.map((e, i) => (
                  <Element key={i} props={e} />
                ))}
              </div>
            </div>
          </Fragment>
        );
      }
    }
  } else if (elementName == "Reference") {
    // console.log(props);
    if (
      props.children &&
      props.children.length &&
      props.children[0].attribute &&
      props.children[0].attribute.url
    ) {
      return (
        <sup>
          <a href={props.children[0].attribute.url}>{props.referenceIndex}</a>
        </sup>
      );
    }
    return (
      //<span>
      //        {content.innerHTML.map((e, i) => (
      // {/*<Element key={i} props={e} />*/}
      // ))}
      // </span>
      <sup>
        <a href={props}>{props.referenceIndex}</a>
      </sup>
    );
  }
  return JSON.stringify(props);
};

const Article = () => {
  const [content, setContent] = useState([]);
  const [images, setImages] = useState({});
  const [references, setReferences] = useState([]);

  // get main content
  useEffect(() => {
    var url =
      "https://en.wikipedia.org/w/api.php?action=parse&page=Pet_door&format=json&prop=wikitext&origin=*";
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(_text => {
        setContent(main(_text.parse.wikitext["*"]).children);
        console.log(main(_text.parse.wikitext["*"]));
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  // get references
  useEffect(() => {
    let res = [];
    for (const element of content) {
      if (element.elementName == "Reference") {
        res.push(element);
      }
    }
    setReferences(res);
  }, [content]);

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

  return (
    <React.Fragment>
      {(function() {
        let res = [];
        for (let index = 0; index < content.length; index++) {
          let element = content[index];
          res.push(<Element key={index} props={element} images={images} />);
          // console.log(element);
          if (
            element.elementName == "Heading" &&
            element.children[0].text == " References "
          ) {
            break;
          }
        }
        return res;
      })()}
      {references.map((reference, index) => {
        return (
          <li className="wiki-ref" key={index}>
            <span>{reference.referenceIndex + ". "}</span>
            {(function() {
              return reference.children.map((child, childrenIndex) => {
                return <Element key={childrenIndex} props={child} />;
              });
            })()}
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default Article;

// {content.map((element, index) => {
//         if (element.elementName == "Reference" && element.children[0] == " References ")
//         return <Element key={index} props={element} images={images} />;
//       })}
