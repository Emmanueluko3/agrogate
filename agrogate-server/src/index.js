const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

mongoose.connection.once("open", () => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
});
