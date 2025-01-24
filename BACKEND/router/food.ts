import express, { Response, Request, NextFunction } from "express";
import { Router } from "express";
import { food_model } from "../models/models";
import { exists } from "fs";
import { error } from "console";
import { verifyToken } from "@clerk/backend";

export const foodRouter = Router();
const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.get("auth");
  if (token) {
    await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    next();
    return;
  }
  console.log("no");
  res.json({ message: "no" });
};
foodRouter.get("/", async (req: Request, res: Response) => {
  const result = await food_model.find();
  res.json(result);
});
foodRouter.delete("/:_id", auth, async (req: Request, res: Response) => {
  const params = req.params;
  try {
    await food_model.findByIdAndDelete(params);
    res.json({ message: "deleted" });
  } catch (err) {
    console.error("aldaa", err, "aldaa");
  }
});
foodRouter.get("/:category", async (req: Request, res: Response) => {
  if (!req.params) {
    res.json({ message: "no params" });
    return;
  }
  const params = req.params;
  const result = await food_model.find(params);
  res.json(result);
});
foodRouter.get("/:foodId", async (req: Request, res: Response) => {
  if (!req.params) {
    res.json({ message: "no params" });
    return;
  }
  const params = req.params;
  const result = await food_model.find(params);
  res.json(result);
});
foodRouter.put("/:_id", auth, async (req: Request, res: Response) => {
  const params = req.params;
  const body = req.body;

  const newchange = await food_model.findByIdAndUpdate(params, body);
  console.log(newchange);
  res.json(newchange);
});

foodRouter.post("/", auth, async (req: Request, res: Response) => {
  const body = req.body;
  try {
    if (!body) {
      res.json({ message: "aldaa" });
    }
    const newitem = await food_model.create(body);
    //   console.log(newItem);
    res.json(newitem);
  } catch (e) {
    console.error(e, "aldaa");
  }
});
