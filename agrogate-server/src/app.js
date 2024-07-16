require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/dbConnect");

connectDB(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  console.log("Home route requested");
  return res.send("Welcome to Agrogate server!");
});

module.exports = app;
