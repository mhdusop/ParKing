import cors from "cors";
import express, { Express, Request, Response } from "express";

import config from "./config/config";
import userRouter from "./routes/user.routes";
import parkingRouter from "./routes/parking.route";
import reservationRouter from "./routes/reservation.route";
import authRouter from "./routes/auth.route";
import paymentRouter from "./routes/payment.route";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/parking", parkingRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/payments", paymentRouter);

app.get("/", (req: Request, res: Response) => {
   res.send("hello world");
});

app.listen(config.APP_PORT, () => {
   console.log(`Server is running on port ${config.APP_PORT}`);
});
