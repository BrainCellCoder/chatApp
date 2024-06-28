import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

export const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

export const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
  body("bio", "Please Enter Bio").notEmpty(),
];

export const loginValidator = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

export const newGroupValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

export const addMemberValidator = () => [
  body("chatId", "Please Enter ChatID").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];

export const removeMemberValidator = () => [
  body("chatId", "Please Enter ChatID").notEmpty(),
  body("userId", "Please Enter UserID").notEmpty(),
];

export const sendAttachmentsValidator = () => [
  body("chatId", "Please Enter ChatID").notEmpty(),
];

export const getChatIdValidator = () => [
  param("id", "Please Enter ChatID").notEmpty(),
];

export const renameValidator = () => [
  param("id", "Please Enter ChatID").notEmpty(),
  body("name", "Please Enter New Name").notEmpty(),
];

export const sendRequestValidator = () => [
  body("userId", "Please Enter UserID").notEmpty(),
];

export const acceptRequestValidator = () => [
  body("requestId", "Please Enter RequestID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please add accept")
    .isBoolean()
    .withMessage("Accept must be boolean"),
];

export const adminLoginValidator = () => [
  body("secretKey", "Please Enter secretKey").notEmpty(),
];
