// import { main, Global } from "./index.js";
let main = require("./index.js");

main = main.main;

const simpleTest = (description, input, expected) => {
  let actual = main(input, null, 0).content;
  test(`Should work with ${description}: ${input}`, () => {
    expect(actual).toStrictEqual(expected);
  });
};

const wikiLink = (url, displayText = url) => ({
  elementName: "Link",
  content: { type: "wikiLink", url, displayText }
});

const file = (url, caption = "", options = []) => ({
  elementName: "Link",
  content: { type: "media", supType: "File", caption, url, options }
});

const italic = content => ({ elementName: "Italic", content });

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
  ["suffix with format", "[[a]]''b''", [wikiLink("A", "a"), italic(["b"])]],
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
  ["simplest", "[[File:wiki.png]]", [file("File:Wiki.png", "", [])]],
  [
    "with opts",
    "[[File:wiki.png|thumb|Wikipedia logo]]",
    [file("File:Wiki.png", "Wikipedia logo", ["thumb"])]
  ],
  [
    "with alt",
    "[[File:wiki.png|alt=Puzzle globe logo]]",
    [file("File:Wiki.png", "", [{ key: "alt", value: "Puzzle globe logo" }])]
  ],
  [
    "with link",
    "[[File:wiki.png|link=Wikipedia]]",
    [file("File:Wiki.png", "", [{ key: "link", value: "Wikipedia" }])]
  ],
  [
    "complex",
    "[[File:wiki.png|frame|centre|alt=Puzzle globe|Wikipedia logo]]",
    [
      file("File:Wiki.png", "Wikipedia logo", [
        "frame",
        "centre",
        { key: "alt", value: "Puzzle globe" }
      ])
    ]
  ]
];

for (const t of wikiLinkTests) {
  simpleTest(...t);
}

for (const t of mediaTests) simpleTest(...t);

// console.log(JSON.stringify(main("[[a]]''b''", null, 0), null, 2));
