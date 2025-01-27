import { Request, Response, Router } from "express";
import { account_model } from "../models/models";
import bcrypt from "bcrypt";

export const accountRouter = Router();

accountRouter.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExists = await account_model.findOne({ email });

  if (userExists) {
    res.json({ message: "user exists" });
    return;
  }
  try {
    const rounds = 10;
    const encryptedPass = await bcrypt.hash(password, rounds);
    await account_model.create({
      email,
      password: encryptedPass,
    });
    res.json({ message: "success" });
  } catch (e) {
    console.error(e, "aldaa");
  }
});

accountRouter.post("/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email && !password) {
    res.status(400).json({ message: "email and pass required" });
    return;
  }
  const user = await account_model.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "user doesn't exist" });
    return;
  }
  try {
    const verify = await bcrypt.compare(password, user.password!);
    console.log(verify);
    res.json(verify);
  } catch (e) {
    console.error(e, "aldaa");
  }
});
