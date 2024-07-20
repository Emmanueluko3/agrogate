const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  text: { type: String, required: [true, "comment text is required"] },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  description: { type: String },
  media: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Post, Comment };
