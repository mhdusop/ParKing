import cors from "cors";
import express, { Express, Request, Response } from "express";
import { userRoutes } from "./routes/user.routes";

const app: Express = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/users", userRoutes());

app.get("/", (req: Request, res: Response) => {
   res.send("hello world");
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
