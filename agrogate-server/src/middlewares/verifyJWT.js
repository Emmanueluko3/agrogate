const User = require("../models/user.model");
const { UnauthorizedError } = require("../errors");
const decodeToken = require("../utils/decodeToken");

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new UnauthorizedError("Invalid access token");
  }
  const accessToken = authHeader.split(" ")[1];

  const verifyToken = decodeToken(accessToken);

  console.log(verifyToken);

  if (verifyToken) {
    const user = await User.findOne({ username: verifyToken.username });
    req.user = user;
    req.id = user.id;

    return next();
  }

  return res.status(403).send("Bad Access Token");
};

module.exports = verifyJWT;
