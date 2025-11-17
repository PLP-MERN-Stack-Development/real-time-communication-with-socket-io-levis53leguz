import React from 'react';
import { UserProvider } from './Context/UserContext';
import Home from './pages/Home';

const App = () => {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
};

export default App;
