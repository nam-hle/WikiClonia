import convert from "convert-units";
import { Global, PairPipe } from "./elements";
import { analyseHeadings } from "./analyser";
import {
  tasteStr,
  capitalizeFirst,
  capitalize,
  trimQuote,
  clean
} from "./utils";

// var convert = require("convert-units");
const UNITS = convert().list();
const ABBR_UNITS = convert()
  .list()
  .map(unit => unit.abbr);

const createTextElement = text => ({ elementName: "Text", text });

const CiteParser = plain => {
  let R_CITE = /\{\{cite (?<subType>\w+)\s*\|?(?<remain>[\S\s]*)}}$/gi;

  let match = R_CITE.exec(plain);

  if (!match) return;

  let { subType, remain } = match.groups;

  let attribute = {};

  for (const pair of remain.split("|")) {
    let equalIndex = pair.indexOf("=");
    let [key, value] = [
      pair.slice(0, equalIndex),
      pair.slice(equalIndex + 1).trim()
    ];
    attribute[key] = value;
  }
  return { type: "cite", subType, attribute };
};

const ConvertParser = plain => {
  // console.log(plain);
  const toMetric = fromUnit => {
    let res = null;
    try {
      for (const toUnit of convert()
        .from(fromUnit)
        .possibilities()) {
        let fromSystem = convert().describe(toUnit).system;
        if ("metric" == fromSystem) res = toUnit;
      }
    } catch {
      return null;
    }
    return res;
  };

  const toAbbr = str => {
    if (/^°?[CF]$/.test(str)) return str;
    let lower = str.toLowerCase();
    for (const unit of UNITS) {
      if (
        unit.abbr.toLowerCase() == lower ||
        unit.singular.toLowerCase() == lower ||
        unit.plural.toLowerCase() == lower
      )
        return unit.abbr;
    }
    return str;
  };

  let tokens = plain.slice(2, -2).split`|`,
    numbers = null,
    toUnit = null,
    answer = null,
    fromUnit;

  tokens.shift();

  numbers = tokens.shift();

  fromUnit = toAbbr(tokens.shift());

  if (/^°?C$/.test(fromUnit)) {
    fromUnit = "°C";
    toUnit = "°F";
    answer = +numbers / (5 / 9) + 32;
  } else if (/^°?F$/.test(fromUnit)) {
    fromUnit = "°F";
    toUnit = "°C";
    answer = (+numbers - 32) * (5 / 9);
  } else {
    if (tokens.length && ABBR_UNITS.indexOf(tokens[0]) != -1) {
      toUnit = tokens.shift();
    }

    if (!toUnit) toUnit = toMetric(fromUnit);
    if (numbers && toUnit && fromUnit) {
      try {
        answer = convert(+numbers)
          .from(fromUnit)
          .to(toUnit);
      } catch {
        return {
          elementName: "Text",
          text: `${numbers} ${fromUnit}`
        };
      }
    }
  }

  answer = answer ? answer.toFixed(2) : null;
  if (fromUnit && toUnit && answer !== null) {
    return {
      elementName: "Text",
      text: `${numbers} ${fromUnit} (${answer} ${toUnit})`
    };
  }

  return {
    elementName: "Text",
    text: `${numbers} ${fromUnit}`
  };
};

const ReferenceParser = plain => {
  // console.log(plain);
  let refname,
    refgroup,
    children,
    match,
    remain = plain;

  // 1. Extract tag name
  const R_HEAD = /^<ref(erences)? *(?<remain>[\s\S]*)$/gi;
  if ((match = R_HEAD.exec(plain)) === null)
    throw "Reference Synxtax Error " + plain;

  remain = match.groups.remain;

  // 2. Try extract refgroup
  const R_GROUP = /^group *= *(?<refgroup>\"[^#\"\'\/=>\?\\]+\"|[^\#\"\'\/=>\?\\ ]+)\s*(?<remain>[\s\S]*)$/gi;
  if ((match = R_GROUP.exec(remain)) !== null) {
    ({ remain, refgroup } = match.groups);
    refgroup = trimQuote(refgroup);
  }

  // 3. Try extract refname
  const R_NAME = /^name *= *(?<refname>\"[^#\"\/=>\\]+\"|[^\#\"\'\/=>\?\\ ]+)\s*(?<remain>[\s\S]*)$/gi;
  if ((match = R_NAME.exec(remain)) !== null) {
    ({ remain, refname } = match.groups);
    refname = trimQuote(refname);
  }

  // 4.1. Reuse Reference
  if (/^\s*\/>$/.exec(remain)) {
    return { type: "reuse", refname, refgroup };
  }

  // 4.2. Firstuse Reference
  // console.log(remain);
  const R_FIRSTUSE = /^>(?<children>[\s\S]+)<\/ref>$/gi;
  if ((match = R_FIRSTUSE.exec(remain)) === null) {
    console.warn("Firstuse Reference Error " + remain);
    return { type: "firstuse", refname: "", refgroup: "", children: [] };
  }

  children = main(match.groups.children).children;
  refname = trimQuote(refname);
  refgroup = trimQuote(refgroup);

  return { type: "firstuse", refname, refgroup, children };
};

const FootnoteParser = plain => {
  let match,
    remain,
    fnGroup,
    fnName,
    subType,
    children,
    type = "footnote";

  // 1. Extract subType footnote
  const R_FOOTNOTE = /^\{\{(?<subType>[^|]+)\|(?<remain>[\S\s]+)}}$/;
  if ((match = R_FOOTNOTE.exec(plain)) === null) throw "Footnote Error";
  ({ subType, remain } = match.groups);

  // 2. Extract group footnote
  const R_GROUP = /^group=(?<fnGroup>\"[^#\"\'\/=>\?\\]+\"|[^\#\"\'\/=>\?\\ ]+)\|(?<remain>[\s\S]+)$/;
  if ((match = R_GROUP.exec(remain)) !== null) {
    ({ fnGroup, remain } = match.groups);
  }

  // 3. Extract name footnote
  const R_NAME = /^name=(?<fnName>\"[^#\"\'\/=>\?\\]+\"|[^\#\"\'\/=>\?\\ ]+)(\|(?<remain>[\s\S]+))?$/;
  if ((match = R_NAME.exec(remain)) !== null) {
    ({ fnName, remain } = match.groups);
  }

  // 4. Parse real content footnote
  children = remain ? main(remain).children : [];

  // NOTE: numering foonote will be done in analyseReference function
  return { type, subType, fnName, fnGroup, children };
};

const GalleryParser = plain => {
  const R_GALLERY = /<gallery\s*(?<attr>[^>]+)?>(?<content>[\s\S]+)<\/gallery>/gi;
  let match,
    attr,
    content,
    attributes = {};
  if ((match = R_GALLERY.exec(plain)) === null)
    throw "Gallery Syntax Error" + plain;

  ({ attr, content } = match.groups);

  const R_PAIR = /\s*(?<key>\w+)=(?<value>\"[^#\"\'\/=>\?\\]+\"|[^\#\"\'\/=>\?\\ ]+)/g;

  while ((match = R_PAIR.exec(attr)) !== null) {
    let { key, value } = match.groups;
    attributes[key] = trimQuote(value);
  }

  let images = [];
  for (let image of content.split("\n")) {
    if (/^\s*$/g.exec(image)) continue;
    image = /^\s*([\s\S]+)\s*$/g.exec(image)[0];
    images.push(main(`[[${image}]]`).children[0]);
  }
  return { attributes, images };
};

const parsePairPipe = plain => {
  let res = {},
    remain = plain,
    key,
    nextIndex,
    parsedPlain,
    match;

  const R_KEY = /^[\|\s]*(?<key>([\w \n\/]|\-)+)= *(?<remain>[\s\S]*)$/;
  // const R_EMPTY_VALUE = /^[\|\s]*(?<key>[\w \-\/]+)=\s*(?<remain>[\s\S]*)$/;

  while (remain) {
    if ((match = R_KEY.exec(remain)) === null) {
      // if ((match = R_EMPTY_VALUE.exec(remain)) === null) {
      // console.log(remain.replace(/\n/g, "@").replace(/ /g, "%"));
      throw "@Key PairPipe Syntax Error," +
        remain.replace(/\n/g, "@").replace(/ /g, "%");
    }
    // ({ remain } = match.groups);

    // continue;
    // }

    ({ key, remain } = match.groups);
    key = key.trim();
    [nextIndex, , parsedPlain] = parse(remain, null, 0, PairPipe);
    remain = remain.substr(nextIndex);

    let value = parsedPlain;
    match = /^\s*(?<value>[\s\S]+?)[\|\s]*$/.exec(value);
    if (match === null) throw `Value PairPipe Syntax Error ${value}`;
    value = match.groups.value;
    res[key] = value == "|" ? "" : value;
  }

  return res;
};

const MultipleImageParser = plain => {
  const R_MULTIPLE_IMAGES = /^\{\{multiple image\s*\|(?<remain>[\s\S]+)}}$/gi;

  let match = R_MULTIPLE_IMAGES.exec(plain),
    attributes = {},
    images = [];

  if (match === null) throw "MultipleImageParser Error " + plain;

  let { remain } = match.groups;

  let R_KEY_IMAGE = /^\s*(?<imageKey>[a-z\-\_]+)(?<imageID>\d+)\s*$/i;

  let pairs = parsePairPipe(remain);
  for (const key of Object.keys(pairs)) {
    const value = pairs[key];
    if ((match = R_KEY_IMAGE.exec(key)) === null) {
      attributes[key] = value;
      continue;
    }

    let { imageKey, imageID } = match.groups;
    imageID = +imageID - 1;
    if (images[imageID] === undefined) images[imageID] = {};
    if ("image" == imageKey) {
      images[imageID].url = "File:" + value.trim();
    } else if ("caption" == imageKey) {
      images[imageID].caption = main(value).children;
    } else images[imageID][imageKey] = value;
  }

  images = images.map(image => ({
    elementName: "Link",
    type: "media",
    supType: "File",
    url: image.url,
    multipleImage: true,
    options: clean({ ...image, image: null, caption: null, url: null }),
    caption: image.caption || [{ elementName: "Text", text: "" }]
  }));

  return { type: "multipleImages", images, attributes };
};

const InfoboxParser = plain => {
  const R_INFO = /^\{\{Infobox (?<subtype>[^|]+)\s*\|(?<remain>[\s\S]+)}}$/gi;
  let match = R_INFO.exec(plain),
    subtype,
    remain,
    sections = [];
  if (match === null) throw "Infobox Syntax Error" + plain;

  ({ subtype, remain } = match.groups);
  subtype = subtype.trim();

  for (const section of remain.split`----`)
    sections.push(parsePairPipe(section));

  return { type: "Infobox", subtype, sections };
};

const InternalLinkParser = (plain, content) => {
  let match;

  let R_ARTICLE = /^\[\[([^|]+)(\|([^|]+)?)?\]\](\w+)?$/;
  if ((match = R_ARTICLE.exec(plain))) {
    let fullUrl = match[1],
      nonePipe = !match[2],
      trailingPipe = match[2] && !match[3],
      displayText = match[3],
      suffixStr = match[4] || "";

    // console.log({
    //   fullUrl,
    //   nonePipe,
    //   trailingPipe,
    //   displayText,
    //   suffixStr
    // });

    // Manipulate the url
    let namespace, disambiguation, rootUrl, url;

    //
    // ^
    //  ((\w+):)?   namespace?
    //  (
    //      ([\w\-,. ]+)( \((.+)\))  commas has priority over parantheses
    //    |
    //      ([\w\-. ]+)
    //      (
    //          \((.+)\)          trailing parentheses
    //        |
    //          , (.+)            trailing comma
    //      )?
    //  )
    // $

    // let urlMatch = /^(:?(\w+):)?
    // (
    //   ([\w\-,.#\"\(\) ]+)( \((.+)\))
    //   |
    //   ([\w\-.#\"\(\) ]+)( \((.+)\)|, (.+))?
    // )$/.exec(
    //   fullUrl
    // );
    // ([\w\-,.#\"\(\) ]+)( \((.+)\))

    let urlMatch = /^(:?(\w+):)?(([^\(]+)( \((.+)\))|([^,(]+)( \((.+)\)|, (.+))?|([\s\S]*))$/.exec(
      fullUrl
    );

    if (urlMatch === null) {
      // console.log("@");
      return content;
    }
    namespace = capitalize(urlMatch[1] || "");
    rootUrl = urlMatch[4] || urlMatch[7] || urlMatch[11];
    disambiguation = urlMatch[5] || urlMatch[8] || "";

    if ("File:" != namespace) {
      url = namespace + capitalizeFirst(rootUrl) + disambiguation;
      url = url.replace(/ /g, "_"); // convert to valid URL
      displayText = nonePipe ? fullUrl : trailingPipe ? rootUrl : displayText;

      if (suffixStr) {
        displayText += suffixStr;
      }

      displayText = [{ elementName: "Text", text: displayText }];
      return {
        type: "wikiLink",
        url,
        displayText
      };
    }
  }

  // For handling format like:
  // [[File:Gatera de ademuz.jpg|thumb|left|A ''{{lang|es|gatera}}''
  // in [[Rincón de Ademuz]]

  let chunks = plain.slice(2, -2).split("|");
  let first = chunks[0];
  let R_MEDIA = /^(File|Image|Media):(.*)$/i;
  if ((match = R_MEDIA.exec(first))) {
    let type = "media",
      supType = capitalizeFirst(match[1]),
      rootUrl = capitalizeFirst(match[2]),
      url = `${supType}:${rootUrl}`;
    let meta = { type, supType, url },
      options = [],
      caption = [];
    let R_OPTION = /^(border|frame(less)?|thumb(nail)?|((\d+)?x)?\d+px|upright[ =]\d+\.\d+|upright=?|left|right|cent(er|re)|none|baseline|sub|super|top|text-top|middle|bottom|text-bottom|(alt|page|class|lang|link)=.+)$/i,
      R_ATTRIBUTE = /^(alt|page|class|lang|link)=(.*$)/i;

    for (const chunk of chunks.slice(1)) {
      // console.log(chunk);
      if (!R_OPTION.test(chunk)) {
        caption.push(chunk);
        continue;
      }

      let match;
      if ((match = R_ATTRIBUTE.exec(chunk))) {
        options.push({ key: match[1], value: match[2] });
      } else options.push(chunk);
    }

    caption = main(caption.join("|")).children;
    return { ...meta, options, caption };
  }
  // throw new Error("Internal Link Syntax Error" + plain);
  return { children: content };
};

const TemplateParser = plain => {
  if (/^{{convert/i.test(plain)) return ConvertParser(plain);

  if (/^{{multiple image/i.test(plain)) return MultipleImageParser(plain);

  if (/^{{Infobox \w+/i.test(plain)) return InfoboxParser(plain);

  if (/^{{cite/i.test(plain)) return CiteParser(plain);

  if (/^{{(refn|efn|sfn|efn-\w{2})\|/i.test(plain))
    return FootnoteParser(plain);

  if (/^{{lang-\w+\|/i.test(plain)) {
    let text = /\|(.*)}}$/.exec(plain)[1];
    return {
      elementName: "Italic",
      children: [createTextElement(text)]
    };
  }

  if (/^{{IPAc?-\w+\|/gi.test(plain)) {
    let text = /\|(.*)}}$/.exec(plain)[1];
    return createTextElement("[" + text + "]");
  }

  return {
    type: "N/A",
    children: [{ elementName: "Text", text: "N/A" }]
  };
};

const ExternalLinkParer = plain => {
  const R_EXTERNAL = /^\[(?<url>\S+)( (?<displayText>[\s\S]+))?\]$/gi;
  let url,
    displayText,
    match = R_EXTERNAL.exec(plain);

  if (match === null) throw new Error(`ExternalLink Syntax Error`);
  ({ url, displayText } = match.groups);
  return { url, displayText };
};

const HightLightParser = plain => {
  const R = /^<syntaxhighlight(?<meta>[^>]*)>(?<code>[\s\S]*)<\/syntaxhighlight>$/;
  let match;
  if ((match = R.exec(plain)) === null) {
    throw "HightLightParser error:" + plain;
  }
  let { meta, code } = match.groups,
    language = null;
  if ((match = /lang="(?<language>[^"]+)"/.exec(meta)) !== null)
    ({ language } = match.groups);
  // console.log({ meta, code });
  return { language, code };
};

const internalParse = (element, content, plain) => {
  let { elementName } = element;

  if (elementName == "HightLight") return HightLightParser(plain);
  if (elementName == "Reference") return ReferenceParser(plain);

  if (elementName == "Gallery") return GalleryParser(plain);

  if (elementName == "Link") return InternalLinkParser(plain, content);

  if (elementName == "Template") return TemplateParser(plain);

  if (elementName == "ExternalLink") return ExternalLinkParer(plain);

  return { children: content };
};

const parse = (
  str,
  strlen,
  index,
  targetElement,
  opts = { headings: true }
) => {
  let buffer = "",
    has,
    plain = "",
    nextElement,
    content = [],
    options = {},
    referenceIndex = 0,
    images = [],
    headings = [],
    nextPlain,
    hasSelfClose;

  strlen = strlen === null ? str.length : strlen;
  let { elementName, startToken, endToken, allowedChildren } = targetElement;
  index += startToken === null ? 0 : startToken.length;
  plain += startToken === null ? "" : startToken;

  while (index < strlen) {
    hasSelfClose = false;
    has = false;
    for (const matchElement of allowedChildren) {
      if (!tasteStr(str, matchElement.startToken, index)) continue;
      has = true;
      if (buffer) content.push(createTextElement(buffer));
      buffer = "";

      if ((hasSelfClose = matchElement.selfClose)) {
        content.push({ elementName: matchElement.elementName });
        plain += matchElement.startToken;
        index += matchElement.startToken.length;
        break;
      }

      [index, nextElement, nextPlain] = parse(str, strlen, index, matchElement);
      plain += nextPlain;
      content.push(nextElement);

      if (matchElement.elementName == "Reference")
        nextElement.referenceIndex = ++referenceIndex;

      if (/^Heading/.exec(nextElement.elementName) !== null)
        headings.push(nextElement);

      if (
        nextElement.elementName == "Link" &&
        nextElement.type == "media" &&
        nextElement.supType == "File"
      )
        images.push(nextElement);

      if (nextElement.elementName == "Gallery")
        images.push(...nextElement.images);

      break;
    }

    if (hasSelfClose) continue;

    if (!has) {
      if (endToken) {
        let catchEndToken = false;
        for (const eToken of endToken) {
          if (tasteStr(str, eToken, index)) {
            catchEndToken = true;
            index += eToken.length;
            plain += eToken;

            if (targetElement.elementName == "Link") {
              while (index < strlen) {
                let nowiki = "<nowiki />";
                if (tasteStr(str, nowiki, index)) {
                  index += nowiki.length;
                  break;
                } else if (/\w/.test(str[index])) {
                  plain += str[index++];
                } else break;
              }
            }
          } // end tasteStr
        } // end for endToken
        if (catchEndToken) break;
      } // end if endToken

      if (index < strlen) {
        plain += str[index];
        buffer += str[index++];
      }
    } // end not has
  }

  if (buffer) content.push(createTextElement(buffer));

  let wordCount;
  if (targetElement.elementName === "Global") {
    wordCount = content.reduce(
      (acc, curr) =>
        acc + (curr.elementName === "Text" ? curr.text.split` `.length : 0),
      0
    );
  }
  let res = [
    index,
    clean({
      elementName,
      headings: opts.headings ? analyseHeadings(headings) : null,
      wordCount,
      images,
      ...internalParse(targetElement, content, plain, options)
    }),
    plain
  ];

  return res;
};

const main = (str, opts) => (str ? parse(str, null, 0, Global, opts)[1] : "");

export { main, clean, trimQuote };
