const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product.model");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const {
  createProductSchema,
  updateProductSchema,
} = require("../schema/product.schema");
const { BadRequestError, UnauthorizedError, NotFound } = require("../errors");
const { fromZodError } = require("zod-validation-error");
const { imageUploader } = require("../utils/imageUploader");

const createProduct = asyncErrorHandler(async (req, res) => {
  const user = req.id;
  const { title, description, price } = req.body;
  d;
  const files = req.files;
  const images = await imageUploader(files);

  const data = {
    title,
    description,
    price: parseFloat(price),
    images,
  };

  const result = createProductSchema.safeParse(data);

  if (!result.success) {
    throw new BadRequestError(fromZodError(result.error).toString());
  }

  const product = new Product({ user, ...result.data });

  await product.save();
  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", product });
});

const updateProductController = asyncErrorHandler(async (req, res) => {
  const userId = req.id;
  const { id } = req.params;

  const result = updateProductSchema.safeParse(req.body);
  if (!result.success)
    throw new BadRequestError(fromZodError(result.error).toString());

  const { title, price, description, images } = result.data;

  const product = await Product.findById(id);
  if (!product) throw new NotFound("Product not found");

  if (product.user._id.toString() !== userId.toString())
    throw new UnauthorizedError(
      "You are not authorized to update this product"
    );

  if (title !== undefined) product.title = title;
  if (price !== undefined) product.price = price;
  if (description !== undefined) product.description = description;
  if (images !== undefined) product.images = images;

  await product.save();

  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", product });
});

const deleteProductController = asyncErrorHandler(async (req, res) => {
  const userId = req.id;
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) throw new NotFound("Product not found");

  if (product.user._id.toString() !== userId.toString())
    throw new UnauthorizedError(
      "You are not authorized to delete this product"
    );

  await Product.findByIdAndDelete(id);

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    message: "Product deleted successfully",
  });
});

const getProductsByUser = asyncErrorHandler(async (req, res) => {
  const user = req.id;

  const data = await Product.find({ user });
  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", data });
});

const getAllProducts = asyncErrorHandler(async (req, res) => {
  const data = await Product.find({}).populate("user", [
    "name",
    "profile_image",
    "phone_number",
  ]);
  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", data });
});

module.exports = {
  createProduct,
  updateProductController,
  deleteProductController,
  getProductsByUser,
  getAllProducts,
};
