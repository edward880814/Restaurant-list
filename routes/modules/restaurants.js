//! require router
const router = require("express").Router();
//! require Restaurant model
const Restaurant = require("../../models/restaurant");
//- require checkFormInput
const checkFormInput = require("../../checkFormInput");
//- 導向新增餐廳頁面
router.get("/new", (req, res) => {
  //- 查找目前已有種類
  return Restaurant.find({}, { _id: 0, category: 1 })
    .lean()
    .then((categoriesInDB) => {
      const categories = categoriesInDB
        .map((category) => category.category)
        //- 移除重複項目
        .filter(
          (category, index, mappedArr) => mappedArr.indexOf(category) === index
        );
      return res.render("new", { categories });
    })
    .catch((err) => console.log(err));
});
//- 接收新增餐廳請求
router.post("/", (req, res) => {
  const userId = req.user._id
  const restaurant = req.body
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  //- check form input
  const errMessage = checkFormInput(restaurant);
  if (errMessage) {
    return res.render("new", {
      errMessage,
      restaurant,
    });
  }
  //- create new restaurant in db and redirect to index page
  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId//這樣子建立資料後就會綁定userId了
  })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/:_id", (req, res) => {
  const userId = req.user._id
  const { _id } = req.params;
  //- 透過id查詢導向對應餐廳資料，將查詢結果傳回給show頁面
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((err) => console.log(err));
});

//- 導向修改頁面
router.get("/:_id/edit", (req, res) => {
  const userId = req.user._id
  const { _id } = req.params;
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => {
      return Restaurant.find({}, { _id: 0, category: 1 })
        .lean()
        .then((categoriesInDB) => {
          const categories = categoriesInDB
            .map((category) => category.category)
            .filter(
              (category, index, mappedArr) =>
                mappedArr.indexOf(category) === index
            );
          return res.render("edit", { restaurant, _id, categories });
        });
    })
    .catch((err) => console.log(err));
});

//- 接收修改請求(使用method-override修改為put請求)
router.put("/:_id", (req, res) => {
  const userId = req.user._id
  const { _id } = req.params;
  const restaurant = req.body;
  //- check form input
  const errMessage = checkFormInput(restaurant);
  if (errMessage) {
    return res.render("edit", {
      errMessage,
      restaurant,
      _id,
    });
  }
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => {
      //- 取得資料後修改並儲存
      for (const prop in req.body) {
        restaurant[prop] = req.body[prop];
      }
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((err) => console.log(err));
});

//- 接收delete請求(使用method-override修改為delete請求)
router.delete("/:_id", (req, res) => {
  const userId = req.user._id
  const { _id } = req.params;
  return (
    Restaurant.findOne({ _id, userId })
      //- 找到對應資料並刪除，重新導向
      .then((restaurant) => restaurant.remove())
      .then(() => res.redirect("/"))
      .catch((err) => console.log(err))
  );
});


//! exports router
module.exports = router