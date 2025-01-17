import mongoose from "mongoose";

const foodcatSchema = new mongoose.Schema({
  name: { type: String },
});
// Food - Schema
const food = new mongoose.Schema(
  {
    foodName: { type: String },
    price: { type: Number },
    image: { type: String },
    ingredients: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodCategory",
    },
  },
  { timestamps: true }
);

export const foodCategory_model = mongoose.model(
  "foodCategory",
  foodcatSchema,
  "food-category"
);
export const food_model = mongoose.model("food", food, "foods");
