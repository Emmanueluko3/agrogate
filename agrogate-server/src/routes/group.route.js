const express = require("express");
const {
  getRoomsController,
  getRoomController,
  getUserRooms,
  getAuthUserRooms,
  createGroupController,
} = require("../controllers/group.controller");

const router = express.Router();

router.route("/").get(getRoomsController).post(createGroupController);
router.route("/auth-user-groups").get(getAuthUserRooms);
router.route("/:id").get(getRoomController);
router.route("/user-rooms/:userId").get(getUserRooms);

module.exports = router;
