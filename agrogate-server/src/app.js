require("dotenv").config();
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const server = http.createServer(app);
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const connectDB = require("./config/dbConnect");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const routeNotFound = require("./middlewares/route-not-found");
const verifyJWT = require("./middlewares/verifyJWT");
const authRouter = require("./routes/auth.route");
const profileRouter = require("./routes/user.route");

connectDB(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  console.log("Home route requested");
  return res.send("Welcome to Agrogate server!");
});

app.use("/api/v1/auth", authRouter);

app.use(verifyJWT);
app.use("/api/v1/profile", profileRouter);

app.use(errorHandlerMiddleware);
app.use(routeNotFound);

module.exports = server;
