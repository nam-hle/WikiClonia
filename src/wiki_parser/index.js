import convert from "convert-units";
// var convert = require("convert-units");
const UNITS = convert().list();
console.log(UNITS);
const ABBR_UNITS = convert()
  .list()
  .map(unit => unit.abbr);

console.log(ABBR_UNITS.indexOf("mi"));

const taste = (s, t, i) => s[i] == t[0] && s.substr(i, t.length) == t;

const capitalizeFirst = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const trimQuote = str =>
  str && '"' == str[0] && '"' == str[str.length - 1]
    ? str.slice(1, str.length - 1)
    : str;

const clean = obj => {
  let res = {};
  for (const key in obj) {
    let value = obj[key];
    if (
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0) ||
      (Object.keys(value).length === 0 && value.constructor === Object)
    )
      continue;
    res[key] = value;
  }
  return res;
};

const CiteParser = plain => {
  let R_CITE = /\{\{cite (?<subType>\w+)\s*\|?(?<attributes>[\S\s]*)}}$/gi;

  let { subType, attributes } = R_CITE.exec(plain).groups,
    attribute = {};

  for (const pair of attributes.split("|")) {
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
    return null;
  };

  let tokens = plain.slice(2, -2).split`|`,
    numbers = null,
    fromUnit,
    toUnit = null,
    answer = null;

  tokens.shift();
  if (/^\-?\d+(\.\d*)?$/g.test(tokens[0])) numbers = tokens.shift();

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
      answer = convert(+numbers)
        .from(fromUnit)
        .to(toUnit);
    }
  }

  answer = answer ? answer.toFixed(2) : null;
  if (fromUnit && toUnit && answer !== null) {
    return {
      elementName: "Text",
      text: `${numbers} ${fromUnit} (${answer} ${toUnit})`
    };
  }

  console.warn("Pares Error: ", { plain, numbers, fromUnit, toUnit, answer });
  return { elementName: "Text", text: plain };
};

const ReferenceParser = plain => {
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
  const R_FIRSTUSE = /^>(?<children>[\s\S]+)<\/ref>$/gi;
  if ((match = R_FIRSTUSE.exec(remain)) === null) {
    throw "Firstuse Reference Error " + remain;
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
  const R_GALLERY = /\<gallery\s+(?<attr>[^>]+)?>(?<content>[\s\S]+)<\/gallery>/gi;
  let match,
    attr,
    content,
    attributes = {};
  if ((match = R_GALLERY.exec(plain)) === null) throw "Gallery Syntax Error";

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

const MultipleImageParser = plain => {
  const R_MULTIPLE_IMAGES = /^\{\{multiple image\s*\|(?<remain>[\s\S]+)}}$/gi;

  let match = R_MULTIPLE_IMAGES.exec(plain),
    key,
    value,
    attributes = {},
    images = [];

  if (match === null) throw "MultipleImageParser Error " + plain;

  let { remain } = match.groups;

  let R_PAIR = /^(?<key>\w+)\s*=\s*(?<value>[\s\S]*?)(?=\|\s*\w+\s*=|$)(\|\s*)?(?<remain>[\s\S]*)/i;
  let R_KEY_IMAGE = /^\s*(?<imageKey>[a-z\-\_]+)(?<imageID>\d+)\s*$/i;

  while (remain) {
    if ((match = R_PAIR.exec(remain)) === null) break;
    ({ key, value, remain } = match.groups);
    value = value.trim();

    if ((match = R_KEY_IMAGE.exec(key)) === null) {
      attributes[key] = value;
    } else {
      let { imageKey, imageID } = match.groups;
      imageID = +imageID - 1;

      if (images[imageID] === undefined) images.push({});
      if ("image" == imageKey) {
        images[imageID].url = "File:" + value.trim();
      } else if ("caption" == imageKey) {
        images[imageID].caption = main(value).children;
      } else images[imageID][imageKey] = value;
    }
  }

  images = images.map(image => {
    let res = {
      elementName: "Link",
      type: "media",
      supType: "File",
      url: image.url,
      options: [],
      caption: image.caption || [{ elementName: "Text", text: "" }]
    };
    return res;
  });

  return { type: "multipleImages", images, attributes };
};

const internalParse = (element, content, plain) => {
  if (element.elementName == "Reference") {
    return ReferenceParser(plain);
  }

  if (element.elementName == "Gallery") return GalleryParser(plain);

  if (element.elementName == "ExternalLink") {
    const R_EXTERNAL = /^\[(?<url>\S+)( (?<displayText>[\s\S]+))?\]$/gi;
    let match, url, displayText;
    if ((match = R_EXTERNAL.exec(plain)) !== null) {
      ({ url, displayText } = match.groups);
      return { url, displayText };
    } else {
      throw "ExternalLink Grammar Error";
    }
  }

  if (element.elementName == "Template") {
    if (/^{{[Cc]ite/g.test(plain)) {
      return CiteParser(plain);
    } else if (/^{{(refn|efn|efn-(la|ua|lr|ur|lg))\|/.test(plain)) {
      return FootnoteParser(plain);
    } else if (/^{{lang-\w+\|/gi.test(plain)) {
      let text = /\|(.*)}}$/.exec(plain)[1];
      return {
        elementName: "Italic",
        children: [
          {
            elementName: "Text",
            text
          }
        ]
      };
    } else if (/^{{IPA-\w+\|/gi.test(plain)) {
      let text = /\|(.*)}}$/.exec(plain)[1];
      return {
        elementName: "Text",
        text: "[" + text + "]"
      };
    } else if (/^{{convert/gi.test(plain)) {
      return ConvertParser(plain);
    } else if (/^{{multiple image/gi.test(plain)) {
      return MultipleImageParser(plain);
    }

    return { children: [{ elementName: "Text", text: `{{N/A: ${plain}}}` }] };
  }

  if (element.elementName == "Link") {
    // console.log({ plain });
    let match;
    /********************************
     *          FREE LINK
     *******************************/

    /*
    /* ^
    /*  \[\[            startTokent
    /*  ([^|]+)         fullUrl
    /*  (\|([^|]+)?)?   optinal (pipe and optinal display text)
    /*  \]\]            endToken
    /*  (\w+)?          suffixStr
    /* $
    */

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
        console.log("@");
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
  }
  return { children: content };
};

const Break = {
    elementName: "Break",
    startToken: "<br />",
    endToken: [],
    allowedChildren: [],
    selfClose: true
  },
  BoldItalic = {
    elementName: "BoldItalic",
    startToken: "'''''",
    endToken: ["'''''"],
    allowedChildren: []
  },
  Bold = {
    elementName: "Bold",
    startToken: "'''",
    endToken: ["'''"],
    allowedChildren: []
  },
  Italic = {
    elementName: "Italic",
    startToken: "''",
    endToken: ["''"],
    allowedChildren: []
  },
  Gallery = {
    elementName: "Gallery",
    startToken: "<gallery",
    endToken: ["</gallery>"],
    allowedChildren: []
  },
  Link = {
    elementName: "Link",
    startToken: "[[",
    endToken: ["]]"],
    allowedChildren: [Bold, Italic]
  },
  ExternalLink = {
    elementName: "ExternalLink",
    startToken: "[",
    endToken: ["]"],
    allowedChildren: []
  },
  Heading1 = {
    elementName: "Heading1",
    startToken: "==",
    endToken: ["=="],
    allowedChildren: []
  },
  Heading2 = {
    elementName: "Heading2",
    startToken: "===",
    endToken: ["==="],
    allowedChildren: []
  },
  Heading3 = {
    elementName: "Heading3",
    startToken: "====",
    endToken: ["===="],
    allowedChildren: []
  },
  Heading4 = {
    elementName: "Heading4",
    startToken: "=====",
    endToken: ["====="],
    allowedChildren: []
  },
  Heading5 = {
    elementName: "Heading5",
    startToken: "======",
    endToken: ["======"],
    allowedChildren: []
  },
  Heading6 = {
    elementName: "Heading6",
    startToken: "=======",
    endToken: ["======="],
    allowedChildren: []
  },
  Reference = {
    elementName: "Reference",
    startToken: "<ref",
    endToken: ["</ref>", "/>"],
    allowedChildren: []
  },
  Template = {
    elementName: "Template",
    startToken: "{{",
    endToken: ["}}"],
    allowedChildren: []
  },
  BlockQuote = {
    elementName: "Block Quote",
    startToken: "<blockquote>",
    endToken: ["</blockquote>"],
    allowedChildren: [Italic, Bold, BoldItalic]
  },
  Global = {
    elementName: "Global",
    startToken: null,
    endToken: null,
    allowedChildren: [
      Gallery,
      Break,
      BoldItalic,
      Bold,
      Italic,
      Link,
      ExternalLink,
      Heading6,
      Heading5,
      Heading4,
      Heading3,
      Heading2,
      Heading1,
      Reference,
      BlockQuote,
      Template
    ]
  };

Link.allowedChildren.push(Link);
Italic.allowedChildren.push(Link);
Reference.allowedChildren.push(Break, Template);
Template.allowedChildren.push(Template, Reference, Link);

const analyseHeadings = headings => {
  if (!headings.length) return null;
  let getLevel = heading => +/^Heading(\d)$/.exec(heading.elementName)[1];
  let currentLevel = 0,
    res = {},
    currentHeading = res;

  res.indices = [];

  for (const heading of headings) {
    let level = getLevel(heading),
      headingText = heading.children[0].text.trim(),
      headingId = headingText.replace(/\s/, "") + "_" + level;

    // add metadata
    heading.level = level;
    heading.text = headingText;
    heading.id = headingId;
    heading.className = "wiki-heading-" + level;
    heading.indices = currentHeading.indices.slice();

    // connect heading to heading tree
    if (level > currentLevel) {
      heading.indices.push(1);

      if (!currentHeading.childrenHeadings)
        currentHeading.childrenHeadings = [];
      heading.parentHeading = currentHeading;
      currentHeading.childrenHeadings.push(heading);
    } else if (level == currentLevel) {
      heading.indices[heading.indices.length - 1]++;

      let parent = currentHeading.parentHeading;
      parent.childrenHeadings.push(heading);
      heading.parentHeading = parent;
    } else {
      heading.indices = heading.indices.slice(0, level);
      heading.indices[heading.indices.length - 1]++;

      let grandParent = currentHeading.parentHeading.parentHeading;
      grandParent.childrenHeadings.push(heading);
      heading.parentHeading = grandParent;
    }
    currentHeading = heading;
    currentLevel = level;
  }
  return res;
};

const parse = (str, strlen, index, e) => {
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
  let { elementName, startToken, endToken, allowedChildren } = e;
  index += startToken === null ? 0 : startToken.length;
  plain += startToken === null ? "" : startToken;

  while (index < strlen) {
    // console.log(index);
    hasSelfClose = false;
    has = false;
    for (const matchElement of allowedChildren) {
      if (!taste(str, matchElement.startToken, index)) continue;
      has = true;
      if (buffer) content.push({ elementName: "Text", text: buffer });
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

      if (matchElement.elementName == "Reference") {
        nextElement.referenceIndex = ++referenceIndex;
      }
      if (/^Heading/.exec(nextElement.elementName) !== null) {
        headings.push(nextElement);
      }

      if (
        nextElement.elementName == "Link" &&
        nextElement.type == "media" &&
        nextElement.supType == "File"
      ) {
        images.push(nextElement);
      }

      if (nextElement.elementName == "Gallery") {
        images.push(...nextElement.images);
      }

      break;
    }

    if (hasSelfClose) continue;

    if (!has) {
      if (endToken) {
        let catchEndToken = false;
        for (const eToken of endToken) {
          if (taste(str, eToken, index)) {
            catchEndToken = true;
            index += eToken.length;
            plain += eToken;

            if (e.elementName == "Link") {
              while (index < strlen) {
                let nowiki = "<nowiki />";
                if (taste(str, nowiki, index)) {
                  index += nowiki.length;
                  break;
                } else if (/\w/.test(str[index])) {
                  plain += str[index++];
                } else break;
              }
            }
          } // end taste
        } // end for endToken
        if (catchEndToken) break;
      } // end if endToken

      if (index < strlen) {
        plain += str[index];
        buffer += str[index++];
      }
    } // end not has
  }

  if (buffer) content.push({ elementName: "Text", text: buffer });

  return [
    index,
    clean({
      elementName,
      headings: analyseHeadings(headings),
      images,
      ...internalParse(e, content, plain, options)
    }),
    plain
  ];
};

const main = str => parse(str, null, 0, Global)[1];

export { main, clean, trimQuote };

// console.log(JSON.stringify(main(`{{convert|2|km|mi}}`), null, 2));

// let s = `{{multiple image |header = Religious affiliations in New York City | align = center | direction = horizontal | image1 = StPatCathExt1.jpg | width1 = 103 | caption1 = The [[New York City Landmarks|landmark]] [[Gothic revival architecture|Neo-Gothic]] Roman Catholic [[St. Patrick's Cathedral (Manhattan)|St. Patrick's Cathedral]], Midtown Manhattan | alt1 = | image2 = Jueus ultraortodoxes satmar a brooklyn.jpg | width2 = 200 | caption2 = [[Haredi Jews|Ultra-Orthodox]] [[Jews in New York City|Jewish]] residents in Brooklyn. Brooklyn has the largest Jewish community in the United States, with approximately 600,000 individuals.<ref name=BrooklynJewish/> | alt2 = | image3 = Islamic Cultural Center E96 jeh.JPG | width3 = 131 | caption3 = The [[Islamic Cultural Center of New York]] in [[Upper Manhattan]], the first mosque built in New York City. | alt3 = | image4 = Exterior Hindu Temple.JPG | width4 = 100 | caption4 = [[Hindu Temple Society of North America|Ganesh Temple]] in [[Flushing, Queens]], the oldest [[Hindu temple]] in the U.S. | alt4 = | image5 = Buddhist Temple, Chinatown.jpg | width5 = 112 | caption5 = [[New York Mahayana Temple|Mahayana Buddhist Temple]] in [[Chinatown, Manhattan]] | alt5 = | image6 = Times Square after dark atheist.jpg | width6 = 200 | caption6 = A significant proportion of New Yorkers hold [[American Atheists|atheistic]] views, promoted on this [[digital billboard|electronic billboard]] in [[Times Square]]. | alt6 = }}`;

// const R = /\{\{multiple image\s*(\|\s*(\w+)\s*=([\s\S]*?))+\}\}$/gi;
// for (const match of s.matchAll(R)) {
//   console.log(match[0]);
//   console.log();
//   console.log();
//   console.log();
// }
