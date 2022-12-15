//! require router
const router = require("express").Router();
//-! require Restaurant model
const Restaurant = require("../../models/restaurant");

//! search for certain restaurants
router.get("/search", (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim();
  //- 尋找包含keyword的餐廳

  //- search by rating (若輸入數字)
  if (!isNaN(Number(keyword))) {
    return Restaurant.find({ rating: { $gte: Number(keyword) } })
      .lean()
      .then((restaurants) => {
        if (!restaurants.length) {
          return res.render("error", { keyword });
        }
        return res.render("index", { restaurants, keyword });
      })
      .catch((err) => console.log(err));
  }

  //- 如果輸入文字
  return Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { name_en: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
    ],
  })
    .lean()
    .then((restaurants) => {
      if (!restaurants.length) {
        return res.render("error", { keyword });
      }
      return res.render("index", { restaurants, keyword });
    })
    .catch((err) => console.log(err));
});

//! exports router
module.exports = router;
