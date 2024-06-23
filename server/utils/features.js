import jwt from "jsonwebtoken";

export const cookieOption = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

export const sendToken = (res, user, code, message) => {
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  return res.status(code).cookie("chat-token", token, cookieOption).json({
    success: true,
    message,
  });
};

export const emitEvent = (req, event, users, data) => {
  console.log("Emmiting event", event);
};
