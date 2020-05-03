import React, { Fragment, useState, useEffect } from "react";
import { ImagesContext } from "./../Article";
import Tooltip from "./../Tooltip";

export const Text = ({ text }) => {
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

const Heading = ({ className, id, text }) => {
  const heading = React.useRef();

  // const isElementInViewport = () => {
  //   // console.log("text");
  //   let el = heading.current;
  //   // Special bonus for those using jQuery

  //   var rect = el.getBoundingClientRect();

  //   let res =
  //     rect.top >= 0 &&
  //     rect.left >= 0 &&
  //     rect.bottom <=
  //       (window.innerHeight || document.documentElement.clientHeight) &&
  //     rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  //   // if (res) {
  //   //   console.log(text);
  //   // }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", isElementInViewport);
  //   return () => window.removeEventListener("scroll", isElementInViewport);
  // }, []);

  return (
    <div ref={heading} className={className} id={id}>
      {text}
    </div>
  );
};

const WikiLink = ({ url, displayText }) => {
  return (
    <Tooltip url={url}>
      <a href={"https://en.wikipedia.org/wiki/" + url}>
        {displayText.map((e, i) => {
          return <Element key={i} props={e} />;
        })}
      </a>
    </Tooltip>
  );
};

export const Template = ({ props }) => {
  if (props.type == "N/A" || props.type == "Infobox") return "";

  let { attribute } = props;
  if (props.type == "multipleImages") {
    return (
      <div className="wiki-gallery">
        {props.images &&
          props.images.map((e, i) => {
            return <Element key={i} props={e} />;
          })}
      </div>
    );
  }
  if (props.type == "cite")
    return (
      <Fragment>
        <a className="wiki-cite" href={attribute.url}>
          {`"${attribute.title}"`}
        </a>
        {". "}
        {props.subType == "web" && attribute.publisher && (
          <span>{`${attribute.publisher}. `}</span>
        )}
        {props.subType == "web" && attribute.accessdate && (
          <span>{`Retrieved ${attribute.accessdate}. `}</span>
        )}
      </Fragment>
    );

  if (props.type == "footnote") {
    return (
      <sup className="wiki-footnote">
        {props.children.map((e, i) => (
          <Element key={i} props={e} />
        ))}
      </sup>
    );
  }

  return "<--N/A" + JSON.stringify(props) + "-->";
};

export const Element = ({ props }) => {
  let { elementName, children } = props;

  if (elementName == "Comment") return "";

  if (elementName == "ExternalLink") {
    return (
      <a href={"https://en.wikipedia.org/wiki/" + props.url}>
        {props.displayText}
      </a>
    );
  }

  if (elementName == "Break") {
    return <br />;
  }

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

  if (elementName == "BoldItalic") {
    return <span className="wiki-italic wiki-bold">{renderChildren}</span>;
  }

  if (elementName == "Block Quote") {
    return <blockquote>{renderChildren}</blockquote>;
  }

  if (elementName.slice(0, -1) == "Heading") {
    return <Heading {...props} />;
  }

  if (elementName == "Gallery") {
    return (
      <div className="wiki-gallery">
        {props.images.map((e, i) => {
          return <Element key={i} props={e} />;
        })}
      </div>
    );
  }

  if (elementName == "Link") {
    let type = props.type;
    if (type == "wikiLink") {
      return <WikiLink url={props.url} displayText={props.displayText} />;
    }
    if (type == "media") {
      const valueImages = React.useContext(ImagesContext);

      if (props && props.url && valueImages && valueImages.images[props.url]) {
        let float =
          !props.multipleImage && props?.options?.indexOf("left") > -1
            ? "fl-left"
            : "fl-right";
        return (
          <Fragment>
            <div className={`wiki-img__container ${float}`}>
              <img
                id={props.url}
                className="lazyload wiki-img__image"
                data-src={valueImages.images[props.url].url}
              />
              <div className="wiki-img__caption">
                {props.caption?.map((e, i) => <Element key={i} props={e} />) ||
                  ""}
              </div>
            </div>
          </Fragment>
        );
      }
    }
  } else if (elementName == "Reference") {
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
      <sup>
        <a href={props}>{props.referenceIndex}</a>
      </sup>
    );
  }
  return JSON.stringify(props);
};
