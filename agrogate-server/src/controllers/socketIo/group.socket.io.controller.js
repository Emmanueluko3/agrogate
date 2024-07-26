const { Server } = require("socket.io");
const {
  addUserToRoomController,
  removeUserFromRoomController,
} = require("../../controllers/group.controller");
const Group = require("../../models/group.model");
const User = require("../../models/user.model");
const formatMessage = require("../../utils/messages");
const decodeToken = require("../../utils/decodeToken");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const ADMIN = "Admin";

  io.use(async (socket, next) => {
    const token = decodeToken(socket.handshake.auth.token);

    if (token) {
      const user = await User.findOne({
        username: token.username,
      });

      socket.user = user;

      return next();
    }

    return next(new Error("Unauthorized!"));
  });

  // Runs when a client connects
  io.on("connection", (socket) => {
    const authUser = socket.user;
    console.log("connected");

    socket.on("joinRoom", async ({ room }) => {
      // pass token, username and room to join from the frontend
      const name = authUser.username;

      const user = await addUserToRoomController({
        id: authUser._id,
        name,
        room,
      });

      if (!user) {
        socket.emit("message", formatMessage(ADMIN, "Group Does Not Exist"));

        return;
      }

      console.log("user-room: ", user.room);

      socket.join(user.room);

      // Welcome current user
      socket.emit("message", formatMessage(ADMIN, "Welcome to Agrogate"));

      console.log("Welcome", user.room);

      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          `group:joinInfo:${user.room.replaceAll(" ", "")}`,
          formatMessage(ADMIN, `${user.username} has joined the chat`)
        );
    });

    // Load previous messages
    socket.on("load_messages", async ({ room }) => {
      const group = await Group.findOne({ name: room });

      socket.emit("prev_messages", group.messages);
    });

    // Listen for chatMessage for sending chat messages
    socket.on("groupChatMessage", async ({ groupName, message }) => {
      console.log("auth_user:", authUser);
      const group = await Group.findOne({
        members: authUser.id,
        name: groupName,
      });

      const groupIdenFyer = group.name.replaceAll(" ", "");

      socket.broadcast
        .to(group.name)
        .emit(
          `group:message:${groupIdenFyer}`,
          formatMessage(authUser.username, message, authUser)
        );

      socket.broadcast
        .to(group.name)
        .emit(`message`, formatMessage(authUser.username, message, authUser));

      const msg = {
        sender_id: authUser.id,
        sender_name: authUser.username,
        receiver_id: group.id,
        message,
        createdAt: new Date(),
      };

      group.messages.push(msg);
      await group.save();
    });

    // // Private messaging
    // socket.on('privateMessage', async ({ token, message, recipient }) => {
    //     const id = decodeToken(token)
    //     const user = await User.findById(id)
    //     io.to(recipient).emit('privateMessage', formatMessage(user.username, message))
    //     const msg = await Message.create({ sender_id: user.id, message, receiver_id: recipient })

    // })

    // Runs when client disconnects
    socket.on("disconnect", async ({ token }) => {
      // const id = decodeToken(token);
      // const user = await User.findById(id);
      // const group = await Group.findOne({ members: id });
      // io.to(group.name).emit(
      //   "message",
      //   formatMessage(ADMIN, `${user.username} has left the chat`)
      // );
      // group.members.pull(user);
      // await group.save();
    });
  });
};
