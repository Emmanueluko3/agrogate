const { NotFound, BadRequestError } = require("../errors");
const Group = require("../models/group.model");
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { joinRoomSchema } = require("../schema/user.schema");
const { createGroupSchema } = require("../schema/group.schema");
const { fromZodError } = require("zod-validation-error");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const addUserToRoomController = async ({ id, name, room }) => {
  const userId = id;
  const result = joinRoomSchema.safeParse({ name, room });

  if (!result.success) {
    return;
  }

  const user = await User.findById(userId);

  //create a model and add users to an array in a field in the model
  const group = await Group.findOne({ name: room });

  if (!group) return;

  if (!group.members.includes(userId)) {
    group.members.push(userId);

    await group.save();
  }

  return { username: user.username, room: group.name };
};

const removeUserFromRoomController = async ({ id, name, room }) => {
  //find user and remove them from the array in a field in the model
  const userId = id;
  const result = joinRoomSchema.safeParse({ name, room });

  if (!result.success) {
    return;
  }

  const group = await Group.findOne({ name });

  if (!group) return;

  group.members.pull(userId);
  group.save();

  return;
};

const getRoomsController = asyncErrorHandler(async (req, res) => {
  const data = await Group.find();

  return res.status(StatusCodes.OK).json({ data });
});

const getUserRooms = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) throw new BadRequestError("User Id missing");

  const groups = (await Group.find()).filter((group) =>
    group.members.includes(userId)
  );

  return res.status(StatusCodes.OK).json({ groups });
};

const getAuthUserRooms = async (req, res) => {
  const userId = req.user.id;

  if (!userId) throw new BadRequestError("User Not Authenticated");

  const groups = (await Group.find()).filter((group) =>
    group.members.includes(userId)
  );

  return res.status(StatusCodes.OK).json({ groups });
};

const getRoomController = async (req, res) => {
  const id = req.params.id;

  if (!id) throw new BadRequestError("No id with url");

  const group = await Group.findById(id);

  return res.status(StatusCodes.OK).json({
    name: group.name,
    members: group.members.length,
    created: group.createdAt,
  });
};

const createGroupController = asyncErrorHandler(async (req, res) => {
  const result = createGroupSchema.safeParse(req.body);

  if (!result.success) {
    throw new BadRequestError(fromZodError(result.error).toString());
  }

  const group = await Group.create(req.body);

  return res.status(StatusCodes.CREATED).json({ group });
});

module.exports = {
  addUserToRoomController,
  removeUserFromRoomController,
  getRoomsController,
  getRoomController,
  createGroupController,
  getUserRooms,
  getAuthUserRooms,
};
