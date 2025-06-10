import * as dotenv from "dotenv";
dotenv.config();

const config = {
   APP_NAME: "parking-backend",
   APP_PORT: process.env.APP_PORT,
   JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
