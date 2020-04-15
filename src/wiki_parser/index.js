const taste = (s, t, i) => s[i] == t[0] && s.substr(i, t.length) == t;

const capitalizeFirst = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const trimAll = string => /^\s*([\s\S]+)\s*$/g.exec(string)[1];

const trimQuote = str =>
  '"' == str[0] && '"' == str[str.length - 1]
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

//
// const toUperRoman = number => {
//   const romanNumList = {
//     M: 1000,
//     CM: 900,
//     D: 500,
//     CD: 400,
//     C: 100,
//     XC: 90,
//     L: 50,
//     XV: 40,
//     X: 10,
//     IX: 9,
//     V: 5,
//     IV: 4,
//     I: 1
//   };
//   let roman = "",
//     a;
//   if (number < 1 || number > 3999) throw "Enter a number between 1 and 3999";

//   for (let key in romanNumList) {
//     a = Math.floor(number / romanNumList[key]);
//     if (a >= 0) for (let i = 0; i < a; i++) roman += key;
//     number = number % romanNumList[key];
//   }
//   return roman;
// };

// const toLowerRoman = num => toUperRoman(num).toLowerCase();

const CiteParser = plain => {
  let R_CITE = /\{\{cite (?<subType>\w+)\s*\|(?<attributes>[\S\s]*)}}$/gi;

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
  return [{ type: "cite", subType, attribute }, null];
};

// <ref name=manchester2002>''LibreOffice for Starters'', First Edition, Flexible Minds, Manchester, 2002, p. 18</ref>
// <ref name=manchester2002 />

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
    remain = match.groups.remain;
    refgroup = match.groups.refgroup;
  }

  // 3. Try extract refname
  const R_NAME = /^name *= *(?<refname>\"[^#\"\'\/=>\\]+\"|[^\#\"\'\/=>\?\\ ]+)\s*(?<remain>[\s\S]*)$/gi;
  if ((match = R_NAME.exec(remain)) !== null) {
    remain = match.groups.remain;
    refname = match.groups.refname;
  }

  // 4.1. Reuse Reference
  if (/^\s*\/>$/.exec(remain)) {
    return [{ type: "reuse", refname, refgroup }, []];
  }

  // 4.2. Firstuse Reference
  const R_FIRSTUSE = /^>(?<children>[\s\S]+)<\/ref>$/gi;
  if ((match = R_FIRSTUSE.exec(remain)) === null) {
    throw "Firstuse Reference Error " + remain;
  }

  children = main(match.groups.children).children;
  if (refname) refname = trimQuote(refname);
  if (refgroup) refgroup = trimQuote(refgroup);

  return [{ type: "firstuse", refname, refgroup }, children];
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
  subType = match.groups.subType;
  remain = match.groups.remain;

  // 2. Extract group footnote
  const R_GROUP = /^group=(?<fnGroup>\"[^#\"\'\/=>\?\\]+\"|[^\#\"\'\/=>\?\\ ]+)\|(?<remain>[\s\S]+)$/;
  if ((match = R_GROUP.exec(remain)) !== null) {
    fnGroup = match.groups.fnGroup;
    remain = match.groups.remain;
  }

  // 3. Extract name footnote
  const R_NAME = /^name=(?<fnName>\"[^#\"\'\/=>\?\\]+\"|[^\#\"\'\/=>\?\\ ]+)(\|(?<remain>[\s\S]+))?$/;
  if ((match = R_NAME.exec(remain)) !== null) {
    fnName = match.groups.fnName;
    remain = match.groups.remain;
  }

  // 4. Parse real content footnote
  children = remain ? main(remain).children : [];

  // NOTE: numering foonote will be done in analyseReference function
  return [{ type, subType, fnName, fnGroup }, children];
};

const internalParse = (element, content, plain) => {
  if (element.elementName == "Reference") {
    return ReferenceParser(plain);
  } else if (element.elementName == "ExternalLink") {
    const R_EXTERNAL = /^\[(?<url>\S+)( (?<displayText>[\s\S]+))?\]$/gi;
    let match, url, displayText;
    if ((match = R_EXTERNAL.exec(plain)) !== null) {
      [url, displayText] = [match.groups.url, match.groups.displayText];
      return [{ url, displayText }, []];
    } else {
      throw "ExternalLink Grammar Error";
    }
  } else if (element.elementName == "Template") {
    if (/^{{[Cc]ite/g.test(plain)) {
      return CiteParser(plain);
    } else if (/^{{(refn|efn|efn-(la|ua|lr|ur|lg))\|/.test(plain)) {
      return FootnoteParser(plain);
    } else if (/^{{lang-\w+\|/gi.test(plain)) {
      let text = /\|(.*)}}$/.exec(plain)[1];
      return [
        { type: "lang" },
        [
          {
            elementName: "Italic",
            children: [
              {
                elementName: "Text",
                text
              }
            ]
          }
        ]
      ];
    } else if (/^{{IPA-\w+\|/gi.test(plain)) {
      let text = /\|(.*)}}$/.exec(plain)[1];
      return [
        { type: "lang" },
        [
          {
            elementName: "Text",
            text: "[" + text + "]"
          }
        ]
      ];
    }

    return [null, [{ elementName: "Text", text: `{{N/A: ${plain}}}` }]];
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
  Link = {
    elementName: "Link",
    startToken: "[[",
    endToken: ["]]"],
    allowElements: [Bold, Italic]
  },
  ExternalLink = {
    elementName: "ExternalLink",
    startToken: "[",
    endToken: ["]"],
    allowElements: []
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

Link.allowElements.push(Link);
Italic.allowElements.push(Link);
Reference.allowElements.push(Template);
Template.allowElements.push(Template, Reference, Link);

const analyseHeadings = headings => {
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

const parse = (s, l, i, e) => {
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

  headings = headings.length ? analyseHeadings(headings) : null;

  return [i, clean({ elementName, children, headings, ...meta }), plain];
};

const main = s => parse(s, null, 0, Global)[1];

export { main, clean, trimQuote, trimAll };

// console.log(
//   JSON.stringify(
//     main(
//       `'''''The Last Supper''''' ({{lang-it|Il Cenacolo}} {{IPA-it|il tʃeˈnaːkolo|}} or ''L'Ultima Cena'' {{IPA-it|ˈlultima ˈtʃeːna|}}) is a late 15th-century [[mural]] painting by Italian artist [[Leonardo da Vinci]] housed by the [[refectory]] of the Convent of [[Santa Maria delle Grazie (Milan)|Santa Maria delle Grazie]] in [[Milan]], [[Italy]]. It is one of the Western world's most recognizable paintings.<ref>{{cite web |url=https://www.sciencedaily.com/releases/2010/03/100331091143.htm |title=Leonardo Da Vinci's 'The Last Supper' reveals more secrets |publisher=sciencedaily.com |accessdate=3 March 2014}}</ref>`
//     ),
//     null,
//     2
//   )
// );
