//! require express
const express = require("express");
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
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//! load static files
app.use(express.static("public"));
//! body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
//! method-override middleware
app.use(methodOverride("_method"));
//! router middleware
app.use(router)


//! listen to server
app.listen(port, () => {
  console.log(`Server is listening to http://localhost:${port}`);
});
