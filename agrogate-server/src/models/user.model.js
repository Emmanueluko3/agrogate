const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Your name is required"],
      max: 25,
    },
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: [true, "Your username is required"],
      max: 25,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: [true, "Your email is required"],
    },
    role: String,
    password: {
      type: String,
      required: [true, "Your password is required"],
      select: false,
      max: 25,
      type: String,
    },
    profile_image: {
      type: String,
    },
    cover_image: {
      type: String,
    },
    country: {
      type: String,
    },
    bio: {
      type: String,
      max: 500,
    },

    refreshToken: [String],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// userSchema.pre("save", function (next) {
//   const user = this;

//   if (!user.isModified("password")) return next();
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) return next(err);

//       user.password = hash;
//       next();
//     });
//   });
// });

module.exports = mongoose.model("User", userSchema);
