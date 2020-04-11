import React, { Fragment, useState, useEffect } from "react";
import { main } from "./../../../wiki_parser";
import Sidebar from "./../SideBar";

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
  if (Array.isArray(props.children)) {
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

  if (elementName == "Heading1") {
    return <h2>{renderChildren}</h2>;
  }

  if (elementName == "Heading2") {
    return <h3>{renderChildren}</h3>;
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
      if (props && props.url && images && images[props.url]) {
        let float = props.options.indexOf("left") > -1 ? "fl-left" : "fl-right";
        return (
          <Fragment>
            <div className={`wiki-img__container ${float}`}>
              <img className="wiki-img__image" src={images[props.url].url} />
              <div className="wiki-img__caption">
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
  // console.log(props);
  return JSON.stringify(props);
};

const Article = () => {
  // const [content, setContent] = useState([]);
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
    console.log("Get references ", parsed);
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
      "https://en.wikipedia.org/w/api.php?action=query&titles=Norway&generator=images&gimlimit=500&prop=imageinfo&iiprop=url|dimensions|mime&format=json&origin=*";
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
      <nav
        style={{ width: "100%", height: 40, backgroundColor: "#252525" }}
      ></nav>
      <div className="article">
        {parsed.headings && <Sidebar headings={parsed.headings} />}
        <div className="hero">
          <div className="hero__title">Norway</div>
          {(function() {
            let res = [],
              content = parsed.children;
            if (!content) return "Loading...";
            for (let index = 0; index < content.length; index++) {
              let element = content[index];
              res.push(<Element key={index} props={element} images={images} />);
              // console.log(element);
              if (
                element.elementName == "Heading1" &&
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
                    // console.log(index);
                    return <Element key={childrenIndex} props={child} />;
                  });
                })()}
              </li>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Article;
