const Comment = {
    elementName: "Comment",
    startToken: "<!--",
    endToken: ["-->"],
    allowedChildren: []
  },
  HightLight = {
    elementName: "HightLight",
    startToken: "<syntaxhighlight",
    endToken: ["</syntaxhighlight>"],
    allowedChildren: []
  },
  Code = {
    elementName: "Code",
    startToken: "<code>",
    endToken: ["</code>"],
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
      Code,
      HightLight,
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
Code.allowedChildren.push(ExternalLink);
for (const heading of [
  Heading6,
  Heading5,
  Heading4,
  Heading3,
  Heading2,
  Heading1
]) {
  heading.allowedChildren.push(Template);
}
export { Global, PairPipe };
