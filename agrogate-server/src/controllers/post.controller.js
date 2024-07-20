const { NotFound, BadRequestError } = require("../errors");
const User = require("../models/user.model");
const { Post } = require("../models/post.model");
const { StatusCodes } = require("http-status-codes");
const { fromZodError } = require("zod-validation-error");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { createPostSchema } = require("../schema/post.schema");

const createPostController = asyncErrorHandler(async (req, res) => {
  const user = req.id;

  const result = createPostSchema.safeParse(req.body);

  if (!result.success) {
    throw new BadRequestError(fromZodError(result.error).toString());
  }

  const newPost = new Post({ user, ...result.data });
  await newPost.save();

  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", newPost });
});

const updatePostController = asyncErrorHandler(async (req, res) => {
  const userId = req.id;

  const { id } = req.params;

  const { description, media } = req.body;

  const post = await Post.findById(id);
  if (!post) throw new NotFound("Post not found");

  if (post.user._id.toString() !== userId.toString())
    throw new NotFound("You are not authorized to update this post");

  if (description !== undefined) post.description = description;
  if (media !== undefined) post.media = media;

  await post.save();

  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", post });
});

const likePostController = asyncErrorHandler(async (req, res) => {
  const userId = req.id;

  const data = await User.findOne({ _id: userId });

  if (!data) throw new NotFound("No user found with this id");

  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", data });
});

const addPostCommentController = asyncErrorHandler(async (req, res) => {
  const userId = req.id;

  const data = await User.findOne({ _id: userId });

  if (!data) throw new NotFound("No user found with this id");

  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", data });
});

const getPostController = asyncErrorHandler(async (req, res) => {
  const userId = req.id;

  const data = await User.findOne({ _id: userId });

  if (!data) throw new NotFound("No user found with this id");

  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", data });
});

const getAllPostsController = asyncErrorHandler(async (req, res) => {
  const data = await Post.find()
    .populate("user", ["name", "profile_image"])
    .populate({
      path: "comments.user",
      select: "name",
    })
    .populate({
      path: "comments.replies",
      populate: {
        path: "user",
        select: "name",
      },
    });

  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", data });
});

module.exports = {
  createPostController,
  updatePostController,
  likePostController,
  addPostCommentController,
  getPostController,
  getAllPostsController,
};
