import { configDotenv } from "dotenv";
import express, { Express, Response, Request } from "express";
configDotenv();
const URI = `mongodb+srv://myasglpzghoo:<${process.env.DB_PASSWORD}>@cluster0.imwim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app: Express = express();
app.use(express.json());

app.get("/", (Req: Request, res: Response) => {
  res.json("lol");
});

const port = 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(URI);
});
