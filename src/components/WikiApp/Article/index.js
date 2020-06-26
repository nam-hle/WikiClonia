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
// import { BarLoader as Loader } from "react-spinners";

import "lazysizes";
import "./style.sass";
import "./style.css";
export const ImagesContext = React.createContext(null);

const toCapitalize = word =>
  word[0].toUpperCase() + word.slice(1).toLowerCase();

const Article = ({ force_title }) => {
  let title = force_title ? force_title : useParams()?.title;

  const images = useImages(title);
  const metaData = useMetaData(title);
  let [loading, setLoading] = React.useState(false);
  const { pageContent } = usePageContent(title, setLoading);

  React.useEffect(() => {
    document.title = title
      .replace(/_/g, " ")
      .replace(/\w+/g, word => toCapitalize(word));
    setLoading(true);
  }, [title]);

  return (
    <ImagesContext.Provider value={{ images }}>
      <Fragment>
        <SkeletonTheme color="transparent">
          <div className="article">
            <div className="hero">
              <div className="hero__title">
                {title
                  .replace(/_/g, " ")
                  .replace(/\w+/g, word => toCapitalize(word))}
              </div>
              <div className="hero__credit">
                {!loading &&
                  `Created on ${metaData.date} by ${metaData.creator} | ${(
                    pageContent?.wordCount / 300
                  )?.toFixed(0)} min read`.toUpperCase()}
              </div>
              <Content content={pageContent?.children} loading={loading} />
            </div>
          </div>
        </SkeletonTheme>
        <Navigation headings={pageContent?.headings} />
      </Fragment>
    </ImagesContext.Provider>
  );
};

export default Article;
