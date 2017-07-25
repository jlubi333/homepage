var Metalsmith = require("metalsmith");

var layouts = require("metalsmith-layouts");
var markdown = require("metalsmith-markdown");
var assets = require("metalsmith-assets");
var collections = require("metalsmith-collections");
var permalinks = require("metalsmith-permalinks");

Metalsmith(__dirname)
  .metadata({
    "sitename": "Justin Lubin",
    "main-links":
      [ { "title":
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
            "About Me"
        , "href":
            "/about-me"
        , "children":
            []
        }
      , { "title":
            "Contact"
        , "href":
            "/contact"
        , "children":
            []
        }
    ]
  })
  .source("content")
  .destination("build")
  .clean(true)
  .use(collections({
    "posts": "blog/posts/*.md"
  }))
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
    "default": "post.html",
    "partials": "partials"
  }))
  .use(assets({
    source: 'css',
    destination: 'css'
  }))
  .build(function(err) {
    if (err) {
      throw err;
    }
});
