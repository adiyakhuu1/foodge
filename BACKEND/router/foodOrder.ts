import { Request, Response, Router } from "express";

const foodOrderRouter = Router();

foodOrderRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
});
