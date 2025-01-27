import express, { Response, Request } from "express";
import { Router } from "express";
import { food_model } from "../models/models";
import { exists } from "fs";
import { error } from "console";
import { verifyToken } from "@clerk/backend";

export const foodRouter = Router();

foodRouter.get("/", async (req: Request, res: Response) => {
  const result = await food_model.find();
  res.json(result);
});
foodRouter.delete("/:_id", async (req: Request, res: Response) => {
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
foodRouter.put("/:_id", async (req: Request, res: Response) => {
  const params = req.params;
  const body = req.body;
  const token = req.get("auth");
  try {
    if (token) {
      const veryified = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
    }
    await food_model.findByIdAndUpdate(params, body);
    console.log(params);
    res.json(params);
  } catch (err) {
    console.log(err, "aldaa zaalaa");
  }
});

foodRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const token = req.get("auth");
  try {
    if (token) {
      const veryified = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
    }
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
foodRouter.put("/testing/replaceall", async (req: Request, res: Response) => {
  try {
    const result = await food_model.updateMany(
      { image: { $exists: true } },
      { image: "" }
    );
    res.json({
      message: "success",
      result,
    });
  } catch (e) {
    console.error(e, "error");
    res.status(500).json({
      message: "error 500",
    });
  }
});
