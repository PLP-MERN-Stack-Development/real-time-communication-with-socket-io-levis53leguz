import { useEffect } from 'react';
import { useSocket } from '../socket/socket';
import { useUser } from '../Context/UserContext';

export const useChat = () => {
  const { username } = useUser();
  const { connect, disconnect, sendMessage, messages, users, typingUsers, setTyping } = useSocket();

  useEffect(() => {
    if (username) connect(username);
    return () => disconnect();
  }, [username]);

  return { sendMessage, messages, users, typingUsers, setTyping };
};
