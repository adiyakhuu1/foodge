import { Request, Response, Router } from "express";
import { foodCategory_model } from "../models/models";

export const FoodCategoryRouter = Router();

FoodCategoryRouter.get("/", async (req: Request, res: Response) => {
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
  const body = req.body;
  await foodCategory_model.create(body, {
    timeStamp: true,
  });
  const result = await foodCategory_model.find();
  res.send("success");
});

FoodCategoryRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteOne1 = await foodCategory_model.findByIdAndDelete(id);
  res.json(deleteOne1);
});
FoodCategoryRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.query;
  const deleteOne1 = await foodCategory_model.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      name,
    }
  );

  res.json(deleteOne1);
});
