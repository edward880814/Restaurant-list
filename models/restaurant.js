//- 建立mongoose 連線
const mongoose = require("mongoose");

//- Schema setting
const Schema = mongoose.Schema;
//定義restaurant必要的data structure
const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  name_en: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: [0, "評分最低是0.0"],
    max: [5.0, "評分最高為5.0"],
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  google_map: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
});

//- 匯出Restaurant model
module.exports = mongoose.model("Restaurant", RestaurantSchema);
