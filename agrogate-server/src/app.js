require("dotenv").config();
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const server = http.createServer(app);
const connectDB = require("./config/dbConnect");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authRouter = require("./routes/auth.route");
const routeNotFound = require("./middlewares/route-not-found");
const verifyJWT = require("./middlewares/verifyJWT");

connectDB(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log("Home route requested");
  return res.send("Welcome to Agrogate server!");
});

app.use("/api/v1/auth", authRouter);
app.use(verifyJWT);
app.use(errorHandlerMiddleware);
app.use(routeNotFound);

module.exports = server;
