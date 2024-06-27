import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  getChatDetails,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMembers,
  sendAttachments,
  remnameGroup,
  deleteChat,
  getMessages,
} from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const app = express();

//After here user must be logged in to access the routes
app.use(isAuthenticated); //instead of writing isAuthenticated middleware before every controller where loggin required
app.post("/new", newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMembers);
app.put("/removemembers", removeMembers);
app.delete("/leave/:id", leaveGroup);

//send attachments
app.post("/message", attachmentsMulter, sendAttachments);
//send get messages
app.get("/message/:id", getMessages);
//get chat details, rename, delete
app.route("/:id").get(getChatDetails).put(remnameGroup).delete(deleteChat);

export default app;
