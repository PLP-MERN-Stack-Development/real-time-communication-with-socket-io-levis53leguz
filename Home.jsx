import React, { useState } from 'react';
import { useUser } from '../Context/UserContext';
import ChatRoom from '../Components/ChatRoom';

const Home = () => {
  const { username, setUsername } = useUser();
  const [input, setInput] = useState('');

  if (username) return <ChatRoom />;

  return (
    <div className="login-screen">
      <h2>Join the Chat</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => input && setUsername(input)}>Join</button>
    </div>
  );
};

export default Home;
