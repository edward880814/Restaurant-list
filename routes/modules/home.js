//! require router 
const router = require("express").Router()
//! require Restaurant model
const Restaurant = require("../../models/restaurant");

//- home page
router.get("/", (req, res) => {
  //- 取出所有餐廳資料
  return Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((err) => console.log(err));
});


//! exports router
module.exports = router