const moment = require("moment");

function formatMessage(username, message, sender = null) {
  return {
    sender_id: sender?._id,
    username,
    message,
    createdAt: new Date(),
  };
}

module.exports = formatMessage;
