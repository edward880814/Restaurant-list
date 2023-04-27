//! 總路由器
const router = require("express").Router();
//! require modules route
const homeRoute = require("./modules/home");
const restaurantRoute = require("./modules/restaurants");
const searchRoute = require("./modules/search");
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use("/", authenticator, homeRoute)
router.use("/restaurants", authenticator, restaurantRoute)
router.use("/search", authenticator, searchRoute)


//! route for not found (undefined route)
router.get("*", (req, res) => {
  res.render("error");
});

module.exports = router;
