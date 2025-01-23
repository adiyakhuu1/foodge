import { Request, Response, Router } from "express";
import { FoodOrder_model } from "../models/models";

export const foodOrderRouter = Router();

foodOrderRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const newOrder = await FoodOrder_model.create(body);
    res.json(newOrder);
  } catch (e) {
    console.log(e, "aldaa");
  }
});
foodOrderRouter.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await FoodOrder_model.find();
    res.json(orders);
  } catch (e) {
    console.log(e, "aldaa");
  }
});
