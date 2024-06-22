import express from "express";
import userRoute from "./routes/user.js";

const app = express();

//middlewares
app.use(express.json());

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Home");
});

export { app };
