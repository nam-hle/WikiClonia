import React, { Fragment, useState } from "react";
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

export const ImagesContext = React.createContext(null);

const Article = ({ force_title }) => {
  let title = force_title ? force_title : useParams()?.title;
  let [articleLoading, setArticleLoading] = useState(true);
  let { pageContent } = usePageContent(
    title,
    articleLoading,
    setArticleLoading
  );
  const images = useImages(title);
  const metaData = useMetaData(title);

  return (
    <ImagesContext.Provider value={{ images }}>
      <Fragment>
        <SkeletonTheme color="transparent">
          <div className="article">
            <div className="hero">
              <div className="hero__title">{title.replace(/_/g, " ")}</div>
              <div className="hero__credit">
                {`Created on ${metaData.date} by ${metaData.creator} | ${(
                  pageContent?.wordCount / 300
                )?.toFixed(0)} min read`.toUpperCase()}
              </div>
              <Content
                content={pageContent?.children}
                loading={articleLoading}
              />
            </div>
          </div>
        </SkeletonTheme>
        <Navigation headings={pageContent?.headings} />
      </Fragment>
    </ImagesContext.Provider>
  );
};

export default Article;
