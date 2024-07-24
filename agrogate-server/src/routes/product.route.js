const express = require("express");

const {
  getAllProducts,
  createProduct,
  updateProductController,
  getProductsByUser,
  deleteProductController,
} = require("../controllers/product.controller");
const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route("/me").get(getProductsByUser);
router
  .route("/:id")
  .patch(updateProductController)
  .delete(deleteProductController);

module.exports = router;
