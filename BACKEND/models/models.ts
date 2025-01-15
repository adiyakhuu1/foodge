import mongoose from "mongoose";

const foodcatSchema = new mongoose.Schema({
  name: String,
});
// Food - Schema
const food = new mongoose.Schema(
  {
    foodName: String,
    price: Number,
    image: String,
    ingredients: String,
    category: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

export const foodCategory_model = mongoose.model(
  "foodCategory",
  foodcatSchema,
  "food-category"
);
export const food_model = mongoose.model("food", food, "foods");
