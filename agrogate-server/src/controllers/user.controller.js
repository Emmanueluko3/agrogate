const { NotFound, BadRequestError } = require("../errors");
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { fromZodError } = require("zod-validation-error");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { updateUserSchema } = require("../schema/user.schema");
const { imageUploader } = require("../utils/imageUploader");

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
  const files = req.files;
  const profile_image =
    files.profile_image && (await imageUploader(files.profile_image))[0];
  const cover_image =
    files.cover_image && (await imageUploader(files.cover_image))[0];

  const redBody = {
    ...req.body,
    profile_image: profile_image,
    cover_image: cover_image,
  };

  const result = updateUserSchema.safeParse(redBody);

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
