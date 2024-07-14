const express = require("express");
const app = express();
app.get("/", (req, res) => {
  console.log("Home route requested");
  return res.send("Home page");
});
