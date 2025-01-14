import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import { Db } from "mongodb";
const cors = require("cors");
const port = 5000;
import mongoose from "mongoose";
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

const common_schema = new mongoose.Schema({
  categoryName: String,
});
const foodSchema = new mongoose.Schema({
  name: String,
  category: String,
  vegen: Boolean,
});

const foodCategory_model = mongoose.model(
  "foodCategory",
  foodSchema,
  "food-category"
);
const drinks = mongoose.model("drinks", common_schema, "drinks");
// const Drinks_Models = mongoose.model("drinks", Drinks_Schema);

app.get("/", async (req: Request, res: Response) => {
  const result = await drinks.find();
  res.json(result);
});

app.post("/create", async (req: Request, res: Response) => {
  // const body = req.body;?
  const newCategory = foodCategory_model.create(req.body);
  console.log(newCategory);
  const result = await foodCategory_model.find();
  res.json(result);
});
app.post("/createModel", async (req: Request, res: Response) => {
  // type body = {
  //   name: string;
  //   category: string;
  //   vegan: boolean;
  // };
  const body = req.body;

  const newCollection = mongoose.model(body.name, foodSchema);
  console.log(newCollection);
  // const body.schemaName =
  const result1 = await newCollection.find();
  const result2 = await foodCategory_model.find();
  res.json(result1);
  res.json(result2);
});
app.post("/addSchemaToDrinks", async (req: Request, res: Response) => {
  const body = req.body;
  drinks.create(body);
  res.json(drinks);
});

app.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteOne1 = await foodCategory_model.deleteOne({
    _id: id,
  });
  const deleteOne2 = await drinks.deleteOne({
    _id: id,
  });
  res.json(deleteOne2);
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(URI);
});
