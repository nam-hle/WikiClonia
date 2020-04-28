import convert from "convert-units";

// var convert = require("convert-units");
const UNITS = convert().list();
const ABBR_UNITS = convert()
  .list()
  .map(unit => unit.abbr);

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
    return str;
  };

  let tokens = plain.slice(2, -2).split`|`,
    numbers = null,
    fromUnit,
    toUnit = null,
    answer = null;

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

const parsePairPipe = plain => {
  let res = {},
    remain = plain,
    key,
    nextIndex,
    parsedPlain,
    match;

  const R_KEY = /^[\|\s]*(?<key>\w+)\s*=(?<remain>[\s\S]*)$/;

  while (remain) {
    if ((match = R_KEY.exec(remain)) === null)
      throw "PairPipe Syntax Error " + remain;
    ({ key, remain } = match.groups);

    [nextIndex, , parsedPlain] = parse(remain, null, 0, PairPipe);
    remain = remain.substr(nextIndex);

    let value = parsedPlain;
    match = /^\s*(?<value>[\s\S]+?)[\|\s]*$/.exec(value);
    if (match === null) throw `Infobox Syntax Error ${value}`;
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
    if (images[imageID] === undefined) images.push({});
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
    options: [],
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

  for (const section of remain.split`----`) {
    // console.log(section);
    // console.log("--------------");

    let attributes = parsePairPipe(section);

    // clean leading space and trailing "|" and "---"

    // for (const key of Object.keys(attributes)) {
    //   let value = attributes[key];
    //   match = /^(?<content>[\s\S]+?)[\|\s]*$/.exec(value);
    //   if (match === null) throw `Infobox Syntax Error ${value}`;
    //   content = match.groups.content;
    //   attributes[key] = content == "|" ? "" : content;
    // }
    sections.push(attributes);
  }

  return { type: "Infobox", subtype, sections };
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
    } else if (/^{{Infobox \w+/gi.test(plain)) {
      return InfoboxParser(plain);
    }

    return {
      type: "N/A",
      // children: [{ elementName: "Text", text: `<--N/A--${plain}-->` }]
      children: [{ elementName: "Text", text: "N/A" }]
    };
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
  }
  return { children: content };
};

const Comment = {
    elementName: "Comment",
    startToken: "<!--",
    endToken: ["-->"],
    allowedChildren: []
  },
  Break = {
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
  PairPipe = {
    elementName: "PairPipe",
    startToken: null,
    endToken: ["|"],
    allowedChildren: []
  },
  Global = {
    elementName: "Global",
    startToken: null,
    endToken: null,
    allowedChildren: [
      Comment,
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
PairPipe.allowedChildren = Global.allowedChildren;

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

const parse = (str, strlen, index, e, opts = { headings: true }) => {
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

  // console.log(opts.headings);
  let res = [
    index,
    clean({
      elementName,
      headings: opts.headings ? analyseHeadings(headings) : null,
      images,
      ...internalParse(e, content, plain, options)
    }),
    plain
  ];

  // if (elementName == "Gallery")
  //   console.dir({ parsed: JSON.stringify(res[1]), plain });

  return res;
};

const main = (str, opts) => (str ? parse(str, null, 0, Global, opts)[1] : "");

export { main, clean, trimQuote };

// console.log(
//   JSON.stringify(
//     main(
//       "[[File:Doggy door exit.JPG|thumb|A dog exiting through a pet door]]\nA '''pet door''' or '''pet flap''' (also referred to in more specific terms, such as '''cat flap''', '''cat door''', '''dog door''', or '''doggy door''') is a small opening to allow [[pet]]s to enter and exit a building on their own without needing a human to open the door.  Originally simple holes, the modern form is a hinged and often spring-loaded panel or flexible flap, and some are electronically controlled.  They offer a degree of protection against wind, rain, and larger-bodied intruders entering the dwelling. Similar hatches can let dogs through fences at stiles. A related concept is the '''pet gate''', which is easy for humans to open but acts as a secure pet barrier, as well as the '''automated left- or right-handed pet doors'''.<ref>{{Cite web|url=http://www.gizmag.com/passive-house-petwalk-door/31162/|title=World's first Passive House-certified pet door unveiled at Ecobuild 2014|website=www.gizmag.com|access-date=2016-07-07}}</ref>\n\n==Purpose==\nA pet door is found to be convenient by many owners of companion animals, especially dogs and cats, because it lets the pets come and go as they please, reducing the need for pet-owners to let or take the pet outside manually, and curtailing unwanted behaviour such as loud vocalisation to be let outside, scratching on doors or walls, and (especially in the case of dogs) [[Excretion|excreting]] in the house. They also help to ensure that a pet left outdoors can safely get back into the house in the case of inclement weather.\n\n==Features==\n[[File:Cat flap.jpg|thumb|A cat flap in action]]\nThe simplest type are bottom-weighted flaps hung from the top of the opening, which swing shut on their own, but may be spring-aided to increase wind resistance. These flaps often feature magnets around the edges to help keep the door closed against weather and wind. Some pet doors have side-mounted hinges and swing open like saloon doors. These pet doors usually have a spring or other contrivance to force their closure after the pet has gone through. Instead of a rubber flap, saloon style doors are often made from plastic, acrylic, or plexiglass, and the panels are fitted with weather seal to help keep weather outside.\n\nAnother common feature is an adjustable catch to restrict the opening of the device to either one direction or the other; for example, to allow the pet to come in for the night, but not go out again until the owner releases the catch the next morning. Some pets, mostly cats with their retractile claws and flexible paws, learn to circumvent one-way pet doors, especially the \"flap-within-flap\" design.\n\nMost also have a locking mechanism of some kind, and can be closed off by sliding a rigid plate into parallel rails on the left and right of the interior side of the pet door, useful during bad weather or when the owners are traveling with their pets.\n\nPet doors are generally designed to be safe for any pet.  The panels are often designed with soft [[Polyvinyl chloride|vinyl]] that does not trap or injure the animal. Cheap, easily replaceable pet doors are made from plastic and may not always be robust enough for large, boisterous pets.\n\nPet doors are most often fitted in a plywood or plastic paneled door, into which it is straightforward to cut a large round hole, but can also be fitted in brickwork or (if a sealed unit is obtained with the hole already provided) in a double glazed door.  The latter is a relatively expensive option but may be the only alternative in some cases. Removable pet doors suitable for [[sliding glass door]]s are also available.\n\nInnovation has contributed to a new generation of more expensive pet doors making use of specific materials, automation, time control devices, and/or sophisticated sensors to deal with common problems like poor insulation and drafts, higher noise levels, insufficient pet safety and access difficulties.<ref>{{Cite web|url=http://www.trendhunter.com/trends/pet-door|title=Automated Pet Doors : pet door|access-date=2016-07-07}}</ref><ref>{{Cite web|url=http://www.ubergizmo.com/2014/03/petwalk-automatic-pet-door-prevents-wet-paw-marks-around-the-home/|title=PetWALK Automatic Pet Door Prevents Wet Paw Marks Around The Home|date=2014-03-13|website=Ubergizmo|language=en-US|access-date=2016-07-07}}</ref>\n\n==History==\nThe ''[[Oxford English Dictionary]]'' records the first use of the phrase \"cat flap\" in 1957 and \"cat door\" in 1959,<ref>''Oxford English Dictionary'' (full ed.), 2005.</ref> but the idea is much older.\n\n[[File:Gatera de ademuz.jpg|thumb|left|A ''{{lang|es|gatera}}'' (farm cat hole) in [[Rincón de Ademuz]], Valencia, Spain]]\nIn rural areas, cat doors (often simple holes) in the walls, doors or even roofs of grain and flour storage spaces have long been used to welcome [[feral cat]]s to hunt rodent pests that feed on these stores. Human semi-domestication of [[wildcat]]s dates back to at least 7,500 BC in [[Cyprus]],<ref name=\"NatGeo 2004\">{{cite web\n |title=Oldest Known Pet Cat? 9500-year-old Burial Found on Cyprus\n |url= http://news.nationalgeographic.com/news/2004/04/0408_040408_oldestpetcat.html\n |accessdate=March 6, 2007\n |date=April 8, 2004\n |work=National Geographic News\n |publisher=National Geographic Society\n}}</ref> and the domestic cat was a part of everyday life in grain-dependent [[ancient Egypt]] (ca. 6,000 BC onward).  In modern times, this function is mostly lost, but in some rural areas, such as [[Valencia, Spain|Valencia]], Spain, and [[Vaunage]], France, farm cat doors and holes ({{lang-es|gateras}}, {{lang-fr|chatières}}) are still common.\n\nThe 14th-century [[English literature|English]] writer [[Geoffrey Chaucer]] described a simple cat hole in the \"Miller's Tale\" from his ''[[Canterbury Tales]]'' (late 14th century). In the narrative, a servant whose knocks go unanswered uses the cat door to peek in:<blockquote>{{lang|enm|An hole he foond, ful lowe upon a bord<br />Ther as the cat was wont in for to crepe,<br />And at the hole he looked in ful depe,<br />And at the last he hadde of hym a sighte.}}</blockquote>\n\nIn an apparent [[Early modern period|early modern]] example of [[urban legend]], the invention of the pet door was attributed to [[Isaac Newton]] (1642&ndash;1727) in a story (authored anonymously and published in a column of anecdotes in 1893) to the effect that Newton foolishly made a large hole for his adult cat and a small one for her kittens, not realizing the kittens could use the large hole as well.<ref>{{Cite web\n |title=Random Readings: Philosophy and Common Sense\n |author=Anonymous (\"The Country Parson\")<!--Not to be confused with Frank A. Clark who used that name in the 1960s!-->\n |editor=E. H. Sears & Rufus Ellis\n |work=The Monthly Religious Magazine\n |year=1863\n |volume=29-30\n |page=298\n |publisher=Leonard C. Bowles Press\n |location=Boston, MA\n |url= https://books.google.com/books?id=PXYUAAAAYAAJ&pg=PA298\n}}</ref> Two Newton biographers cite passages saying that Newton kept \"neither cat nor dog in his chamber\".<ref>Brodetsky, S. (2007) [first pub. 1927]. ''Sir Isaac Newton''. Upton Press. p. 100. {{ISBN|1406769991}}.</ref><ref>More, Louis Trenchard (1937). ''Isaac Newton: a Biography''. C. Scribner's Sons.</ref> Yet over 60 years earlier, a member of Newton's alma mater Trinity College, one J. M. F. Wright, reported this same story (from an unknown source) in his 1827 memoir, adding: \"Whether this account be true or false, indisputably true is it that there are in the door to this day two plugged holes of the proper dimensions for the respective egresses of cat and kitten.\"<ref>Wright, J. F. M. (1827). ''Alma Mater''. Volume 1. p. 17.</ref>\n\nModern cat flaps are popular in some countries, even in urban environments, particularly the [[United Kingdom]] where it is estimated that about 74% of cats have access to the outdoors.<ref>{{cite web|url=http://www.petplan.co.uk/petcensus/censusinfo.pdf |title=Petplan Pet Census 2011 |publisher=Petplan |page=15 |accessdate=September 11, 2012}}</ref>\n\nDog doors are common in suburban North America, where they mostly lead to fenced-in yards.  Pet doors are also common between suburban homes and their attached garages, so that pet-related mess (cat box, dog food, etc.) can be kept in the garage with pets having free access.\n\n==Electronic pet doors==\n[[File:Wall mounted catflap.jpg|thumb|200px|A [[Integrated circuit|microchip]]-enabled, selective-access cat and small dog door running through a wall]]\nSeveral types of pet doors that allow selective access are available. The advantages of this type of pet door over simpler models are improved weather resistance, and home security against strays and other unwanted animals. Some use a [[permanent magnet]] mounted on the pet's collar to activate a matching [[electromagnet]]ic mechanism that unlatches the door panel when the magnet comes within range; several pets can be fitted with collars that match the same door. Pet doors with [[Consumer IR|infrared]] locks open only when a collar-mounted device transmits the correct code to the latch's receiver, allowing owners to have multiple flaps that different pets can use, e.g. a small cat flap to the back yard and a large dog door accessing a [[dog run]].  Either type can be used to selectively allow one pet outside access, while denying it to another (e.g., an ill animal that needs to stay indoors).\n\nSome of the newest models use [[radio-frequency identification]] to electronically read a pet's [[Microchip implant (animal)|microchip implant]]. This removes the need for a cat to wear a collar, which could become lost. Other high-end doors use a key with RFID. The key is attached to the pet's collar, and the electric door only opens for the assigned keys.\n\n==Dog stiles==\n[[File:Dog door demonstration - geograph.org.uk - 718920.jpg|thumb|left|A man lets a dog through the lift-up hatch at a stile in [[Medway]], [[England]].|247x247px]]\nIn [[England]], [[Ireland]], and other areas with large numbers of livestock fences and walls in areas through which people walk on footpaths, [[stile]]s often have wooden, lift-up dog hatchways next to them, because dogs are not good at climbing stile steps and are often too heavy to lift over a fence.\n\n==Pet gates==\nA related idea to the pet door is the pet gate, an easily human-operated portal that keeps pets in (or out) and thwarts their attempts to open it by using a thumb-operated switch or a smooth door handle, and which is tall enough that it cannot be jumped over by the type of pet for which it was designed. Styles vary, but they are typically made of wooden or metal bars or a wire lattice, and have adjustable widths so that they can be used to span arbitrary entrances, hallways or windows. Common uses are to keep pets inside while ventilating a room by opening an unscreened door, or keeping pets out of a baby's room or a dining area.{{clear|left}}\n\n==Pet barriers==\nPet barriers are typically made of fabric and are especially used to secure staircases.<ref>{{cite web|last1=Woods|first1=Amanda|title=7 Important Measures to Pet Proof Your Home|url=https://medium.com/@woodsamanda399/7-important-measures-to-pet-proof-your-home-bdd3e33ae4c8|accessdate=23 August 2017}}</ref> They are available in banister-to-banister and wall-to-banister options and are customizable and portable.\n\n== References ==\n{{reflist}}\n\n{{Commons category|Pet doors}}\n\n[[Category:Door furniture]]\n[[Category:Pet equipment]]",
//       { headings: false }
//     )
//   )
// );
// main("==abc== test", true);
