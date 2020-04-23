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
  displayText: [{ elementName: "Text", text: displayText }]
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
        type: "firstuse",
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
        type: "firstuse",
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
        type: "firstuse",
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
        type: "firstuse",
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

let multipleImagesTests = [
  [
    "multiple",
    "{{multiple image |header = Religious affiliations in New York City | align = center | direction = horizontal | image1 = StPatCathExt1.jpg | width1 = 103 | caption1 = The [[New York City Landmarks|landmark]] [[Gothic revival architecture|Neo-Gothic]] Roman Catholic [[St. Patrick's Cathedral (Manhattan)|St. Patrick's Cathedral]], Midtown Manhattan | alt1 = | image2 = Jueus ultraortodoxes satmar a brooklyn.jpg | width2 = 200 | caption2 = [[Haredi Jews|Ultra-Orthodox]] [[Jews in New York City|Jewish]] residents in Brooklyn. Brooklyn has the largest Jewish community in the United States, with approximately 600,000 individuals.<ref name=BrooklynJewish/> | alt2 = | image3 = Islamic Cultural Center E96 jeh.JPG | width3 = 131 | caption3 = The [[Islamic Cultural Center of New York]] in [[Upper Manhattan]], the first mosque built in New York City. | alt3 = | image4 = Exterior Hindu Temple.JPG | width4 = 100 | caption4 = [[Hindu Temple Society of North America|Ganesh Temple]] in [[Flushing, Queens]], the oldest [[Hindu temple]] in the U.S. | alt4 = | image5 = Buddhist Temple, Chinatown.jpg | width5 = 112 | caption5 = [[New York Mahayana Temple|Mahayana Buddhist Temple]] in [[Chinatown, Manhattan]] | alt5 = | image6 = Times Square after dark atheist.jpg | width6 = 200 | caption6 = A significant proportion of New Yorkers hold [[American Atheists|atheistic]] views, promoted on this [[digital billboard|electronic billboard]] in [[Times Square]]. | alt6 = }}",
    [
      {
        elementName: "Template",
        images: [
          {
            elementName: "Link",
            type: "media",
            supType: "File",
            url: "File:StPatCathExt1.jpg",
            options: [],
            caption: [
              {
                elementName: "Text",
                text: "The "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "New_York_City_Landmarks",
                displayText: [
                  {
                    elementName: "Text",
                    text: "landmark"
                  }
                ]
              },
              {
                elementName: "Text",
                text: " "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Gothic_revival_architecture",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Neo-Gothic"
                  }
                ]
              },
              {
                elementName: "Text",
                text: " Roman Catholic "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "St._Patrick's_Cathedral_(Manhattan)",
                displayText: [
                  {
                    elementName: "Text",
                    text: "St. Patrick's Cathedral"
                  }
                ]
              },
              {
                elementName: "Text",
                text: ", Midtown Manhattan"
              }
            ]
          },
          {
            elementName: "Link",
            type: "media",
            supType: "File",
            url: "File:Jueus ultraortodoxes satmar a brooklyn.jpg",
            options: [],
            caption: [
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Haredi_Jews",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Ultra-Orthodox"
                  }
                ]
              },
              {
                elementName: "Text",
                text: " "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Jews_in_New_York_City",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Jewish"
                  }
                ]
              },
              {
                elementName: "Text",
                text:
                  " residents in Brooklyn. Brooklyn has the largest Jewish community in the United States, with approximately 600,000 individuals."
              },
              {
                elementName: "Reference",
                type: "reuse",
                refname: "BrooklynJewish",
                referenceIndex: 1
              }
            ]
          },
          {
            elementName: "Link",
            type: "media",
            supType: "File",
            url: "File:Islamic Cultural Center E96 jeh.JPG",
            options: [],
            caption: [
              {
                elementName: "Text",
                text: "The "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Islamic_Cultural_Center_of_New_York",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Islamic Cultural Center of New York"
                  }
                ]
              },
              {
                elementName: "Text",
                text: " in "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Upper_Manhattan",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Upper Manhattan"
                  }
                ]
              },
              {
                elementName: "Text",
                text: ", the first mosque built in New York City."
              }
            ]
          },
          {
            elementName: "Link",
            type: "media",
            supType: "File",
            url: "File:Exterior Hindu Temple.JPG",
            options: [],
            caption: [
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Hindu_Temple_Society_of_North_America",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Ganesh Temple"
                  }
                ]
              },
              {
                elementName: "Text",
                text: " in "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Flushing,_Queens",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Flushing, Queens"
                  }
                ]
              },
              {
                elementName: "Text",
                text: ", the oldest "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Hindu_temple",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Hindu temple"
                  }
                ]
              },
              {
                elementName: "Text",
                text: " in the U.S."
              }
            ]
          },
          {
            elementName: "Link",
            type: "media",
            supType: "File",
            url: "File:Buddhist Temple, Chinatown.jpg",
            options: [],
            caption: [
              {
                elementName: "Link",
                type: "wikiLink",
                url: "New_York_Mahayana_Temple",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Mahayana Buddhist Temple"
                  }
                ]
              },
              {
                elementName: "Text",
                text: " in "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Chinatown,_Manhattan",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Chinatown, Manhattan"
                  }
                ]
              }
            ]
          },
          {
            elementName: "Link",
            type: "media",
            supType: "File",
            url: "File:Times Square after dark atheist.jpg",
            options: [],
            caption: [
              {
                elementName: "Text",
                text: "A significant proportion of New Yorkers hold "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "American_Atheists",
                displayText: [
                  {
                    elementName: "Text",
                    text: "atheistic"
                  }
                ]
              },
              {
                elementName: "Text",
                text: " views, promoted on this "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Digital_billboard",
                displayText: [
                  {
                    elementName: "Text",
                    text: "electronic billboard"
                  }
                ]
              },
              {
                elementName: "Text",
                text: " in "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Times_Square",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Times Square"
                  }
                ]
              },
              {
                elementName: "Text",
                text: "."
              }
            ]
          }
        ],
        type: "multipleImages",
        attributes: {
          header: "Religious affiliations in New York City",
          align: "center",
          direction: "horizontal"
        }
      }
    ]
  ],
  [
    "gallery",
    `<gallery class="center" widths="400" heights="200">
File:Long Island City New York May 2015 panorama 3.jpg|The growing skyline of [[Long Island City, Queens|Long Island City]], Queens,<ref>{{cite web|url=https://www.bloomberg.com/news/articles/2018-10-30/nyc-s-fastest-growing-neighborhood-gets-180-million-investment|title=NYC's Fastest-Growing Neighborhood Gets $180 Million Investment|author=Henry Goldman|date=October 30, 2018|publisher=Bloomberg, L.P|accessdate=October 30, 2018}}</ref> facing the East River at [[blue hour]] in May 2015. At left is the [[Queensboro Bridge]], connecting Queens to Manhattan.
File:1650 Grand Concourse.jpg|The [[Grand Concourse (Bronx)|Grand Concourse]] in [[the Bronx]], foreground, with Manhattan in the background in February 2018
File:Verrazano - Narrows Bridge4.jpg|The [[Verrazzano-Narrows Bridge]], the longest [[suspension bridge]] in the [[Western Hemisphere]], connecting [[Staten Island]] to [[Brooklyn]]<nowiki/> across [[The Narrows]]
</gallery>`,
    [
      {
        elementName: "Gallery",
        images: [
          {
            elementName: "Link",
            type: "media",
            supType: "File",
            url: "File:Long Island City New York May 2015 panorama 3.jpg",
            caption: [
              {
                elementName: "Text",
                text: "The growing skyline of "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Long_Island_City,_Queens",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Long Island City"
                  }
                ]
              },
              {
                elementName: "Text",
                text: ", Queens,"
              },
              {
                elementName: "Reference",
                type: "firstuse",
                children: [
                  {
                    elementName: "Template",
                    type: "cite",
                    subType: "web",
                    attribute: {
                      url:
                        "https://www.bloomberg.com/news/articles/2018-10-30/nyc-s-fastest-growing-neighborhood-gets-180-million-investment",
                      title:
                        "NYC's Fastest-Growing Neighborhood Gets $180 Million Investment",
                      author: "Henry Goldman",
                      date: "October 30, 2018",
                      publisher: "Bloomberg, L.P",
                      accessdate: "October 30, 2018"
                    }
                  }
                ],
                referenceIndex: 1
              },
              {
                elementName: "Text",
                text: " facing the East River at "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Blue_hour",
                displayText: [
                  {
                    elementName: "Text",
                    text: "blue hour"
                  }
                ]
              },
              {
                elementName: "Text",
                text: " in May 2015. At left is the "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Queensboro_Bridge",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Queensboro Bridge"
                  }
                ]
              },
              {
                elementName: "Text",
                text: ", connecting Queens to Manhattan."
              }
            ]
          },
          {
            elementName: "Link",
            type: "media",
            supType: "File",
            url: "File:1650 Grand Concourse.jpg",
            caption: [
              {
                elementName: "Text",
                text: "The "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Grand_Concourse_(Bronx)",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Grand Concourse"
                  }
                ]
              },
              {
                elementName: "Text",
                text: " in "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "The_Bronx",
                displayText: [
                  {
                    elementName: "Text",
                    text: "the Bronx"
                  }
                ]
              },
              {
                elementName: "Text",
                text:
                  ", foreground, with Manhattan in the background in February 2018"
              }
            ]
          },
          {
            elementName: "Link",
            type: "media",
            supType: "File",
            url: "File:Verrazano - Narrows Bridge4.jpg",
            caption: [
              {
                elementName: "Text",
                text: "The "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Verrazzano-Narrows_Bridge",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Verrazzano-Narrows Bridge"
                  }
                ]
              },
              {
                elementName: "Text",
                text: ", the longest "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Suspension_bridge",
                displayText: [
                  {
                    elementName: "Text",
                    text: "suspension bridge"
                  }
                ]
              },
              {
                elementName: "Text",
                text: " in the "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Western_Hemisphere",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Western Hemisphere"
                  }
                ]
              },
              {
                elementName: "Text",
                text: ", connecting "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Staten_Island",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Staten Island"
                  }
                ]
              },
              {
                elementName: "Text",
                text: " to "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "Brooklyn",
                displayText: [
                  {
                    elementName: "Text",
                    text: "Brooklyn"
                  }
                ]
              },
              {
                elementName: "Text",
                text: "<nowiki/> across "
              },
              {
                elementName: "Link",
                type: "wikiLink",
                url: "The_Narrows",
                displayText: [
                  {
                    elementName: "Text",
                    text: "The Narrows"
                  }
                ]
              }
            ]
          }
        ],
        attributes: {
          class: "center",
          widths: "400",
          heights: "200"
        }
      }
    ]
  ],
  [
    "Infobox",
    `{{Infobox settlement
| name                     = New York<!-- DO NOT change without discussion -->
| official_name            = <!-- DO NOT add to this parameter without consensus -->
| settlement_type          = [[City (New York)|City]]
| named_for                = [[James II of England|James, Duke of York]]
|image_skyline             = {{multiple image
| border                   = infobox
| total_width              = 290
| image_style              = border:1;
| perrow                   = 1/3/2/2
| image1                   = Lower Manhattan skyline - June 2017.jpg
| image2                   = Central park pond.jpg
| image3                   = Unisphere Flushing Meadows Queens.jpg
| image4                   = Brooklyn Bridge, west tower (7433306334).jpg
| image5                   = LadyLiberty02.jpg
| image6                   = Times_square_night.jpg
| image7                   = Midtown Manhattan 2019.jpg
| image8                   = Manhattan Bridge 2 (6214831091).jpg
}}
| image_caption            = From top, left to right: [[Lower Manhattan]], [[Central Park]], the [[Unisphere]], the [[Brooklyn Bridge]], [[Statue of Liberty]], [[Times Square]], [[Midtown Manhattan]], [[Manhattan Bridge]]
| image_flag               = Flag of New York City.svg
| image_seal               = Seal_of_New_York_City_BW.svg
| image_blank_emblem       = NYC Logo Wolff Olins.svg
| blank_emblem_type        = [[Wordmark]]
| nickname                 = ''See [[Nicknames of New York City]]''
<!-- maps and coordinates -->
| image_map                = {{Maplink|frame=yes|plain=y|frame-width=290|frame-height=270|frame-align=center|stroke-width=3|zoom=9|frame-lat=40.7|frame-long=-73.944|type=shape-inverse|stroke-color=#808080|id=Q60|title=New York City}}
| mapsize                  =
| map_caption              = Interactive map outlining New York City
| pushpin_map              = New York#USA#North America
| pushpin_relief           = 1
|pushpin_mapsize           = 290px
| pushpin_map_caption      = Location within the state of New York##Location within the United States##Location within North America
| pushpin_label            = New York
| pushpin_label_position   = left
| coordinates              = {{coord|40.661|N|73.944|W|region:US-NY|format=dms|display=inline,title}}
| coor_pinpoint            = <!-- to specify exact location of coordinates (was coor_type) -->
| coordinates_footnotes    =<ref name="GR1">{{cite web |url=https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html |publisher=[[United States Census Bureau]] |accessdate=April 23, 2011 |date=February 12, 2011 |title=US Gazetteer files: 2010, 2000, and 1990}}</ref>
| subdivision_type         = Country
| subdivision_name         = {{nowrap|{{flag|United States}}}}
| subdivision_type2        = State
| subdivision_name2        = {{flag|New York}}
----
| subdivision_type3        = [[List of regions of the United States|Region]]
| subdivision_name3        = [[Mid-Atlantic (United States)|Mid-Atlantic]]
| subdivision_type4        = [[County (United States)|Constituent counties]] ([[Boroughs of New York City|boroughs]])
| subdivision_name4        = [[The Bronx|Bronx (The Bronx)]]<br />[[Brooklyn|Kings (Brooklyn)]]<br />[[Manhattan|New York (Manhattan)]]<br />[[Queens|Queens (Queens)]]<br />[[Staten Island|Richmond (Staten Island)]]
----
| subdivision_type5        = [[Colony|Historic colonies]]
| subdivision_name5        = [[New Netherland]]<br />[[Province of New York]]
| established_title        = Settled
| established_date         = 1624
| established_title1       = [[City of Greater New York|Consolidated]]
| established_date1        = 1898
| established_title2       =
| government_footnotes     =
| government_type          = [[Mayor–council government|Mayor–Council]]
| governing_body           = [[New York City Council]]
| leader_title             = [[Mayor of New York City|Mayor]]
| leader_name              = [[Bill de Blasio]] ([[Democratic Party (United States)|D]])
| total_type               = Total
| unit_pref                = Imperial
| area_footnotes           =<ref name="GR1" />
| area_total_sq_mi         = 468.484
| area_land_sq_mi          = 302.643
| area_water_sq_mi         = 165.841
| area_metro_sq_mi         = 13318
| elevation_footnotes      =<ref name="GR3">{{cite web |url=http://geonames.usgs.gov |accessdate=January 31, 2008 |title=US Board on Geographic Names |publisher=[[United States Geological Survey]] |date=June 23, 2018}} Search for feature ID 975772.</ref>
| elevation_m              = 10
| elevation_ft             = 33
| population_rank          = [[List of United States cities by population|1st in the U.S.]]
| population_density_sq_mi = 27,751
| population_as_of         = [[2010 United States Census|2010]]
| population_total         = 8175133
| population_footnotes     =<ref name=Census2010>[https://www.census.gov Community Facts for New York City] , [[United States Census Bureau]]. Retrieved May 26, 2017.</ref>
| population_est           = 8398748
| pop_est_as_of            = 2018
| pop_est_footnotes        =<ref name=2018Estimate />
| population_blank1_title  = [[Metropolitan statistical area|MSA (2018)]]
| population_blank1        = 19,979,477<ref name="MetroEst">{{cite web|url=https://factfinder.census.gov/bkmk/table/1.0/en/PEP/2017/GCTPEPANNR.US24PR|title=Annual Estimates of the Resident Population: April 1, 2010 to July 1, 2017—Metropolitan Statistical Area; and for Puerto Rico—2017 Population Estimates|publisher=U.S. Census Bureau|accessdate=March 24, 2018|archive-url=https://archive.today/20200213005215/https://factfinder.census.gov/bkmk/table/1.0/en/PEP/2017/GCTPEPANNR.US24PR|archive-date=February 13, 2020|url-status=dead}}</ref> ([[List of metropolitan statistical areas|1st]])
| population_blank2_title  = [[New York metropolitan area|CSA (2018)]]
| population_blank2        = 22,679,948<ref name=CombinedEst>{{cite web |url=https://www.census.gov |title=Annual Estimates of the Resident Population: April 1, 2010 to July 1, 2018—Combined Statistical Area; and for Puerto Rico—2017 Population Estimates |publisher=U.S. Census Bureau |accessdate=April 27, 2018 }}</ref> ([[List of Combined Statistical Areas|1st]])
| population_demonym       = New Yorker
| blank6_name              = [[GDP]] (City, 2018)
| blank6_info              = $842.3&nbsp;billion<ref name="bea.gov">[https://www.bea.gov/system/files/2019-12/lagdp1219.pdf ''Local Area Gross Domestic Product, 2018''], [[Bureau of Economic Analysis]], released December 17, 2019. Accessed December 12, 2019.</ref> (1st)
| blank7_name              = [[Gross metropolitan product|GMP]] (Metro, 2020)
| blank7_info              = $2.0&nbsp;trillion<ref name="NYCMetroGMP">{{cite web|url=https://www.statista.com/statistics/183808/gmp-of-the-20-biggest-metro-areas/|title=U.S. metro areas—ranked by Gross Metropolitan Product (GMP) 2020 {{!}} Statistic|website=Statista|accessdate=May 31, 2019}}</ref> (1st)
| timezone1                = [[Eastern Time Zone|EST]]
| utc_offset1              = −05:00
| timezone1_DST            = [[Eastern Time Zone|EDT]]
| utc_offset1_DST          = −04:00
| postal_code_type         = [[ZIP Code]]s
| postal_code              = 100xx–104xx, 11004–05, 111xx–114xx, 116xx
| area_code                = [[Area codes 212, 646, and 332|212/646/332]], [[Area codes 718, 347, and 929|718/347/929]], [[Area code 917|917]]
| blank_name               = [[Federal Information Processing Standards|FIPS code]]
| blank_info               = 36-51000
| blank1_name              = [[Geographic Names Information System|GNIS]] feature ID
| blank1_info              = 975772
| blank2_name              = Major airports
| blank2_info              = [[John F. Kennedy International Airport]], [[Newark Liberty International Airport]], [[LaGuardia Airport]]
| blank4_name              = [[Commuter rail]]
| blank4_info              = [[LIRR]], [[Metro-North]], [[NJ Transit Rail Operations|NJ Transit]]
| blank5_name              = [[Rapid transit]]
| blank5_info              = [[New York City Subway|Subway]], [[Staten Island Railway]], [[PATH (rail system)|PATH]]
| blank_name_sec2          = Largest [[Boroughs of New York City|borough]] by area
| blank_info_sec2          = [[Queens]] {{convert|109|sqmi|km2}}
| blank1_name_sec2         = Largest borough by population
| blank1_info_sec2         = [[Brooklyn]] (2015 est 2,636,735)<ref name=BrooklynQuickFacts>{{cite web |title=State & County QuickFacts—Kings County (Brooklyn Borough), New York |url=http://quickfacts.census.gov/qfd/states/36/36047.html |publisher=United States Census Bureau |accessdate=March 24, 2016 |archiveurl=https://web.archive.org/web/20160217175357/http://quickfacts.census.gov/qfd/states/36/36047.html |archivedate=February 17, 2016}}</ref>
| blank2_name_sec2         = Largest borough by [[GDP]] (2018)
| blank2_info_sec2         = [[Manhattan]] $600.2 billion<ref name="bea.gov"/>
| website                  = [https://www.nyc.gov/ NYC.gov]
| population_density_km2   = 10,715
}}`,
    [
      {
        elementName: "Template",
        type: "Infobox",
        subtype: "settlement",
        sections: [
          {
            name: "New York<!-- DO NOT change without discussion -->",
            official_name:
              "<!-- DO NOT add to this parameter without consensus -->",
            settlement_type: "[[City (New York)|City]]",
            named_for: "[[James II of England|James, Duke of York]]",
            image_skyline:
              "{{multiple image\n| border                   = infobox\n| total_width              = 290\n| image_style              = border:1;\n| perrow                   = 1/3/2/2\n| image1                   = Lower Manhattan skyline - June 2017.jpg\n| image2                   = Central park pond.jpg\n| image3                   = Unisphere Flushing Meadows Queens.jpg\n| image4                   = Brooklyn Bridge, west tower (7433306334).jpg\n| image5                   = LadyLiberty02.jpg\n| image6                   = Times_square_night.jpg\n| image7                   = Midtown Manhattan 2019.jpg\n| image8                   = Manhattan Bridge 2 (6214831091).jpg\n}}",
            image_caption:
              "From top, left to right: [[Lower Manhattan]], [[Central Park]], the [[Unisphere]], the [[Brooklyn Bridge]], [[Statue of Liberty]], [[Times Square]], [[Midtown Manhattan]], [[Manhattan Bridge]]",
            image_flag: "Flag of New York City.svg",
            image_seal: "Seal_of_New_York_City_BW.svg",
            image_blank_emblem: "NYC Logo Wolff Olins.svg",
            blank_emblem_type: "[[Wordmark]]",
            nickname:
              "''See [[Nicknames of New York City]]''\n<!-- maps and coordinates -->",
            image_map:
              "{{Maplink|frame=yes|plain=y|frame-width=290|frame-height=270|frame-align=center|stroke-width=3|zoom=9|frame-lat=40.7|frame-long=-73.944|type=shape-inverse|stroke-color=#808080|id=Q60|title=New York City}}",
            mapsize: "",
            map_caption: "Interactive map outlining New York City",
            pushpin_map: "New York#USA#North America",
            pushpin_relief: "1",
            pushpin_mapsize: "290px",
            pushpin_map_caption:
              "Location within the state of New York##Location within the United States##Location within North America",
            pushpin_label: "New York",
            pushpin_label_position: "left",
            coordinates:
              "{{coord|40.661|N|73.944|W|region:US-NY|format=dms|display=inline,title}}",
            coor_pinpoint:
              "<!-- to specify exact location of coordinates (was coor_type) -->",
            coordinates_footnotes:
              '<ref name="GR1">{{cite web |url=https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html |publisher=[[United States Census Bureau]] |accessdate=April 23, 2011 |date=February 12, 2011 |title=US Gazetteer files: 2010, 2000, and 1990}}</ref>',
            subdivision_type: "Country",
            subdivision_name: "{{nowrap|{{flag|United States}}}}",
            subdivision_type2: "State",
            subdivision_name2: "{{flag|New York}}"
          },
          {
            subdivision_type3:
              "[[List of regions of the United States|Region]]",
            subdivision_name3: "[[Mid-Atlantic (United States)|Mid-Atlantic]]",
            subdivision_type4:
              "[[County (United States)|Constituent counties]] ([[Boroughs of New York City|boroughs]])",
            subdivision_name4:
              "[[The Bronx|Bronx (The Bronx)]]<br />[[Brooklyn|Kings (Brooklyn)]]<br />[[Manhattan|New York (Manhattan)]]<br />[[Queens|Queens (Queens)]]<br />[[Staten Island|Richmond (Staten Island)]]"
          },
          {
            subdivision_type5: "[[Colony|Historic colonies]]",
            subdivision_name5:
              "[[New Netherland]]<br />[[Province of New York]]",
            established_title: "Settled",
            established_date: "1624",
            established_title1: "[[City of Greater New York|Consolidated]]",
            established_date1: "1898",
            established_title2: "",
            government_footnotes: "",
            government_type: "[[Mayor–council government|Mayor–Council]]",
            governing_body: "[[New York City Council]]",
            leader_title: "[[Mayor of New York City|Mayor]]",
            leader_name:
              "[[Bill de Blasio]] ([[Democratic Party (United States)|D]])",
            total_type: "Total",
            unit_pref: "Imperial",
            area_footnotes: '<ref name="GR1" />',
            area_total_sq_mi: "468.484",
            area_land_sq_mi: "302.643",
            area_water_sq_mi: "165.841",
            area_metro_sq_mi: "13318",
            elevation_footnotes:
              '<ref name="GR3">{{cite web |url=http://geonames.usgs.gov |accessdate=January 31, 2008 |title=US Board on Geographic Names |publisher=[[United States Geological Survey]] |date=June 23, 2018}} Search for feature ID 975772.</ref>',
            elevation_m: "10",
            elevation_ft: "33",
            population_rank:
              "[[List of United States cities by population|1st in the U.S.]]",
            population_density_sq_mi: "27,751",
            population_as_of: "[[2010 United States Census|2010]]",
            population_total: "8175133",
            population_footnotes:
              "<ref name=Census2010>[https://www.census.gov Community Facts for New York City] , [[United States Census Bureau]]. Retrieved May 26, 2017.</ref>",
            population_est: "8398748",
            pop_est_as_of: "2018",
            pop_est_footnotes: "<ref name=2018Estimate />",
            population_blank1_title:
              "[[Metropolitan statistical area|MSA (2018)]]",
            population_blank1:
              '19,979,477<ref name="MetroEst">{{cite web|url=https://factfinder.census.gov/bkmk/table/1.0/en/PEP/2017/GCTPEPANNR.US24PR|title=Annual Estimates of the Resident Population: April 1, 2010 to July 1, 2017—Metropolitan Statistical Area; and for Puerto Rico—2017 Population Estimates|publisher=U.S. Census Bureau|accessdate=March 24, 2018|archive-url=https://archive.today/20200213005215/https://factfinder.census.gov/bkmk/table/1.0/en/PEP/2017/GCTPEPANNR.US24PR|archive-date=February 13, 2020|url-status=dead}}</ref> ([[List of metropolitan statistical areas|1st]])',
            population_blank2_title:
              "[[New York metropolitan area|CSA (2018)]]",
            population_blank2:
              "22,679,948<ref name=CombinedEst>{{cite web |url=https://www.census.gov |title=Annual Estimates of the Resident Population: April 1, 2010 to July 1, 2018—Combined Statistical Area; and for Puerto Rico—2017 Population Estimates |publisher=U.S. Census Bureau |accessdate=April 27, 2018 }}</ref> ([[List of Combined Statistical Areas|1st]])",
            population_demonym: "New Yorker",
            blank6_name: "[[GDP]] (City, 2018)",
            blank6_info:
              "$842.3&nbsp;billion<ref name=\"bea.gov\">[https://www.bea.gov/system/files/2019-12/lagdp1219.pdf ''Local Area Gross Domestic Product, 2018''], [[Bureau of Economic Analysis]], released December 17, 2019. Accessed December 12, 2019.</ref> (1st)",
            blank7_name: "[[Gross metropolitan product|GMP]] (Metro, 2020)",
            blank7_info:
              '$2.0&nbsp;trillion<ref name="NYCMetroGMP">{{cite web|url=https://www.statista.com/statistics/183808/gmp-of-the-20-biggest-metro-areas/|title=U.S. metro areas—ranked by Gross Metropolitan Product (GMP) 2020 {{!}} Statistic|website=Statista|accessdate=May 31, 2019}}</ref> (1st)',
            timezone1: "[[Eastern Time Zone|EST]]",
            utc_offset1: "−05:00",
            timezone1_DST: "[[Eastern Time Zone|EDT]]",
            utc_offset1_DST: "−04:00",
            postal_code_type: "[[ZIP Code]]s",
            postal_code: "100xx–104xx, 11004–05, 111xx–114xx, 116xx",
            area_code:
              "[[Area codes 212, 646, and 332|212/646/332]], [[Area codes 718, 347, and 929|718/347/929]], [[Area code 917|917]]",
            blank_name:
              "[[Federal Information Processing Standards|FIPS code]]",
            blank_info: "36-51000",
            blank1_name:
              "[[Geographic Names Information System|GNIS]] feature ID",
            blank1_info: "975772",
            blank2_name: "Major airports",
            blank2_info:
              "[[John F. Kennedy International Airport]], [[Newark Liberty International Airport]], [[LaGuardia Airport]]",
            blank4_name: "[[Commuter rail]]",
            blank4_info:
              "[[LIRR]], [[Metro-North]], [[NJ Transit Rail Operations|NJ Transit]]",
            blank5_name: "[[Rapid transit]]",
            blank5_info:
              "[[New York City Subway|Subway]], [[Staten Island Railway]], [[PATH (rail system)|PATH]]",
            blank_name_sec2:
              "Largest [[Boroughs of New York City|borough]] by area",
            blank_info_sec2: "[[Queens]] {{convert|109|sqmi|km2}}",
            blank1_name_sec2: "Largest borough by population",
            blank1_info_sec2:
              "[[Brooklyn]] (2015 est 2,636,735)<ref name=BrooklynQuickFacts>{{cite web |title=State & County QuickFacts—Kings County (Brooklyn Borough), New York |url=http://quickfacts.census.gov/qfd/states/36/36047.html |publisher=United States Census Bureau |accessdate=March 24, 2016 |archiveurl=https://web.archive.org/web/20160217175357/http://quickfacts.census.gov/qfd/states/36/36047.html |archivedate=February 17, 2016}}</ref>",
            blank2_name_sec2: "Largest borough by [[GDP]] (2018)",
            blank2_info_sec2:
              '[[Manhattan]] $600.2 billion<ref name="bea.gov"/>',
            website: "[https://www.nyc.gov/ NYC.gov]",
            population_density_km2: "10,715"
          }
        ]
      }
    ]
  ]
];

for (const t of wikiLinkTests) {
  simpleTest(...t);
}

for (const t of mediaTests) {
  simpleTest(...t);
}

for (const t of refTests) {
  simpleTest(...t);
}

for (const t of multipleImagesTests) {
  simpleTest(...t);
}
