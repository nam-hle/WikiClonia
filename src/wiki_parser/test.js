// import { main, Global } from "./index.js";
import { main, clean } from "./";
import { new_york, supper } from "./test_input";
// let m = require("./index.js");

// let main = m.main;
// let clean = m.clean;

const simpleTest = (description, input, expected) => {
  let actual = main(input).children;
  let trulyExpected = expected.map(e =>
    typeof e === "string" ? { elementName: "Text", text: e } : e
  );
  test(`Should work with ${description}`, () => {
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

test(`Should work with pet door article`, () => {
  const input =
    "[[File:Doggy door exit.JPG|thumb|A dog exiting through a pet door]]\nA '''pet door''' or '''pet flap''' (also referred to in more specific terms, such as '''cat flap''', '''cat door''', '''dog door''', or '''doggy door''') is a small opening to allow [[pet]]s to enter and exit a building on their own without needing a human to open the door.  Originally simple holes, the modern form is a hinged and often spring-loaded panel or flexible flap, and some are electronically controlled.  They offer a degree of protection against wind, rain, and larger-bodied intruders entering the dwelling. Similar hatches can let dogs through fences at stiles. A related concept is the '''pet gate''', which is easy for humans to open but acts as a secure pet barrier, as well as the '''automated left- or right-handed pet doors'''.<ref>{{Cite web|url=http://www.gizmag.com/passive-house-petwalk-door/31162/|title=World's first Passive House-certified pet door unveiled at Ecobuild 2014|website=www.gizmag.com|access-date=2016-07-07}}</ref>\n\n==Purpose==\nA pet door is found to be convenient by many owners of companion animals, especially dogs and cats, because it lets the pets come and go as they please, reducing the need for pet-owners to let or take the pet outside manually, and curtailing unwanted behaviour such as loud vocalisation to be let outside, scratching on doors or walls, and (especially in the case of dogs) [[Excretion|excreting]] in the house. They also help to ensure that a pet left outdoors can safely get back into the house in the case of inclement weather.\n\n==Features==\n[[File:Cat flap.jpg|thumb|A cat flap in action]]\nThe simplest type are bottom-weighted flaps hung from the top of the opening, which swing shut on their own, but may be spring-aided to increase wind resistance. These flaps often feature magnets around the edges to help keep the door closed against weather and wind. Some pet doors have side-mounted hinges and swing open like saloon doors. These pet doors usually have a spring or other contrivance to force their closure after the pet has gone through. Instead of a rubber flap, saloon style doors are often made from plastic, acrylic, or plexiglass, and the panels are fitted with weather seal to help keep weather outside.\n\nAnother common feature is an adjustable catch to restrict the opening of the device to either one direction or the other; for example, to allow the pet to come in for the night, but not go out again until the owner releases the catch the next morning. Some pets, mostly cats with their retractile claws and flexible paws, learn to circumvent one-way pet doors, especially the \"flap-within-flap\" design.\n\nMost also have a locking mechanism of some kind, and can be closed off by sliding a rigid plate into parallel rails on the left and right of the interior side of the pet door, useful during bad weather or when the owners are traveling with their pets.\n\nPet doors are generally designed to be safe for any pet.  The panels are often designed with soft [[Polyvinyl chloride|vinyl]] that does not trap or injure the animal. Cheap, easily replaceable pet doors are made from plastic and may not always be robust enough for large, boisterous pets.\n\nPet doors are most often fitted in a plywood or plastic paneled door, into which it is straightforward to cut a large round hole, but can also be fitted in brickwork or (if a sealed unit is obtained with the hole already provided) in a double glazed door.  The latter is a relatively expensive option but may be the only alternative in some cases. Removable pet doors suitable for [[sliding glass door]]s are also available.\n\nInnovation has contributed to a new generation of more expensive pet doors making use of specific materials, automation, time control devices, and/or sophisticated sensors to deal with common problems like poor insulation and drafts, higher noise levels, insufficient pet safety and access difficulties.<ref>{{Cite web|url=http://www.trendhunter.com/trends/pet-door|title=Automated Pet Doors : pet door|access-date=2016-07-07}}</ref><ref>{{Cite web|url=http://www.ubergizmo.com/2014/03/petwalk-automatic-pet-door-prevents-wet-paw-marks-around-the-home/|title=PetWALK Automatic Pet Door Prevents Wet Paw Marks Around The Home|date=2014-03-13|website=Ubergizmo|language=en-US|access-date=2016-07-07}}</ref>\n\n==History==\nThe ''[[Oxford English Dictionary]]'' records the first use of the phrase \"cat flap\" in 1957 and \"cat door\" in 1959,<ref>''Oxford English Dictionary'' (full ed.), 2005.</ref> but the idea is much older.\n\n[[File:Gatera de ademuz.jpg|thumb|left|A ''{{lang|es|gatera}}'' (farm cat hole) in [[Rincón de Ademuz]], Valencia, Spain]]\nIn rural areas, cat doors (often simple holes) in the walls, doors or even roofs of grain and flour storage spaces have long been used to welcome [[feral cat]]s to hunt rodent pests that feed on these stores. Human semi-domestication of [[wildcat]]s dates back to at least 7,500 BC in [[Cyprus]],<ref name=\"NatGeo 2004\">{{cite web\n |title=Oldest Known Pet Cat? 9500-year-old Burial Found on Cyprus\n |url= http://news.nationalgeographic.com/news/2004/04/0408_040408_oldestpetcat.html\n |accessdate=March 6, 2007\n |date=April 8, 2004\n |work=National Geographic News\n |publisher=National Geographic Society\n}}</ref> and the domestic cat was a part of everyday life in grain-dependent [[ancient Egypt]] (ca. 6,000 BC onward).  In modern times, this function is mostly lost, but in some rural areas, such as [[Valencia, Spain|Valencia]], Spain, and [[Vaunage]], France, farm cat doors and holes ({{lang-es|gateras}}, {{lang-fr|chatières}}) are still common.\n\nThe 14th-century [[English literature|English]] writer [[Geoffrey Chaucer]] described a simple cat hole in the \"Miller's Tale\" from his ''[[Canterbury Tales]]'' (late 14th century). In the narrative, a servant whose knocks go unanswered uses the cat door to peek in:<blockquote>{{lang|enm|An hole he foond, ful lowe upon a bord<br />Ther as the cat was wont in for to crepe,<br />And at the hole he looked in ful depe,<br />And at the last he hadde of hym a sighte.}}</blockquote>\n\nIn an apparent [[Early modern period|early modern]] example of [[urban legend]], the invention of the pet door was attributed to [[Isaac Newton]] (1642&ndash;1727) in a story (authored anonymously and published in a column of anecdotes in 1893) to the effect that Newton foolishly made a large hole for his adult cat and a small one for her kittens, not realizing the kittens could use the large hole as well.<ref>{{Cite web\n |title=Random Readings: Philosophy and Common Sense\n |author=Anonymous (\"The Country Parson\")<!--Not to be confused with Frank A. Clark who used that name in the 1960s!-->\n |editor=E. H. Sears & Rufus Ellis\n |work=The Monthly Religious Magazine\n |year=1863\n |volume=29-30\n |page=298\n |publisher=Leonard C. Bowles Press\n |location=Boston, MA\n |url= https://books.google.com/books?id=PXYUAAAAYAAJ&pg=PA298\n}}</ref> Two Newton biographers cite passages saying that Newton kept \"neither cat nor dog in his chamber\".<ref>Brodetsky, S. (2007) [first pub. 1927]. ''Sir Isaac Newton''. Upton Press. p. 100. {{ISBN|1406769991}}.</ref><ref>More, Louis Trenchard (1937). ''Isaac Newton: a Biography''. C. Scribner's Sons.</ref> Yet over 60 years earlier, a member of Newton's alma mater Trinity College, one J. M. F. Wright, reported this same story (from an unknown source) in his 1827 memoir, adding: \"Whether this account be true or false, indisputably true is it that there are in the door to this day two plugged holes of the proper dimensions for the respective egresses of cat and kitten.\"<ref>Wright, J. F. M. (1827). ''Alma Mater''. Volume 1. p. 17.</ref>\n\nModern cat flaps are popular in some countries, even in urban environments, particularly the [[United Kingdom]] where it is estimated that about 74% of cats have access to the outdoors.<ref>{{cite web|url=http://www.petplan.co.uk/petcensus/censusinfo.pdf |title=Petplan Pet Census 2011 |publisher=Petplan |page=15 |accessdate=September 11, 2012}}</ref>\n\nDog doors are common in suburban North America, where they mostly lead to fenced-in yards.  Pet doors are also common between suburban homes and their attached garages, so that pet-related mess (cat box, dog food, etc.) can be kept in the garage with pets having free access.\n\n==Electronic pet doors==\n[[File:Wall mounted catflap.jpg|thumb|200px|A [[Integrated circuit|microchip]]-enabled, selective-access cat and small dog door running through a wall]]\nSeveral types of pet doors that allow selective access are available. The advantages of this type of pet door over simpler models are improved weather resistance, and home security against strays and other unwanted animals. Some use a [[permanent magnet]] mounted on the pet's collar to activate a matching [[electromagnet]]ic mechanism that unlatches the door panel when the magnet comes within range; several pets can be fitted with collars that match the same door. Pet doors with [[Consumer IR|infrared]] locks open only when a collar-mounted device transmits the correct code to the latch's receiver, allowing owners to have multiple flaps that different pets can use, e.g. a small cat flap to the back yard and a large dog door accessing a [[dog run]].  Either type can be used to selectively allow one pet outside access, while denying it to another (e.g., an ill animal that needs to stay indoors).\n\nSome of the newest models use [[radio-frequency identification]] to electronically read a pet's [[Microchip implant (animal)|microchip implant]]. This removes the need for a cat to wear a collar, which could become lost. Other high-end doors use a key with RFID. The key is attached to the pet's collar, and the electric door only opens for the assigned keys.\n\n==Dog stiles==\n[[File:Dog door demonstration - geograph.org.uk - 718920.jpg|thumb|left|A man lets a dog through the lift-up hatch at a stile in [[Medway]], [[England]].|247x247px]]\nIn [[England]], [[Ireland]], and other areas with large numbers of livestock fences and walls in areas through which people walk on footpaths, [[stile]]s often have wooden, lift-up dog hatchways next to them, because dogs are not good at climbing stile steps and are often too heavy to lift over a fence.\n\n==Pet gates==\nA related idea to the pet door is the pet gate, an easily human-operated portal that keeps pets in (or out) and thwarts their attempts to open it by using a thumb-operated switch or a smooth door handle, and which is tall enough that it cannot be jumped over by the type of pet for which it was designed. Styles vary, but they are typically made of wooden or metal bars or a wire lattice, and have adjustable widths so that they can be used to span arbitrary entrances, hallways or windows. Common uses are to keep pets inside while ventilating a room by opening an unscreened door, or keeping pets out of a baby's room or a dining area.{{clear|left}}\n\n==Pet barriers==\nPet barriers are typically made of fabric and are especially used to secure staircases.<ref>{{cite web|last1=Woods|first1=Amanda|title=7 Important Measures to Pet Proof Your Home|url=https://medium.com/@woodsamanda399/7-important-measures-to-pet-proof-your-home-bdd3e33ae4c8|accessdate=23 August 2017}}</ref> They are available in banister-to-banister and wall-to-banister options and are customizable and portable.\n\n== References ==\n{{reflist}}\n\n{{Commons category|Pet doors}}\n\n[[Category:Door furniture]]\n[[Category:Pet equipment]]";
  expect(main(input)).toMatchSnapshot();
});

test(`Should work with new york article`, () => {
  expect(main(new_york)).toMatchSnapshot();
});

test(`Should work with last supper article`, () => {
  expect(main(supper)).toMatchSnapshot();
});
