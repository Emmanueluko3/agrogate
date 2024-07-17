const express = require("express");
const {
  registerUserController,
  loginUserController,
  refreshTokenController,
  logoutUserController,
} = require("../controllers/auth.controller");
const router = express.Router();

router.route("/register").post(registerUserController);
router.route("/login").post(loginUserController);
router.route("/refresh-token").get(refreshTokenController);
router.route("/logout").get(logoutUserController);

module.exports = router;
