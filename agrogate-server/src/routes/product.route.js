const express = require("express");

const {
  getAllProducts,
  createProduct,
} = require("../controllers/product.controller");
const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
//   .patch(updatePostController);
// router.route("/:id").patch(updatePostController);

module.exports = router;
