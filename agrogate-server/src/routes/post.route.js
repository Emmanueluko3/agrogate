const express = require("express");
const {
  createPostController,
  getAllPostsController,
  updatePostController,
} = require("../controllers/post.controller");
const router = express.Router();

router
  .route("/")
  .get(getAllPostsController)
  .post(createPostController)
  .patch(updatePostController);
router.route("/:id").patch(updatePostController);

module.exports = router;
