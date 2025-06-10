import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 4000;

app.get("/", (req: Request, res: Response) => {
   res.send("hello world");
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
