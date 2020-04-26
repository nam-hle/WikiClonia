import React, { Fragment } from "react";
import Content from "./../Content";
import Menu from "./../Menu";
import Navigation from "./../Navigation";
import {
  usePageContent,
  useImages,
  useSummary
} from "./../../../hooks/useWiki.js";
import "lazysizes";
import ReactTooltip from "react-tooltip";

// import Sidebar from "./../SideBar";
// import Reference from "./../Reference";

export const ImagesContext = React.createContext(null);

const titles = [
  // "Pet_door"
  // "New_York_City",
  // "The_Last_Supper_(Leonardo)",
  // "Leonardo_da_Vinci",
  "Mona_Lisa"
  // "Renaissance"
];

const title = titles[Math.floor(Math.random() * titles.length)];

const Article = () => {
  const pageContent = usePageContent(title);
  const images = useImages(title);
  const summary = useSummary(title);

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

  return (
    <ImagesContext.Provider value={{ images }}>
      <Fragment>
        <ReactTooltip />
        <Menu />
        <div className="article">
          {/*<Sidebar content={parsed.images} images={images} />*/}
          <div className="hero">
            <div
              data-tip={`<p>${summary}</p>`}
              data-html={true}
              className="hero__title"
            >
              {title.replace(/_/g, " ")}
            </div>

            <div className="hero__credit">
              From Wikipedia, the free encyclopedia
            </div>
            <Content content={pageContent?.children} />
            {/*<Reference {...{ references }} />*/}
          </div>
        </div>
        <Navigation headings={pageContent?.headings} />
      </Fragment>
    </ImagesContext.Provider>
  );
};

export default Article;
