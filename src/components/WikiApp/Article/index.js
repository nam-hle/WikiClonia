import React, { Fragment } from "react";
import Content from "./../Content";
import Navigation from "./../Navigation";
import {
  usePageContent,
  useImages,
  useMetaData
} from "./../../../hooks/useWiki.js";
import { SkeletonTheme } from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import "lazysizes";
import "./style.sass";

// import { buildURL, revisionParams } from "./../../../WikiWrapper";

export const ImagesContext = React.createContext(null);

const Article = ({ force_title }) => {
  let title = force_title ? force_title : useParams()?.title;
  const pageContent = usePageContent(title);
  const images = useImages(title);
  const metaData = useMetaData(title);

  console.log(pageContent);
  React.useEffect(() => {
    let toggle = document.getElementById("theme-switch");

    let switcher = function(e) {
      e.preventDefault();
      if (document.body.classList.contains("funky")) {
        toggle.innerText = "LIGHT MODE";
        document.body.classList.remove("funky");
      } else {
        toggle.innerText = "DARK MODE";
        document.body.classList.add("funky");
      }
    };
    toggle?.addEventListener("click", switcher);

    return () => toggle.removeEventListener("click", switcher);
  }, []);

  return (
    <ImagesContext.Provider value={{ images }}>
      <Fragment>
        <SkeletonTheme color="transparent">
          <div className="article">
            <div className="hero">
              <div className="hero__title">{title.replace(/_/g, " ")}</div>
              <div className="hero__credit">
                {/*From Wikipedia, the free encyclopedia*/}
                {`Created on ${metaData.date} by ${metaData.creator} | ${(
                  pageContent?.wordCount / 200
                )?.toFixed(0)} min read`.toUpperCase()}
              </div>
              <Content content={pageContent?.children} />
            </div>
          </div>
        </SkeletonTheme>
        <Navigation headings={pageContent?.headings} />
      </Fragment>
    </ImagesContext.Provider>
  );
};

export default Article;
