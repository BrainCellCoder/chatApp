import express from "express";
import {
  getMyProfile,
  login,
  newUser,
  logout,
  searchUser,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express();

app.post("/new", singleAvatar, newUser);
app.post("/login", login);

//After here user must be logged in to access the routes
app.use(isAuthenticated); //instead of writing isAuthenticated middleware before every controller where loggin required
app.get("/me", getMyProfile);
app.get("/logout", logout);
app.get("/search", searchUser);

export default app;
