import { main } from "./parser";

const parseWikiText = response => main(response);

const buildURL = params =>
  "https://en.wikipedia.org/w/api.php?" +
  new URLSearchParams({ ...params, format: "json", origin: "*" });

const pageContentParams = title => ({
  action: "parse",
  prop: "wikitext",
  page: title
});

const imageParams = (title, limit = 500) => ({
  action: "query",
  prop: "imageinfo",
  titles: title,
  generator: "images",
  gimlimit: limit,
  iiprop: "url|dimensions"
});

const summaryParams = title => ({
  action: "query",
  prop: "extracts",
  exsentences: 2,
  exintro: true,
  explaintext: true,
  exsectionformat: "plain",
  redirects: 1,
  titles: title
});

const revisionParams = title => ({
  action: "query",
  prop: "revisions",
  titles: title,
  rvprop: "user|comment|content|tags|timestamp",
  rvlimit: "5",
  format: "json"
});

const metaDataParams = title => ({
  action: "query",
  prop: "revisions",
  rvlimit: 1,
  rvprop: "timestamp|user|userid",
  rvdir: "newer",
  titles: title
});

const searchParams = string => ({
  action: "query",
  list: "search",
  srsearch: string,
  srprop: "size|wordcount|titlesnippet|categorysnippet|snippet",
  utf8: ""
});

export {
  parseWikiText,
  buildURL,
  pageContentParams,
  imageParams,
  summaryParams,
  revisionParams,
  metaDataParams,
  searchParams
};
