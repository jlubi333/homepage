var Metalsmith = require("metalsmith");

var archive = require("metalsmith-archive");
var assets = require("metalsmith-assets");
var collections = require("metalsmith-collections");
var default_values = require("metalsmith-default-values")
var drafts = require("metalsmith-drafts")
var layouts = require("metalsmith-layouts");
var markdown = require("metalsmith-markdown");
var permalinks = require("metalsmith-permalinks");

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
    , "href": "http://jlub.in/jpl-runner"
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
    , "href": "http://dev.jlub.in/jella"
    , "img": "jella.png"
    }
  , { "title": "Algebraic Operations on Melodies"
    , "desc": "This was my Wolfram Demonstration for the 2015 <i>Mathematica</i> Summer Camp."
    , "href": "http://demonstrations.wolfram.com/AlgebraicOperationsOnMelodies/"
    , "img": "algebraic-operations-on-melodies.png"
    }
  , { "title": "JPL Haiku"
    , "desc": "Need to write a haiku for English class? Look no further."
    , "href": "http://dev.jlub.in/jplhaiku"
    , "img": "jpl-haiku.png"
    }
  , { "title": "JPL Clock"
    , "desc": "What time is it anyway?"
    , "href": "http://dev.jlub.in/clock"
    , "img": "jpl-clock.png"
    }
  , { "title": "Jicobot"
    , "desc": "Jicobot is a finite-state machine inspired by Picobot."
    , "href": "http://dev.jlub.in/jicobot"
    , "img": "jicobot.png"
    }
  , { "title": "MultiPainter"
    , "desc": "Have fun painting with your friends!"
    , "href": "http://dev.jlub.in/multipainter"
    , "img": "multi-painter.png"
    }
  , { "title": "Physicist's Sketchpad"
    , "desc": "Physicist's Sketchpad will solve any related rates problem dealing with triangles by using the arcane magic known as calculus."
    , "href": "http://dev.jlub.in/psketch"
    , "img": "psketch.png"
    }
  , { "title": "Reaction Reactor"
    , "desc": "For when a single reaction image just isn't enough."
    , "href": "http://jlub.in/ReactionReactor"
    , "img": "reaction-reactor.png"
    }
  , { "title": "Homework Roulette"
    , "desc": "Teachers, why not add a bit of risk to your homework collection routine?"
    , "href": "http://dev.jlub.in/roulette"
    , "img": "homework-roulette.png"
    }
  ]

////////////////////////////////////////////////////////////////////////////////

Metalsmith(__dirname)
  .metadata({
    "sitename": "Justin Lubin",
    "main-links": mainLinks,
    "projects": projects
  })
  .source("content")
  .destination("build")
  .clean(true)
  .use(drafts())
  .use(collections({
    "posts": "blog/posts/*.md",
  }))
  .use(default_values([
    { "pattern": "blog/posts/*.md"
    , "defaults":
        { "layout": "post.html"
        }
    }
  ]))
  .use(markdown())
  .use(permalinks({
    "relative": false,
    "linksets":
      [ { match: { collection: "posts" }
        , pattern: "blog/posts/:title"
        }
      ]
  }))
  .use(layouts({
    "engine": "handlebars",
    "default": "main.html",
    "partials": "partials"
  }))
  .use(assets({
    source: 'css',
    destination: 'css'
  }))
  .use(archive())
  .build(function(err) {
    if (err) {
      throw err;
    }
});
