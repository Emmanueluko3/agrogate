const bcrypt = require("bcrypt");
const { createUserSchema, loginUserSchema } = require("../schema/auth.schema");
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const Roles = require("../config/roles");
const { BadRequestError, UnauthorizedError } = require("../errors");
const { fromZodError } = require("zod-validation-error");
const jwt = require("jsonwebtoken");

const registerUserController = async (req, res) => {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    throw new BadRequestError(fromZodError(result.error).toString());
  }

  let role = "user";

  if (Roles.includes(req.body.role)) role = "admin";

  //   if (Roles.includes(role)) role = "admin";

  const foundUser = await User.findOne({ username: result.data.username });

  if (foundUser) throw new BadRequestError("User already exists");

  // Hash the password
  const hashedPassword = await bcrypt.hash(result.data.password, 10);

  const user = await User.create({
    name: result.data.name,
    username: result.data.username,
    email: result.data.email,
    password: hashedPassword,
    role: role,
  });

  const userObj = user.toObject();
  delete userObj.password;

  const authToken = jwt.sign(
    { username: user.username, id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res
    .status(StatusCodes.CREATED)
    .json({ token: authToken, userObj, message: "successful" });
};

const loginUserController = (req, res) => {
  res.json({ message: "Login User" });
};

const logoutUserController = (req, res) => {
  res.json({ message: "Logout User" });
};

const refreshTokenController = (req, res) => {
  res.json({ message: "Refresh token" });
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
};
