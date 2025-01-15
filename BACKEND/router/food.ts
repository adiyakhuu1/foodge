import express, { Response, Request } from "express";
import { Router } from "express";
import { food_model } from "../models/models";

export const foodRouter = Router();

foodRouter.get("/", async (req: Request, res: Response) => {
  const result = await food_model.find();
  res.json(result);
});

foodRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  if (!body) {
    res.json({ message: "aldaa" });
  }
  const newitem = await food_model.create(body);
  //   console.log(newItem);
  res.json(newitem);
});
