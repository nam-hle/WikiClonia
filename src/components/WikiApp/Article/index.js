import React, { Fragment } from "react";
import Content from "./../Content";
import Navigation from "./../Navigation";
import { usePageContent, useImages } from "./../../../hooks/useWiki.js";
import { SkeletonTheme } from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import "lazysizes";
import "./style.sass";

export const ImagesContext = React.createContext(null);

const Article = ({ force_title }) => {
  let title;
  title = force_title ? force_title : useParams();
  const pageContent = usePageContent(title);
  const images = useImages(title);

  React.useEffect(() => {
    let toggle = document.getElementById("theme-switch");

    toggle?.addEventListener("click", function(e) {
      e.preventDefault();
      if (document.body.classList.contains("funky")) {
        toggle.innerText = "LIGHT MODE";
        document.body.classList.remove("funky");
      } else {
        toggle.innerText = "DARK MODE";
        document.body.classList.add("funky");
      }
    });
  }, []);

  return (
    <ImagesContext.Provider value={{ images }}>
      <Fragment>
        <SkeletonTheme color="transparent">
          <div className="article">
            <div className="hero">
              <div className="hero__title">{title.replace(/_/g, " ")}</div>
              <div className="hero__credit">
                From Wikipedia, the free encyclopedia
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
