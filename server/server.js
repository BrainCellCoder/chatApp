// import express from "express";
// const app = express();
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import dotenv from "dotenv";
import { app } from "./app.js";
import { createUser } from "./seeders/user.js";

dotenv.config({ path: "./.env" });

const DB = process.env.DB_URI;
const PORT = process.env.PORT || 3000;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
