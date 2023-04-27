//! require express
const express = require("express");
const session = require('express-session');

// - require express-handlebars
const exphbs = require("express-handlebars");
//- require bodyparser
const bodyParser = require("body-parser");
//- require method-override
const methodOverride = require("method-override");
//! require index router
const router = require("./routes/index");
//! connect to db
require("./config/mongoose");

const app = express();
const port = 3000;

//! template engine setting
const hbs = exphbs({
  defaultLayout: "main",
  //- create custom helper
  helpers: {
    isLastSelect(lastSort, sort) {
      return lastSort === sort ? "selected" : "";
    },
  },
});
app.engine("handlebars", hbs);
app.set("view engine", "handlebars");

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

//! load static files
app.use(express.static("public"));
//! body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
//! method-override middleware
app.use(methodOverride("_method"));


//! router middleware
app.use(router);

//! listen to server
app.listen(port, () => {
  console.log(`Server is listening to http://localhost:${port}`);
});
