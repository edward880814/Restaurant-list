//! require router
const router = require("express").Router();
//-! require Restaurant model
const Restaurant = require("../../models/restaurant");

//! search for certain restaurants
router.get("/", (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim();
  let { sort } = req.query;
  const lastSort = sort;
  if (sort === "asc" || sort === "desc") {
    //- 如果是升降冪，使用英文字排序
    sort = { name_en: sort };
  }
  //- search by rating (若輸入數字)
  if (!isNaN(Number(keyword))) {
    return Restaurant.find({ rating: { $gte: Number(keyword) } })
      .lean()
      .collation({ locale: "en" }) //- 使用英文字母排序
      .sort(sort)
      .then((restaurants) => {
        if (!restaurants.length) {
          return res.render("error", { keyword, lastSort });
        }
        return res.render("index", { restaurants, keyword, lastSort });
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
    .collation({ locale: "en" }) //- 使用英文字母排序
    .sort(sort)
    .then((restaurants) => {
      if (!restaurants.length) {
        return res.render("error", { keyword, lastSort });
      }
      return res.render("index", { restaurants, keyword, lastSort });
    })
    .catch((err) => console.log(err));
});

//! exports router
module.exports = router;
