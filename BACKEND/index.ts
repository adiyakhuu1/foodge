import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
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

const foodCategory_schema = new mongoose.Schema({
  categoryName: String,
});

const foodCategory_model = mongoose.model(
  "foodCategory",
  foodCategory_schema,
  "food-category"
);

app.get("/", async (req: Request, res: Response) => {
  const result = await foodCategory_model.find();
  res.json(result);
});

app.post("/create", async (req: Request, res: Response) => {
  const body = req.body;
  const newCategory = foodCategory_model.create(body);
  console.log(newCategory);
  const result = await foodCategory_model.find();
  res.json(result);
});

app.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.body;
  const deleteOne = await foodCategory_model.deleteOne({
    _id: id,
  });
  console.log(deleteOne);
  res.json(deleteOne);
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(URI);
});
