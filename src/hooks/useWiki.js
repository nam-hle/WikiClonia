import { useEffect, useState } from "react";
import {
  parseWikiText,
  buildURL,
  pageContentParams,
  imageParams,
  summaryParams
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

const useSummary = title => {
  const [summary, setSummary] = useState(null);
  const summaryFetch = useFetch(buildURL(summaryParams(title)));
  useEffect(() => {
    let pages = summaryFetch.response?.query?.pages;
    if (pages) {
      let extract = null;
      for (const key in pages) {
        extract = pages[key]?.extract;
      }
      setSummary(extract);
    }
  }, [summaryFetch.response]);
  return summary;
};

export { usePageContent, useImages, useSummary };
