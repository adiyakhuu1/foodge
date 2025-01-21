import { Request, Response, Router } from "express";
import { foodCategory_model } from "../models/models";
// import { Token } from "@clerk/backend";
// import { Auth } from "mongodb";
import { verifyToken } from "@clerk/backend";
// import {auth}
// import {}

export const FoodCategoryRouter = Router();

FoodCategoryRouter.get("/", async (req: Request, res: Response) => {
  // console.log({ token });

  // console.log(req.get("auth"));
  // console.log(process.env.CLERK_SECRET_KEY);
  const result = await foodCategory_model.find();
  res.json(result);
});
FoodCategoryRouter.get("/:_id", async (req: Request, res: Response) => {
  if (!req.params) {
    return;
  }
  try {
    const result = await foodCategory_model.find(req.params);
    if (result) {
      res.json(result);
    }
  } catch (err) {
    console.log(err, "error");
    res.json({});
  }
});
FoodCategoryRouter.post("/addnew", async (req: Request, res: Response) => {
  const token = req.get("auth");
  try {
    if (token) {
      const veryified = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
    }
    const body = req.body;
    const addnew = await foodCategory_model.create(body, {
      timeStamp: true,
    });
    const result = await foodCategory_model.find();
    res.json(addnew);
  } catch (e) {
    console.error(e, "adfasd");
  }
});

FoodCategoryRouter.delete("/:id", async (req: Request, res: Response) => {
  const token = req.get("auth");
  try {
    if (token) {
      const veryified = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
    }
    const { id } = req.params;
    const deleteOne1 = await foodCategory_model.findByIdAndDelete(id);
    res.json(deleteOne1);
  } catch (e) {
    console.error(e, "aldaa");
  }
});
FoodCategoryRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.query;
  const token = req.get("auth");
  try {
    if (token) {
      const veryified = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
    }
    const deleteOne1 = await foodCategory_model.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name,
      }
    );

    res.json(deleteOne1);
  } catch (e) {
    console.error(e, "aldaa");
  }
});
