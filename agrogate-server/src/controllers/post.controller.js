const { NotFound, BadRequestError } = require("../errors");
const User = require("../models/user.model");
const { Post } = require("../models/post.model");
const { StatusCodes } = require("http-status-codes");
const { fromZodError } = require("zod-validation-error");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { createPostSchema } = require("../schema/post.schema");
const { imageUploader } = require("../utils/imageUploader");

const createPostController = asyncErrorHandler(async (req, res) => {
  const user = req.id;

  const files = req.files;
  const media = await imageUploader(files);

  const data = {
    ...req.body,
    media: media,
  };

  const result = createPostSchema.safeParse(data);

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

const likePostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
    } else {
      post.likes = post.likes.filter(
        (userId) => userId.toString() !== req.user.id
      );
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Add a comment to a post
const addCommentController = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const newComment = new Comment({ user: req.user.id, text });
    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Reply to a comment
const replyToCommentController = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const newReply = new Comment({ user: req.user.id, text });
    comment.replies.push(newReply);
    await post.save();

    res.status(201).json(newReply);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getPostController = asyncErrorHandler(async (req, res) => {
  const userId = req.id;

  const data = await User.findOne({ _id: userId });

  if (!data) throw new NotFound("No user found with this id");

  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", data });
});

const getPostsByUser = asyncErrorHandler(async (req, res) => {
  const user = req.id;

  const data = await Post.find({ user })
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
  addCommentController,
  getPostController,
  getPostsByUser,
  getAllPostsController,
};
