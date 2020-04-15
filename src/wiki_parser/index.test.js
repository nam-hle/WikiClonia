// import { main, Global } from "./index.js";
let m = require("./index.js");

let main = m.main;
let clean = m.clean;

const simpleTest = (description, input, expected) => {
  let actual = main(input).children;
  let trulyExpected = expected.map(e =>
    typeof e === "string" ? { elementName: "Text", text: e } : e
  );
  test(`Should work with ${description}: ${input}`, () => {
    expect(actual).toStrictEqual(trulyExpected);
  });
};

const wikiLink = (url, displayText = url) => ({
  elementName: "Link",
  type: "wikiLink",
  url,
  displayText
});

const file = (url, caption = [], options = []) => ({
  elementName: "Link",
  type: "media",
  supType: "File",
  caption,
  url,
  options
});

const text = str => ({ elementName: "Text", text: str });

const italic = content => ({ elementName: "Italic", children: content });

let wikiLinkTests = [
  ["simple link", "[[1234]]", [wikiLink("1234")]],
  ["simple link with pipe", "[[a|bc]]", [wikiLink("A", "bc")]],
  ["prefix character", "a[[b]]", ["a", wikiLink("B", "b")]],
  ["suffix char", "[[a]]b", [wikiLink("A", "ab")]],
  ["suffix char", "[[a|b]]c", [wikiLink("A", "bc")]],
  [
    "suffix char",
    "A [[micro-]]second",
    ["A ", wikiLink("Micro-", "micro-second")]
  ],

  ["suffix char", "[[a]]:b", [wikiLink("A", "a"), ":b"]],
  ["suffix char", "[[Washington]]'s", [wikiLink("Washington"), "'s"]],
  [
    "suffix with format",
    "[[a]]''b''",
    [wikiLink("A", "a"), italic([{ elementName: "Text", text: "b" }])]
  ],
  [
    "format link with suffix char",
    "''[[a]]''b",
    [italic([wikiLink("A", "a")]), "b"]
  ],
  ["format suffix link", "''[[a]]b''", [italic([wikiLink("A", "ab")])]],
  ["nowiki", "[[a]]<nowiki />b", [wikiLink("A", "a"), "b"]],
  ["nowiki", "[[a|b]]<nowiki />c", [wikiLink("A", "b"), "c"]],
  [
    "nowiki",
    "A [[micro-]]<nowiki />second",
    ["A ", wikiLink("Micro-", "micro-"), "second"]
  ],
  ["case-sensitive", "[[atom]]", [wikiLink("Atom", "atom")]],
  ["case-sensitive", "[[ATom]]", [wikiLink("ATom", "ATom")]],
  [
    "case-sensitive",
    "[[public transport|public transportation]]",
    [wikiLink("Public_transport", "public transportation")]
  ],
  [
    "pipeTrick & trailing parentheses",
    "[[kingdom (biology)|]]",
    [wikiLink("Kingdom_(biology)", "kingdom")]
  ],
  [
    "pipeTrick & trailing comma",
    "[[Seattle, Washington|]]",
    [wikiLink("Seattle,_Washington", "Seattle")]
  ],
  [
    "pipeTrick & multiple trailing commas",
    "[[Il Buono, il Brutto, il Cattivo|]]",
    [wikiLink("Il_Buono,_il_Brutto,_il_Cattivo", "Il Buono")]
  ],
  [
    "pipeTrick & namespace",
    "[[Wikipedia:Village pump|]]",
    [wikiLink("Wikipedia:Village_pump", "Village pump")]
  ],
  [
    "pipeTrick & both",
    "[[Wikipedia:Manual of Style (headings)|]]",
    [wikiLink("Wikipedia:Manual_of_Style_(headings)", "Manual of Style")]
  ],
  [
    "pipeTrick: commas beat parentheses",
    "[[Yours, Mine and Ours (1968 film)|]]",
    [wikiLink("Yours,_Mine_and_Ours_(1968_film)", "Yours, Mine and Ours")]
  ]
];

let mediaTests = [
  ["simplest", "[[File:wiki.png]]", [clean(file("File:Wiki.png", [], []))]],
  [
    "with opts",
    "[[File:wiki.png|thumb|Wikipedia logo]]",
    [clean(file("File:Wiki.png", [text("Wikipedia logo")], ["thumb"]))]
  ],
  [
    "with alt",
    "[[File:wiki.png|alt=Puzzle globe logo]]",
    [
      clean(
        file("File:Wiki.png", [], [{ key: "alt", value: "Puzzle globe logo" }])
      )
    ]
  ],
  [
    "with link",
    "[[File:wiki.png|link=Wikipedia]]",
    [clean(file("File:Wiki.png", [], [{ key: "link", value: "Wikipedia" }]))]
  ],
  [
    "complex",
    "[[File:wiki.png|frame|centre|alt=Puzzle globe|Wikipedia logo]]",
    [
      clean(
        file(
          "File:Wiki.png",
          [text("Wikipedia logo")],
          ["frame", "centre", { key: "alt", value: "Puzzle globe" }]
        )
      )
    ]
  ]
];

let refTests = [
  [
    "Basic ref",
    "<ref>ABC</ref>",
    [
      {
        elementName: "Reference",
        referenceIndex: 1,
        type: "noname",
        children: [text("ABC")]
      }
    ]
  ],
  [
    "ref with some format",
    "<ref>''ABC''</ref>",
    [
      {
        elementName: "Reference",
        referenceIndex: 1,
        type: "noname",
        children: [italic([text("ABC")])]
      }
    ]
  ],
  [
    "noquote named ref",
    "<ref name=ABC002>ABC</ref>",
    [
      {
        elementName: "Reference",
        referenceIndex: 1,
        type: "named",
        refname: "ABC002",
        children: [text("ABC")]
      }
    ]
  ],
  [
    "quoted named ref",
    '<ref name="ABC 002">ABC</ref>',
    [
      {
        elementName: "Reference",
        referenceIndex: 1,
        type: "named",
        refname: "ABC 002",
        children: [text("ABC")]
      }
    ]
  ],
  [
    "reuse ref",
    '<ref name="ABC 002" />',
    [
      {
        elementName: "Reference",
        referenceIndex: 1,
        type: "reuse",
        refname: "ABC 002"
      }
    ]
  ],
  [
    "footnote",
    "Lorem ipsum dolor sit amet.{{efn|name=fn1|Footnote 1}} Consectetur adipisicing elit.{{efn|Footnote 2}} Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{{efn|name=fn1}}",
    [
      {
        elementName: "Text",
        text: "Lorem ipsum dolor sit amet."
      },
      {
        elementName: "Template",
        children: [
          {
            elementName: "Text",
            text: "Footnote 1"
          }
        ],
        type: "footnote",
        subType: "efn",
        fnName: "fn1"
      },
      {
        elementName: "Text",
        text: " Consectetur adipisicing elit."
      },
      {
        elementName: "Template",
        children: [
          {
            elementName: "Text",
            text: "Footnote 2"
          }
        ],
        type: "footnote",
        subType: "efn"
      },
      {
        elementName: "Text",
        text:
          " Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        elementName: "Template",
        type: "footnote",
        subType: "efn",
        fnName: "fn1"
      }
    ]
  ]
];

// let footnoteRef = [
//   ["bacsic",

//   ]
// ]

for (const t of wikiLinkTests) {
  simpleTest(...t);
}

for (const t of mediaTests) {
  simpleTest(...t);
}

for (const t of refTests) {
  simpleTest(...t);
}
