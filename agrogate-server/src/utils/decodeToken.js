const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
  if (token) {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);

      if (data) {
        return data;
      }

      return false;
    } catch (e) {
      console.error(e);

      return false;
    }
  }

  return false;
};

module.exports = decodeToken;
