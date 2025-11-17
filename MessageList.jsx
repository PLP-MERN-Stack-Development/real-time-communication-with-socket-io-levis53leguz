import React from 'react';

const MessageList = ({ messages, typingUsers }) => {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message ${msg.senderId ? 'user-message' : 'system-message'}`}
        >
          {msg.system ? (
            <em>{msg.message}</em>
          ) : (
            <>
              <strong>{msg.sender}:</strong> {msg.message}
            </>
          )}
        </div>
      ))}

      {typingUsers.length > 0 && (
        <div className="typing-indicator">
          {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
        </div>
      )}
    </div>
  );
};

export default MessageList;
