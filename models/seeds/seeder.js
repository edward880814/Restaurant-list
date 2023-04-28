const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
//- 引入Restaurant model
const Restaurant = require("../restaurant");//..代表相對路徑中指向上一層目錄
const User = require('../user')
const db = require("../../config/mongoose")
//- require restaurant json file
const restaurantSeed = require("../../restaurant.json")
const restaurants = restaurantSeed.results

const SEED_USER = {
  user1: {
    email: 'user1@example.com',
    password: '12345678',
    restaurantId: [1, 2, 3]
  },
  user2: {
    email: 'user2@example.com',
    password: '12345678',
    restaurantId: [4, 5, 6]
  }
}

db.once("open", () => {
  for (let key in SEED_USER) {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[key].password, salt))
      .then(hash => User.create({
        email: SEED_USER[key].email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        let userRestaurant = restaurants.filter(restaurants => SEED_USER[key].restaurantId.includes(restaurants.id))
        return Promise.all(Array.from(
          { length: userRestaurant.length },
          (_, i) => {
            let { name, name_en, category, image, location, phone, google_map, rating, description } = userRestaurant[i]
            Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
          }))
      })
      .then(() => {
        console.log(`${key} DB done`)
      })
  }
})
