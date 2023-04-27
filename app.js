const express = require("express");
const session = require('express-session');
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
//! require index router
const router = require("./routes/index");

const usePassport = require('./config/passport')
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

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

//! router middleware
app.use(router);

//! listen to server
app.listen(port, () => {
  console.log(`Server is listening to http://localhost:${port}`);
});
