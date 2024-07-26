const { StatusCodes } = require("http-status-codes");
const Chat = require("../models/chat.model");

const addMessage = async (req, res) => {
  const chat = await Chat.create({
    sender_id: req.id,
    users: [from, to],
    message: req.body.message,
  });

  return res.status(StatusCodes.CREATED).json({ message: "Message added" });
};

const getAllMessages = async (req, res) => {
  const messages = await Chat.find({
    users: {
      $all: [from, to],
    },
  }).sort({ updatedAt: 1 });
};

module.exports = {
  addMessage,
  getAllMessages,
};
