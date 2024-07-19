const { string, number, object } = require("zod");

const createUserSchema = object({
  name: string({ required_error: "Name is required" }),
  username: string({ required_error: "Username is required" }).regex(/^\S+$/, {
    message: "Username must not contain spaces",
  }),
  email: string({ required_error: "Email is required" }).email({
    message: "Invalid email address",
  }),
  password: string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(16, { message: "Password must be at most 16 characters long" }),
}).strict();

const loginUserSchema = object({
  email: string({ required_error: "Email is required" }).email({
    message: "Invalid email address",
  }),
  password: string({ required_error: "Password is required" }),
}).strict();

module.exports = {
  createUserSchema,
  loginUserSchema,
};
