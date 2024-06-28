import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import dotenv from "dotenv";
import { app, envMode } from "./app.js";
import { createUser } from "./seeders/user.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
dotenv.config({ path: "./.env" });
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import { create } from "domain";

const server = createServer(app);
const io = new Server(server, {});
const DB = process.env.DB_URI;
const PORT = process.env.PORT || 3000;
export const userSocketIDs = new Map();

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

io.use((socket, next) => {});

io.on("connection", (socket) => {
  const user = {
    _id: "asd",
    name: "abhisss",
  };
  userSocketIDs.set(user._id.toString(), socket.id);
  console.log(userSocketIDs);
  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };
    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    try {
      await Message.create(messageForDB);
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userSocketIDs.delete(user._id.toString());
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}... in ${envMode} mode`);
});
