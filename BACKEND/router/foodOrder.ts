import { NextFunction, Request, Response, Router } from "express";
import { FoodOrder_model } from "../models/models";
import { verifyToken } from "@clerk/backend";
import { customRequest } from "./food-category";

export const foodOrderRouter = Router();

const auth = async (req: customRequest, res: Response, next: NextFunction) => {
  const token = req.get("auth");
  try {
    if (token) {
      const verified = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
      req.userId = verified.sub;
      next();
      return;
    }
  } catch (e) {
    console.error(e, "aldaa");
  }
};
foodOrderRouter.post("/", auth, async (req: customRequest, res: Response) => {
  const body = req.body;
  try {
    const newOrder = await FoodOrder_model.create({
      ...body,
    });
    res.json({ message: "success", newOrder });
  } catch (e) {
    console.log(e, "aldaa 2");
    res.json({ message: "aldaa" });
  }
});
foodOrderRouter.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await FoodOrder_model.find().populate("user");
    res.json(orders);
  } catch (e) {
    console.log(e, "aldaa 2");
  }
});
foodOrderRouter.put("/:id", async (req: customRequest, res: Response) => {
  const body = req.body;

  console.log(req.params.id);
  try {
    const Order = await FoodOrder_model.findByIdAndUpdate(req.params.id, body);
    console.log("it worked", Order);
    res.json({ message: "success", Order });
  } catch (e) {
    console.log(e, "aldaa 2");
    res.json({ message: "aldaa" });
  }
});
