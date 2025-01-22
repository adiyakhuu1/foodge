import { timeStamp } from "console";
import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import { Db } from "mongodb";
const cors = require("cors");
const port = 5000;
import mongoose, { mongo } from "mongoose";
import { FoodCategoryRouter } from "./router/food-category";
import { foodRouter } from "./router/food";
import { accountRouter } from "./router/accountRouter";
configDotenv();
const URI = process.env.NEXT_PUBLIC_DB_PASSWORD;
const app = express();
app.use(cors());
app.use(express.json());
const connectToDb = async () => {
  if (!URI) {
    return console.log("aldaa 1");
  }
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.error(err, "error");
  }
};
connectToDb();

const foodCategory = new mongoose.Schema(
  {
    categoryName: String,
  },
  {
    timestamps: true,
  }
);

const user = new mongoose.Schema(
  {
    email: String,
    password: String,
    phoneNumber: String,
    address: String,
    ttl: Date,
    isVerified: Boolean,
  },
  {
    timestamps: true,
  }
);
const FoodOrder = new mongoose.Schema(
  {
    totalPrice: Number,
  },
  { timestamps: true }
);
const FoodOrderItem = new mongoose.Schema({
  // food: ObjectId
  quantity: Number,
});

app.use("/FoodCategory", FoodCategoryRouter);
app.use("/food", foodRouter);
app.use("/account", accountRouter);
app.use("/foodOrder", accountRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(URI);
});
