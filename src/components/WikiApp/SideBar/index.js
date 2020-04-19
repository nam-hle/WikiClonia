import React, { Fragment, useEffect } from "react";
import { Element } from "./../Elements";

const Sidebar = ({ content, images }) => {
  // let [positions, setPositions] = useState([]);

  // if (content && images) {
  //   for (const img of content) {
  //     let e = document.getElementById(img.url);
  //     if (e) {
  //       let body = document.body;
  //       // let offset =
  //       //   e.getBoundingClientRect().top - body.getBoundingClientRect().top;
  //       console.log(
  //         e.offsetTop,
  //         e.getBoundingClientRect(),
  //         body.getBoundingClientRect().top,
  //         window.pageYOffset
  //       );
  //     }
  //     // if (e) {
  //     // img.pos = e.offsetTop;
  //     // console.log(img.url, e.attributes);
  //     // }
  //   }
  // }
  useEffect(() => {
    console.log(content, images);
    if (content) {
      for (const img of document.getElementsByClassName(
        "wiki-img__container"
      )) {
        console.log(img.offsetTop);
      }
    }
  }, [content]);

  // useEffect(() => {
  //   console.log("@");
  //   if (content && images) {
  //     for (const img of content) {
  //       let e = document.getElementById(img.url);
  //       if (e) {
  //         let body = document.body;
  //         // let offset =
  //         //   e.getBoundingClientRect().top - body.getBoundingClientRect().top;
  //         console.log(
  //           e.getBoundingClientRect(),
  //           body.getBoundingClientRect().top,
  //           window.pageYOffset
  //         );
  //       }
  //       // if (e) {
  //       // img.pos = e.offsetTop;
  //       // console.log(img.url, e.attributes);
  //       // }
  //     }
  //   }
  // }, []);

  return (
    <div className="sidebar">
      <Fragment>
        {content &&
          images &&
          content.map((img, index) => {
            return (
              img.url &&
              images[img.url] && (
                <div key={index} className={"wiki-img__container"}>
                  <img className="wiki-img__image" src={images[img.url].url} />
                  <div className="wiki-img__caption">
                    {img.caption.map((e, i) => (
                      <Element key={i} props={e} />
                    ))}
                  </div>
                </div>
              )
            );
          })}
      </Fragment>
    </div>
  );
};

export default Sidebar;
