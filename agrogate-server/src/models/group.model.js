const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a username"],
    },
    about: String,
    imageUrl: String,
    members: [mongoose.Types.ObjectId],
    messages: [
      {
        sender_id: mongoose.Types.ObjectId,
        sender_name: String,
        message: String,
        createdAt: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
