let messages = [];
let users = {};

exports.getMessages = (req, res) => {
  res.json(messages);
};

exports.getUsers = (req, res) => {
  res.json(Object.values(users));
};

// Expose references to allow updates from socket handler
exports.store = {
  get messages() {
    return messages;
  },
  set messages(value) {
    messages = value;
  },
  get users() {
    return users;
  },
  set users(value) {
    users = value;
  },
};
