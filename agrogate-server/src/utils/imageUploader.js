const { uploads } = require("../config/cloudinary");
const fs = require("fs");

const imageUploader = async (files) => {
  const urls = [];
  for (const file of files) {
    const { path } = file;
    const newPath = await uploads(path, "Images");
    urls.push(newPath);
    fs.unlinkSync(path);
  }
  return urls;
};

module.exports = { imageUploader };
