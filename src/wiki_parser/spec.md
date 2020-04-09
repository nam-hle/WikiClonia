# Format

## Italic

''italicize text'' => {name: "Italic", content: ["italicize text"]}

## Bold

'''bold the text''' => {name: "Bold", content: ["bold the text"]}

## BoldItalic

'''''bold italics''''' => {name: "BoldItalic", content: ["bold itallics"]}

## Small Capital Letters

{{smallcaps|small caps}} => {name: "SmallCapitalLetters", content: ["small caps"]}

## InlineCode

<code>int m2()</code> => {name: "InlineCode", content: "int m2()"}

# Element Link

## WikiLink

`type: "wikiLink"`

A wikilink (or internal link) links a page to another page within English Wikipedia. In wikitext, links are enclosed in doubled square brackets.

- `[[1234]] => {"elementName": "Link", "content": { "type": "wikiLink", "url": "1234", "displayText": "1234" }}`

- `[[a|bc]], [[a|b]]c => {"elementName": "Link", "content": { type: "wikiLink", url: "a", displayText: "bc" }}`

- `a[[b]] => {"name": "Link", "content": { type: "wikiLink", url: "b", displayText: "ab" }}`

- `[[a]]:b => {"name": "Link", "content": { type: "wikiLink", url: "a", displayText: "a:b" }}`
