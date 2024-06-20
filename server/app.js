import express from "express";
import userRoute from "./routes/user.js";

const app = express();

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
