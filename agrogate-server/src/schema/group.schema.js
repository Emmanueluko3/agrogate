const { object, string } = require("zod");

const createGroupSchema = object({
  name: string({ required_error: "Name is required" }),
  about: string({ required_error: "About is required" }),
  imageUrl: string({ required_error: "Image Url is required" }),
});

module.exports = {
  createGroupSchema,
};
