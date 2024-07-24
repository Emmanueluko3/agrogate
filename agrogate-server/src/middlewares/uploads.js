const upload = require("../config/multer");

const imageUpload = upload.array("images", 10);

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
