import cors from "cors";
import express, { Express, Request, Response } from "express";
import { userRoutes } from "./routes/user.routes";
import config from "./config/config";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/users", userRoutes());

app.get("/", (req: Request, res: Response) => {
   res.send("hello world");
});

app.listen(config.APP_PORT, () => {
   console.log(`Server is running on port ${config.APP_PORT}`);
});
