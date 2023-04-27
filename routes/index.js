//! 總路由器
const router = require("express").Router();
//! require modules route
const homeRoute = require("./modules/home");
const restaurantRoute = require("./modules/restaurants");
const searchRoute = require("./modules/search");
const users = require('./modules/users')//add this

//- connect to modules route
router.use("/", homeRoute);
router.use("/restaurants", restaurantRoute);
router.use("/search", searchRoute);
router.use('/users', users)  // add this

//! route for not found (undefined route)
router.get("*", (req, res) => {
  res.render("error");
});

module.exports = router;
