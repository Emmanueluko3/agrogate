const express = require("express");
const {
  addMessage,
  getAllMessages,
} = require("../controllers/chat.controller");
const router = express.Router();

router.route("/add-message").post(addMessage);
router.route("/").get(getAllMessages);

module.exports = router;
