import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import { useChat } from '../hooks/useChat';
import '../styles/chat.css';

const ChatRoom = () => {
  const { messages, users, typingUsers, sendMessage, setTyping } = useChat();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <h3>Online Users</h3>
        <UserList users={users} />
      </aside>

      <main className="chat-main">
        <MessageList messages={messages} typingUsers={typingUsers} />
        <MessageInput
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setTyping(e.target.value.length > 0);
          }}
          onSend={handleSend}
        />
      </main>
    </div>
  );
};

export default ChatRoom;
