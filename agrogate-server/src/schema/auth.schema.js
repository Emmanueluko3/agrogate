const { string, number, object } = require("zod");

const createUserSchema = object({
  name: string({ required_error: "Name is required" }),
  username: string({ required_error: "Username is required" }),
  email: string({ required_error: "Email is required" }),
  password: string({ required_error: "Password is required" }),
});

const loginUserSchema = object({
  emailmail: string({ required_error: "Email is required" }),
  password: string({ required_error: "Password is required" }),
});

module.exports = {
  createUserSchema,
  loginUserSchema,
};
