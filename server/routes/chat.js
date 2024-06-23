import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  getMyChats,
  getMyGroups,
  newGroupChat,
} from "../controllers/chat.js";

const app = express();

//After here user must be logged in to access the routes
app.use(isAuthenticated); //instead of writing isAuthenticated middleware before every controller where loggin required
app.post("/new", newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMembers);

export default app;
