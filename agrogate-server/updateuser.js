// const mongoose = require("mongoose");
// const User = require("./src/models/user.model");

// async function updateUsers() {
//   await mongoose.connect(
//     "",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   );

//   const users = await User.find({});

//   for (let user of users) {
//     user.phone_number = "1234567890";

//     await user.save();
//   }

//   console.log("All users updated");
//   mongoose.disconnect();
// }

// updateUsers().catch((error) => console.log(error));
