import { useEffect, useState } from "react";
import {
  parseWikiText,
  buildURL,
  pageContentParams,
  imageParams,
  metaDataParams
} from "./../WikiWrapper";
import useFetch from "./useFetch.js";

const usePageContent = title => {
  const [pageContent, setPageContent] = useState(null);
  const pageContentFetcher = useFetch(buildURL(pageContentParams(title)));
  useEffect(() => {
    let response = pageContentFetcher.response?.parse?.wikitext?.["*"];
    if (response) {
      setPageContent(parseWikiText(response));
    }
  }, [pageContentFetcher.response, title]);
  return pageContent;
};

const useImages = title => {
  const [images, setImages] = useState(null);
  const imageFetch = useFetch(buildURL(imageParams(title)));
  useEffect(() => {
    let imgs = imageFetch.response?.query?.pages,
      res = {};
    for (const key in imgs) {
      let { url, width, height } = imgs[key]?.imageinfo?.[0];
      res[imgs[key].title] = { url, width, height };
    }
    setImages(res);
  }, [imageFetch.response]);
  return images;
};

const useMetaData = title => {
  const [date, setDate] = useState(null);
  const [creator, setCreator] = useState(null);
  const dateFetcher = useFetch(buildURL(metaDataParams(title)));
  useEffect(() => {
    let response = dateFetcher.response?.query?.pages,
      dateResponse,
      creatorResponse;
    console.log(response);
    if (response) {
      for (const pageID of Object.keys(response)) {
        let revisions = response[pageID]?.revisions;
        if (revisions.length) {
          dateResponse = revisions[0].timestamp;
          creatorResponse = revisions[0].user;
        }
      }

      let dateObject = new Date(dateResponse);
      let [dateOfMonth, month, year] = [
        dateObject.getDate(),
        dateObject.toLocaleString("default", { month: "long" }),
        dateObject.getFullYear()
      ];
      setCreator(creatorResponse);
      setDate(`${month} ${dateOfMonth}, ${year}`);
    }
  }, [dateFetcher.response]);
  return { date, creator };
};

export { usePageContent, useImages, useMetaData };
