const { NotFound, BadRequestError } = require("../errors");
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { fromZodError } = require("zod-validation-error");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { updateUserSchema } = require("../schema/user.schema");

const getUserController = asyncErrorHandler(async (req, res) => {
  const userId = req.id;

  const data = await User.findOne({ _id: userId });

  if (!data) throw new NotFound("No user found with this id");

  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", data });
});

const updateUserController = asyncErrorHandler(async (req, res) => {
  const userId = req.id;
  const result = updateUserSchema.safeParse(req.body);

  if (!result.success) {
    throw new BadRequestError(fromZodError(result.error).toString());
  }

  const data = await User.findOneAndUpdate({ _id: userId }, result.data, {
    new: true,
    runValidators: true,
  });

  if (!data) throw new NotFound("No user found with this id");

  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", data });
});

module.exports = {
  getUserController,
  updateUserController,
};
