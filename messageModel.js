class Message {
  constructor({ sender, senderId, message, timestamp, isPrivate = false }) {
    this.id = Date.now();
    this.sender = sender;
    this.senderId = senderId;
    this.message = message;
    this.timestamp = timestamp || new Date().toISOString();
    this.isPrivate = isPrivate;
  }
}

module.exports = Message;
