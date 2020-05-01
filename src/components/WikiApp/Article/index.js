import React, { Fragment } from "react";
import Content from "./../Content";
import Menu from "./../Menu";
import Navigation from "./../Navigation";
import { usePageContent, useImages } from "./../../../hooks/useWiki.js";
import "lazysizes";
import { SkeletonTheme } from "react-loading-skeleton";

// import Sidebar from "./../SideBar";
// import Reference from "./../Reference";

export const ImagesContext = React.createContext(null);

// const titles = [
//   // "Pet_door"
//   "New_York_City",
//   "The_Last_Supper_(Leonardo)",
//   "Leonardo_da_Vinci",
//   "Mona_Lisa",
//   "Renaissance"
// ];

const Article = ({ title }) => {
  title = title || "The_Last_Supper_(Leonardo)";
  const pageContent = usePageContent(title);
  const images = useImages(title);

  return (
    <ImagesContext.Provider value={{ images }}>
      <Fragment>
        <Menu />
        <SkeletonTheme color="#202020" highlightColor="#444">
          <div className="article">
            {/*<Sidebar content={parsed.images} images={images} />*/}
            <div className="hero">
              <div className="hero__title">{title.replace(/_/g, " ")}</div>
              <div className="hero__credit">
                From Wikipedia, the free encyclopedia
              </div>
              <Content content={pageContent?.children} />
              {/*<Reference {...{ references }} />*/}
            </div>
          </div>
        </SkeletonTheme>
        <Navigation headings={pageContent?.headings} />
      </Fragment>
    </ImagesContext.Provider>
  );
};

export default Article;

// get references
// useEffect(() => {
//   if (parsed.children) {
//     let res = [];
//     for (const element of parsed.children) {
//       if (element.elementName == "Reference") {
//         res.push(element);
//       }
//     }
//     setReferences(res);
//   }
// }, [parsed]);
