import { Request, Response, Router } from "express";
import { account_model } from "../models/models";
import bcrypt from "bcrypt";

export const accountRouter = Router();

accountRouter.post("/sign", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExists = await account_model.findOne({ email: email });

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
