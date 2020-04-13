const taste = (s, t, i) => s[i] == t[0] && s.substr(i, t.length) == t;

const capitalizeFirst = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const trimAll = string => /^\s*(.*)\s*$/g.exec(string)[1];

const clean = obj => {
  let res = {};
  for (const key in obj) {
    let value = obj[key];
    if (
      value === null ||
      value === undefined ||
      (Object.keys(value).length === 0 && value.constructor === Object)
    )
      continue;
    res[key] = value;
  }
  return res;
};
// let debug = false;

const CiteParser = plain => {
  let R_CITE = /\{\{cite (?<subType>\w+)\s*\|(?<attributes>[\S\s]*)}}$/gi;

  let { subType, attributes } = R_CITE.exec(plain).groups,
    attribute = {};

  for (const pair of attributes.split("|")) {
    let equalIndex = pair.indexOf("=");
    let [key, value] = [
      pair.slice(0, equalIndex),
      trimAll(pair.slice(equalIndex + 1))
    ];
    attribute[key] = value;
  }
  return [{ type: "cite", subType, attribute }, null];
};

const ReferenceParser = plain => {
  let match = /^<ref[^>]*>(?<children>[\s\S]*)<\/ref>$/gi.exec(plain);
  let children;
  if (match && match[1]) {
    children = match[1];
    return [null, main(children).children];
  }
  // console.log(plain);
  return [null, [{ elementName: "text", text: plain }]];
};

const internalParse = (element, content, plain) => {
  if (element.elementName == "Reference") {
    return ReferenceParser(plain);
  } else if (element.elementName == "Template") {
    if (/^{{[Cc]ite/g.test(plain)) {
      return CiteParser(plain);
    }
    // console.log("@@");
    // return [null, [...content]]
    return [null, [{ elementName: "Text", text: "{{Temp}}" }]];
  } else if (element.elementName == "Link") {
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
      // console.log("Will parse ", plain);
      let fullUrl = match[1],
        nonePipe = !match[2],
        trailingPipe = match[2] && !match[3],
        displayText = match[3],
        suffixStr = match[4] || "";

      // if ("[[Bokmål]]" == plain)
      //   console.log({
      //     fullUrl,
      //     nonePipe,
      //     trailingPipe,
      //     displayText,
      //     suffixStr
      //   });

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

      let urlMatch = /^((\w+):)?(([\w\-,. ]+)( \((.+)\))|([\w\-. ]+)( \((.+)\)|, (.+))?)$/.exec(
        fullUrl
      );

      if (urlMatch === null) return content;
      namespace = capitalize(urlMatch[1] || "");
      rootUrl = urlMatch[4] || urlMatch[7];
      disambiguation = urlMatch[5] || urlMatch[8] || "";

      if ("File:" != namespace) {
        url = namespace + capitalizeFirst(rootUrl) + disambiguation;
        url = url.replace(/ /g, "_"); // convert to valid URL

        displayText = nonePipe ? fullUrl : trailingPipe ? rootUrl : displayText;
        displayText += suffixStr;

        return [
          {
            type: "wikiLink",
            url,
            displayText
          },
          null
        ];
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
        caption = "";
      let R_OPTION = /^(border|frame(less)?|thumb(nail)?|((\d+)?x)?\d+px|upright[ =]\d+\.\d+|upright=?|left|right|cent(er|re)|none|baseline|sub|super|top|text-top|middle|bottom|text-bottom|(alt|page|class|lang|link)=.+)$/i,
        R_ATTRIBUTE = /^(alt|page|class|lang|link)=(.*$)/i;

      for (const chunk of chunks.slice(1)) {
        if (!R_OPTION.test(chunk)) {
          caption += chunk;
          continue;
        }
        let match;
        if ((match = R_ATTRIBUTE.exec(chunk))) {
          options.push({ key: match[1], value: match[2] });
        } else options.push(chunk);
      }
      caption = main(caption).children;
      meta = { ...meta, options, caption };
      return [meta, null];
    }

    return [null, content];
  }
  return [null, [...content]];
};

const BoldItalic = {
    elementName: "BoldItalic",
    startToken: "'''''",
    endToken: ["'''''"],
    allowElements: []
  },
  Bold = {
    elementName: "Bold",
    startToken: "'''",
    endToken: ["'''"],
    allowElements: []
  },
  Italic = {
    elementName: "Italic",
    startToken: "''",
    endToken: ["''"],
    allowElements: []
  },
  Obj = {
    elementName: "Link",
    startToken: "[[",
    endToken: ["]]"],
    allowElements: [Bold, Italic]
  },
  Heading1 = {
    elementName: "Heading1",
    startToken: "==",
    endToken: ["=="],
    allowElements: []
  },
  Heading2 = {
    elementName: "Heading2",
    startToken: "===",
    endToken: ["==="],
    allowElements: []
  },
  Heading3 = {
    elementName: "Heading3",
    startToken: "====",
    endToken: ["===="],
    allowElements: []
  },
  Heading4 = {
    elementName: "Heading4",
    startToken: "=====",
    endToken: ["====="],
    allowElements: []
  },
  Heading5 = {
    elementName: "Heading5",
    startToken: "======",
    endToken: ["======"],
    allowElements: []
  },
  Heading6 = {
    elementName: "Heading6",
    startToken: "=======",
    endToken: ["======="],
    allowElements: []
  },
  Reference = {
    elementName: "Reference",
    startToken: "<ref",
    endToken: ["</ref>", "/>"],
    allowElements: []
  },
  Template = {
    elementName: "Template",
    startToken: "{{",
    endToken: ["}}"],
    allowElements: []
  },
  BlockQuote = {
    elementName: "Block Quote",
    startToken: "<blockquote>",
    endToken: ["</blockquote>"],
    allowElements: [Italic, Bold, BoldItalic]
  },
  Global = {
    elementName: "Global",
    startToken: null,
    endToken: null,
    allowElements: [
      Bold,
      Italic,
      Obj,
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

Obj.allowElements.push(Obj);
Italic.allowElements.push(Obj);
Reference.allowElements.push(Template);
Template.allowElements.push(Reference, Obj);

const analyseHeadings = headings => {
  let getLevel = heading => +/^Heading(\d)$/.exec(heading.elementName)[1];
  let currentLevel = 0,
    res = {},
    currentHeading = res;
  for (const heading of headings) {
    let level = getLevel(heading);
    if (level > currentLevel) {
      if (!currentHeading.childrenHeadings)
        currentHeading.childrenHeadings = [];
      heading.parentHeading = currentHeading;
      currentHeading.childrenHeadings.push(heading);
    } else if (level == currentLevel) {
      let parent = currentHeading.parentHeading;
      parent.childrenHeadings.push(heading);
      heading.parentHeading = parent;
    } else {
      let grandParent = currentHeading.parentHeading.parentHeading;
      grandParent.childrenHeadings.push(heading);
      heading.parentHeading = grandParent;
    }
    currentHeading = heading;
    currentLevel = level;
  }
  return res;
};

const parse = (s, l, i, e) => {
  console.log(s.substr(i, 20), e.elementName);
  let buffer = "",
    plain = "",
    cur,
    res = [],
    options = {},
    referenceIndex = 0,
    headings = [];

  l = l === null ? s.length : l;
  let { elementName, startToken, endToken, allowElements } = e;
  i += startToken === null ? 0 : startToken.length;
  plain += startToken === null ? "" : startToken;
  while (i < l) {
    let has = false;
    for (let j = 0; j < allowElements.length; j++) {
      let element = allowElements[j];
      if (taste(s, element.startToken, i)) {
        if (buffer) res.push({ elementName: "Text", text: buffer });
        buffer = "";
        has = true;
        let curPlain;
        [i, cur, curPlain] = parse(s, l, i, element);
        plain += curPlain;
        if (element.elementName == "Reference") {
          cur.referenceIndex = ++referenceIndex;
        }
        if (/^Heading/.exec(cur.elementName) !== null) {
          console.log(cur);
          headings.push(cur);
        }
        res.push(cur);
        break;
      }
    }
    if (!has) {
      if (endToken) {
        let catchEndToken = false;
        for (const eToken of endToken) {
          if (taste(s, eToken, i)) {
            catchEndToken = true;
            i += eToken.length;
            plain += eToken;

            // perform get suffix string when parsing Link
            if (elementName == "Link") {
              while (i < l) {
                let nowiki = "<nowiki />";
                if (taste(s, nowiki, i)) {
                  i += nowiki.length;
                  break;
                } else if (/\w/.test(s[i])) {
                  plain += s[i++];
                } else break;
              }
            }
          } // end taste
        } // end for endToken
        if (catchEndToken) break;
      } // end if endToken
      plain += s[i];
      buffer += s[i++];
    } // end not has
  }
  if (buffer) res.push({ elementName: "Text", text: buffer });
  let [meta, children] = internalParse(e, res, plain, options);

  headings = headings.length ? analyseHeadings(headings) : {};

  return [i, clean({ elementName, children, headings, ...meta }), plain];
};

export const main = s => parse(s, null, 0, Global)[1];
