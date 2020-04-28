import { useEffect, useState } from "react";
import {
  parseWikiText,
  buildURL,
  pageContentParams,
  imageParams
} from "./../WikiWrapper";
import useFetch from "./useFetch.js";

const usePageContent = title => {
  const [pageContent, setPageContent] = useState(null);
  const pageContentFetcher = useFetch(buildURL(pageContentParams(title)));
  useEffect(() => {
    setPageContent(parseWikiText(pageContentFetcher.response));
  }, [pageContentFetcher.response]);
  return pageContent;
};

const useImages = title => {
  const [images, setImages] = useState(null);
  const imageFetch = useFetch(buildURL(imageParams(title)));
  useEffect(() => {
    let imgs = imageFetch.response?.query?.pages,
      res = {};
    // return object {filename: {url, width, height}}
    for (const key in imgs) {
      let { url, width, height } = imgs[key]?.imageinfo?.[0];
      res[imgs[key].title] = { url, width, height };
    }
    setImages(res);
  }, [imageFetch.response]);
  return images;
};

export { usePageContent, useImages };
