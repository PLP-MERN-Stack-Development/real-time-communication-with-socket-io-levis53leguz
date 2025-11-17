import React from 'react';

const MessageInput = ({ value, onChange, onSend }) => {
  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
      />
      <button onClick={onSend}>Send</button>
    </div>
  );
};

export default MessageInput;
