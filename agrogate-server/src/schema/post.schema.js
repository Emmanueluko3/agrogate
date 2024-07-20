const { z } = require("zod");

const createPostSchema = z.object({
  description: z.string().min(1, "Description is required"),
  media: z.array(z.string().url()).optional(),
});

const likePostSchema = z.object({
  postId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid post ID"),
});

const addCommentSchema = z.object({
  text: z.string().min(1, "Comment text is required"),
});

const replyToCommentSchema = z.object({
  text: z.string().min(1, "Reply text is required"),
});

module.exports = {
  createPostSchema,
  likePostSchema,
  addCommentSchema,
  replyToCommentSchema,
};
