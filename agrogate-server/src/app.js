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
const applyUploadMiddleware = require("./middlewares/uploads");
const authRouter = require("./routes/auth.route");
const profileRouter = require("./routes/user.route");
const diagnosisRouter = require("./routes/diagnosis.route");
const postRouter = require("./routes/post.route");
const productRouter = require("./routes/product.route");
const groupRouter = require("./routes/group.route");
const messageRouter = require("./routes/chat.route");
const socketSetup = require("./controllers/socketIo/group.socket.io.controller");

connectDB(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

socketSetup(server);

app.get("/", (req, res) => {
  console.log("Home route requested");
  return res.send("Welcome to Agrogate server!");
});

app.use("/api/v1/auth", authRouter);

app.use(verifyJWT);
app.use(applyUploadMiddleware);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/diagnosis", diagnosisRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/group", groupRouter);
app.use("/api/v1/messages", messageRouter);

app.use(errorHandlerMiddleware);
app.use(routeNotFound);

module.exports = server;
