const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (error, result) => {
      if (result && result.url) {
        return resolve(result.url, {
          resource_type: "auto",
          folder: folder,
        });
      }
      return reject(error);
    });
  });
};

module.exports = { cloudinary, uploads };

// const uploadSingleImage = (file, folder) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(file, (error, result) => {
//       if (result && result.url) {
//         return resolve(
//           {
//             url: result.url,
//             id: result.public_id,
//           },
//           {
//             resource_type: "auto",
//             folder: folder,
//           }
//         );
//       }
//       return reject(error);
//     });
//   });
// };

// const uploadMultipleImages = (images) => {
//   return new Promise((resolve, reject) => {
//     const uploads = images.map((base64) => uploadImage(base64));
//     Promise.all(uploads)
//       .then((values) => resolve(values))
//       .catch((error) => reject(error));
//   });
// };

// module.exports = { uploadSingleImage, uploadMultipleImages };
