import { timeStamp } from "console";
import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import { Db } from "mongodb";
const cors = require("cors");
const port = 5000;
import mongoose, { mongo } from "mongoose";
import { FoodCategoryRouter } from "./router/food-category";
import { foodRouter } from "./router/food";
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

// Food Category - Schema
const foodCategory = new mongoose.Schema(
  {
    categoryName: String,
  },
  {
    timestamps: true,
  }
);

// User - Schema
const user = new mongoose.Schema(
  {
    email: String,
    password: String,
    phoneNumber: String,
    address: String,
    // role:
    // orderedFoods:
    ttl: Date,
    isVerified: Boolean,
  },
  {
    timestamps: true,
  }
);
// FoodOrder - Schema
const FoodOrder = new mongoose.Schema(
  {
    // user:
    totalPrice: Number,
    // foodOrderItems:
    // status:
  },
  { timestamps: true }
);
// FoodOrderItem
const FoodOrderItem = new mongoose.Schema({
  // food: ObjectId
  quantity: Number,
});

app.use("/FoodCategory", FoodCategoryRouter);
app.use("/food", foodRouter);

/// irrelevant
// app.post("/createModel", async (req: Request, res: Response) => {
//   const body = req.body;

//   const newCollection = mongoose.model(body.name, foodSchema);
//   console.log(newCollection);
//   // const body.schemaName =
//   const result1 = await newCollection.find();
//   const result2 = await foodCategory_model.find();
//   res.json(result1);
// });
// app.post("/addSchemaToDrinks", async (req: Request, res: Response) => {
//   const body = req.body;
//   drinks.create(body);
//   res.json(drinks);
// });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(URI);
});
