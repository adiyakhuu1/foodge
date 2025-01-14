import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: String,
});
export const foodCategory_model = mongoose.model(
  "foodCategory",
  foodSchema,
  "food-category"
);
