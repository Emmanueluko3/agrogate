const bcrypt = require("bcrypt");
const { createUserSchema, loginUserSchema } = require("../schema/auth.schema");
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const Roles = require("../config/roles");
const { BadRequestError, UnauthorizedError } = require("../errors");
const { fromZodError } = require("zod-validation-error");
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const registerUserController = asyncErrorHandler(async (req, res) => {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    throw new BadRequestError(fromZodError(result.error).toString());
  }

  let role = "user";

  if (Roles.includes(req.body.role)) role = "admin";

  //   if (Roles.includes(role)) role = "admin";

  const foundUser = await User.findOne({ username: result.data.username });

  if (foundUser) {
    throw new BadRequestError(
      `User with username ${result.data.username} already exists`
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(result.data.password, 10);

  const createdUser = await User.create({
    name: result.data.name,
    username: result.data.username,
    email: result.data.email,
    password: hashedPassword,
    role: role,
  });

  const { password, ...user } = createdUser.toObject();

  const authToken = jwt.sign(
    { username: user.username, id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.status(StatusCodes.CREATED).json({
    token: authToken,
    data: user,
    message: "Your account has been successfully created.",
  });
});

const loginUserController = asyncErrorHandler(async (req, res) => {
  const cookie = req.cookies;
  const refreshToken = cookie?.jwt;
  const result = loginUserSchema.safeParse(req.body);

  if (!result.success) {
    throw new BadRequestError(fromZodError(result.error).toString());
  }

  const foundUser = await User.findOne({
    email: result.data.email,
  }).select("+password");

  if (!foundUser) throw new BadRequestError("Invalid login credentials");

  // validate password
  const isPasswordValid = await bcrypt.compare(
    `${result.data.password}`,
    foundUser.password
  );

  if (!isPasswordValid)
    throw new UnauthorizedError(
      "Invalid email or password. Please try again with the correct credentials."
    );

  const { password, ...user } = foundUser.toObject();

  if (user) {
    const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000;
    const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 1000;

    const accessToken = jwt.sign(
      { username: user.username, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );
    const newRefreshToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    let newRefreshTokenArray = !cookie?.jwt
      ? user.refreshToken
      : user.refreshToken.filter((token) => token !== cookie?.jwt);

    if (cookie?.jwt) {
      res.clearCookie("jwt", {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
      });

      const foundToken = await User.findOne({ refreshToken }).exec();

      if (!foundToken) {
        console.log("Token reuse detected");
        newRefreshTokenArray = [];
      }
    }

    user.refreshToken = [...newRefreshTokenArray, newRefreshToken];

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      maxAge: COOKIE_MAX_AGE,
      sameSite: true,
    });

    return res.status(StatusCodes.OK).json({
      token: accessToken,
      expiresIn: ACCESS_TOKEN_EXPIRATION,
      data: user,
      message: "Login successful",
    });
  }
});

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
