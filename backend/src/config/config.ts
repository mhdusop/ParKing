import * as dotenv from "dotenv";
dotenv.config();

const config = {
   APP_NAME: "parking-backend",
   APP_PORT: process.env.APP_PORT,
};

export default config;
