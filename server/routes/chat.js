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
import {
  addMemberValidator,
  getChatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";

const app = express();

//After here user must be logged in to access the routes
app.use(isAuthenticated); //instead of writing isAuthenticated middleware before every controller where loggin required
app.post("/new", newGroupValidator(), validateHandler, newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMemberValidator(), validateHandler, addMembers);
app.put(
  "/removemembers",
  removeMemberValidator(),
  validateHandler,
  removeMembers
);
app.delete("/leave/:id", getChatIdValidator(), validateHandler, leaveGroup);

//send attachments
app.post(
  "/message",
  attachmentsMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);
//send get messages
app.get("/message/:id", getChatIdValidator(), validateHandler, getMessages);
//get chat details, rename, delete
app
  .route("/:id")
  .get(getChatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, remnameGroup)
  .delete(getChatIdValidator(), validateHandler, deleteChat);

export default app;
