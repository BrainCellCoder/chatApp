import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";

console.log(process.env.ADMIN_SECRET_KEY, process.env.NODE_ENV);
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "key123";
export const envMode = process.env.NODE_ENV?.trim() || "PRODUCTION";
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Home");
});

app.use(errorMiddleware);

export { app };
