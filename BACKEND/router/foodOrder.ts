import { NextFunction, Request, Response, Router } from "express";
import { FoodOrder_model } from "../models/models";
import { verifyToken } from "@clerk/backend";
import { customRequest } from "./food-category";

export const foodOrderRouter = Router();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.get("auth");
  if (token) {
    const verified = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    const userId = verified.sub;
    next();
    return;
  }
};
foodOrderRouter.post("/", auth, async (req: customRequest, res: Response) => {
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
