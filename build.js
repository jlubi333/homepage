var Metalsmith = require("metalsmith");

var archive = require("metalsmith-archive");
var assets = require("metalsmith-assets");
var collections = require("metalsmith-collections");
var dateFormatter = require("metalsmith-date-formatter");
var defaultValues = require("metalsmith-default-values")
var drafts = require("metalsmith-drafts")
var layouts = require("metalsmith-layouts");
var markdown = require("metalsmith-markdown");
var permalinks = require("metalsmith-permalinks");

var marked = require("marked");

////////////////////////////////////////////////////////////////////////////////
// Markdown Rendering

var renderer = new marked.Renderer();

renderer.image = function(src, info, caption) {
  var infoArray = info.split("::");
  var title = infoArray[0];
  var sourceName = infoArray[1];

  var alt = title ? title : caption;

  var sourceString = "";
  if (sourceName) {
    sourceString =
      "<p class='image-source'>\n" +
        "<b>Source:</b> <a href='" + src + "'>" + sourceName + "</a>.\n" +
      "</p>\n";
  }

  return (
    "<figure>\n" +
      "<img src='" + src + "' alt='" + alt + "'>\n" +
      "<figcaption>" +
        "<p class='image-caption'>" + caption + "</p>\n" +
        sourceString +
      "</figcaption>\n" +
    "</figure>\n"
  );
}

renderer.blockquote = function(quoteHtml) {
  // Removes <p> tag
  var quoteText = quoteHtml.substring(3, quoteHtml.length - 3);

  var lastEm = quoteText.lastIndexOf("—"); // em-dash

  var quoteContent;
  var citeString;

  if (lastEm == -1) {
    quoteContent =
      quoteText;
    citeString =
      "";
  } else {
    quoteContent =
      quoteText.substring(0, lastEm);
    citeString =
      "<cite>" + quoteText.substring(lastEm) + "</cite>";
  }

  return (
    "<blockquote>\n" +
        "<p>" + quoteContent + "</p>\n" +
        citeString +
    "</blockquote>\n"
  );
}

////////////////////////////////////////////////////////////////////////////////
// Main Links

var mainLinks =
  [ { "title":
        "About Me"
    , "href":
        "/about-me"
    , "children":
        []
    }
  , { "title":
        "Portfolio"
    , "href":
        "/portfolio"
    , "children":
        []
    }
  , { "title":
        "Blog"
    , "href":
        "/blog"
    , "children":
        [ { "title":
              "Latest Posts"
          , "href":
              "/blog/latest"
          , "children":
              []
          }
        , { "title":
              "Archive"
          , "href":
              "/blog/archive"
          , "children":
              []
          }
        ]
    }
  , { "title":
        "Contact"
    , "href":
        "/contact"
    , "children":
        []
    }
]

////////////////////////////////////////////////////////////////////////////////
// Portfolio

var projects =
  [ { "title": "Camille"
    , "desc": "Camille is an interpreted yet statically-typed programming language implemented in Haskell."
    , "href": "https://github.com/jlubi333/Camille"
    , "img": "camille.png"
    }
  , { "title": "Julina"
    , "desc": "Julina is a linear algebra library written in C."
    , "href": "https://github.com/jlubi333/Julina"
    , "img": "julina.png"
    }
  , { "title": "Fractastic"
    , "desc": "Fractastic is a simple and approachable fractal generator written in C."
    , "href": "https://github.com/jlubi333/fractastic"
    , "img": "fractastic.png"
    }
  , { "title": "JPL Runner"
    , "desc": "JPL Runner is a 2D infinite runner game written in Typescript designed to work well with mobile devices."
    , "href": "https://jlubi333.github.io/jpl-runner/"
    , "img": "jpl-runner.png"
    }
  , { "title": "Bin :: Hex"
    , "desc": "Bin :: Hex is a multiplayer educational game that will improve your binary and hexadecimal conversion skills."
    , "href": "http://binhex.jlub.in"
    , "img": "bin-hex.png"
    }
  , { "title": "jpl :: NHL"
    , "desc": "jpl :: NHL is a simulator for the NHL Draft Lottery."
    , "href": "http://nhl.jlub.in"
    , "img": "jpl-nhl.png"
    }
  , { "title": "Jella"
    , "desc": "Jella is a mathematical modeling system heavily inspired by STELLA (made by isee systems). It is a multi-compartment model simulator."
    , "href": "http://jlubi333.github.io/jpl-dev/jella/"
    , "img": "jella.png"
    }
  , { "title": "Algebraic Operations on Melodies"
    , "desc": "This was my Wolfram Demonstration for the 2015 Mathematica Summer Camp."
    , "href": "http://demonstrations.wolfram.com/AlgebraicOperationsOnMelodies/"
    , "img": "algebraic-operations-on-melodies.png"
    }
  , { "title": "JPL Haiku"
    , "desc": "Need to write a haiku for English class? Look no further."
    , "href": "http://jlubi333.github.io/jpl-dev/jplhaiku/"
    , "img": "jpl-haiku.png"
    }
  , { "title": "JPL Clock"
    , "desc": "What time is it anyway?"
    , "href": "http://jlubi333.github.io/jpl-dev/clock/"
    , "img": "jpl-clock.png"
    }
  , { "title": "Jicobot"
    , "desc": "Jicobot is a finite-state machine inspired by Picobot."
    , "href": "http://jlubi333.github.io/jpl-dev/jicobot/"
    , "img": "jicobot.png"
    }
  , { "title": "MultiPainter"
    , "desc": "Have fun painting with your friends!"
    , "href": "http://jlubi333.github.io/jpl-dev/multipainter/"
    , "img": "multi-painter.png"
    }
  , { "title": "Physicist's Sketchpad"
    , "desc": "Physicist's Sketchpad will solve any related rates problem dealing with triangles by using the arcane magic known as calculus."
    , "href": "http://jlubi333.github.io/jpl-dev/psketch/"
    , "img": "psketch.png"
    }
  , { "title": "Reaction Reactor"
    , "desc": "For when a single reaction image just isn't enough."
    , "href": "http://jlubi333.github.io/ReactionReactor/"
    , "img": "reaction-reactor.png"
    }
  , { "title": "Homework Roulette"
    , "desc": "Teachers, why not add a bit of risk to your homework collection routine?"
    , "href": "http://jlubi333.github.io/jpl-dev/roulette/"
    , "img": "homework-roulette.png"
    }
  ]

////////////////////////////////////////////////////////////////////////////////

Metalsmith(__dirname)
  .metadata(
    { "sitename": "Justin Lubin"
    , "main-links": mainLinks
    , "projects": projects
    }
  )
  .source("content")
  .destination("build")
  .clean(true)
  .use(drafts())
  .use(dateFormatter())
  .use(collections(
    { "posts":
        { "pattern": "blog/posts/*.md"
        , "sortBy": "publishDate"
        , "reverse": true
        }
    }
  ))
  .use(defaultValues(
    [ { "pattern": "blog/posts/*.md"
      , "defaults":
          { "layout": "post.html"
          }
      }
    ]
  ))
  .use(markdown(
    { "renderer": renderer
    , "smartypants": true
    }
  ))
  .use(permalinks(
    { "relative": false
    , "linksets":
        [ { match: { collection: "posts" }
          , pattern: "blog/posts/:title"
          }
        ]
    }
  ))
  .use(layouts(
    { "engine": "handlebars"
    , "default": "main.html"
    , "partials": "partials"
    }
  ))
  .use(assets(
    { source: "css"
    , destination: "css"
    }
  ))
  .use(archive())
  .build(function(err) {
    if (err) {
      throw err;
    }
});
