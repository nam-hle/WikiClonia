import { main } from "./../wiki_parser";

const parseWikiText = response => main(response?.parse?.wikitext?.["*"]);

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

export {
  parseWikiText,
  buildURL,
  pageContentParams,
  imageParams,
  summaryParams
};
