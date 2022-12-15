//- 引入Restaurant model
const Restaurant = require("../restaurant");
//- require ressttaurant json file
const restaurantSeed = require("../../restaurant.json").results;
//! connect to db
const db = require("../../config/mongoose")
db.once("open", () => {
  //- 連線後加入種子資料
  // restaurantSeed.forEach((restaurant) => {
  //   Restaurant.create({
  //     name: restaurant.name,
  //     name_en: restaurant.name_en,
  //     category: restaurant.category,
  //     image: restaurant.image,
  //     location: restaurant.location,
  //     phone: restaurant.phone,
  //     google_map: restaurant.google_map,
  //     rating: restaurant.rating,
  //     description: restaurant.description,
  //   });
  // });
  //- 方法二，種子資料結果屬於array使用insertMany一並加入
  Restaurant.insertMany(restaurantSeed);
  console.log("Seed data added successfully!!");
});
