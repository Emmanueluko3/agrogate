const upload = require("../config/multer");

const uploadFields = [
  { name: "images", maxCount: 10 },
  { name: "image", maxCount: 10 },
  { name: "profile_image", maxCount: 10 },
  { name: "cover_image", maxCount: 10 },
];

const imageUpload = upload.any(uploadFields);

const applyUploadMiddleware = (req, res, next) => {
  const allowedMethods = ["POST", "PUT", "PATCH"];
  if (
    allowedMethods.includes(req.method) &&
    req.headers["content-type"] &&
    req.headers["content-type"].includes("multipart/form-data")
  ) {
    imageUpload(req, res, next);
  } else {
    next();
  }
};

module.exports = applyUploadMiddleware;
