//! require express
const express = require("express");
const app = express();
const port = 3000;
// - require express-handlebars
const exphbs = require("express-handlebars");
//- require Restaurant model
const Restaurant = require("./models/restaurant");
//! require mongoose
const mongoose = require("mongoose");

//! connect to db
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); //- 僅在非正式環境時使用dotenv
}

mongoose.connect(process.env.MONGOOSE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("MongoDB connect error!!!");
});
db.once("open", () => {
  console.log("MongoDB connected successfully!!!");
});

//! template engine setting
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//! load static files
app.use(express.static("public"));

//! set server route
app.get("/", (req, res) => {
  //- 取出所有餐廳資料
  return Restaurant.find()
    .lean()
    .then((restaurant) => res.render("index", { restaurant }))
    .catch((err) => console.log(err));
});

app.get("/restaurants/:_id", (req, res) => {
  //- get restaurant detail
  const { _id } = req.params;
  //- 透過id查詢導向對應餐廳資料，將查詢結果傳回給show頁面
  Restaurant.findById(_id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((err) => console.log(err));
});

//- 導向新增餐廳頁面
app.get("/restaurants/new", (req, res) => {});

//- search for certain restaurants
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim();
  let restaurant = restaurantList.filter(
    (item) =>
      item.name.toLowerCase().trim().includes(keyword) ||
      item.name_en.toLowerCase().trim().includes(keyword) ||
      item.category.trim().includes(keyword)
  );
  //! search by rating
  if (!isNaN(Number(keyword))) {
    restaurant = restaurantList.filter(
      (item) => item.rating >= Number(keyword)
    );
  }
  //! 若找不到restaurant顯示error頁面
  if (!restaurant.length) {
    res.render("error");
  } else {
    res.render("index", { restaurant, keyword });
  }
});

//! route for not found
app.get("*", (req, res) => {
  res.render("error");
});

//! listen to server
app.listen(port, () => {
  console.log(`Server is listening to http://localhost:${port}`);
});
