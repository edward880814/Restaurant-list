//- 引入Restaurant model
const Restaurant = require("../restaurant");//..代表相對路徑中指向上一層目錄
//- require resstaurant json file
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
  
  Restaurant.insertMany(restaurantSeed);
  console.log("Seed data added successfully!!");
});
