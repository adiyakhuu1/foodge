import { configDotenv } from "dotenv";
import express, { Express, Response, Request } from "express";
const mongoose = require("mongoose");
configDotenv();
const URI = `mongodb+srv://myasglpzghoo:<${process.env.DB_PASSWORD}>@cluster0.imwim.mongodb.net/food-delivery?retryWrites=true&w=majority&appName=Cluster0`;
const app: Express = express();
app.use(express.json());
const fetchDb = async () => {
  if (!URI) {
    return;
  }
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.error("error lol", err);
  }
};
fetchDb();
const schema = new mongoose.Schema({
  categoryName: String,
});
const model = mongoose.model("foodCategory", schema, "food-category");
app.get("/", (Req: Request, res: Response) => {
  const getTheItems = model.find();
  res.json(getTheItems);
});

const port = 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(URI);
});
