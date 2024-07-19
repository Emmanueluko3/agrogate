const express = require("express");

const {
  getUserController,
  updateUserController,
} = require("../controllers/user.controller");
const router = express.Router();

router.route("/").get(getUserController).patch(updateUserController);

module.exports = router;
