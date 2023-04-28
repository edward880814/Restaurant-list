//! require router 
const router = require("express").Router()
//! require Restaurant model
const Restaurant = require("../../models/restaurant");

//- home page
router.get("/", (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId }) 
    .lean()
    .sort({ _id: 'asc' })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((err) => console.log(err));
});


//! exports router
module.exports = router