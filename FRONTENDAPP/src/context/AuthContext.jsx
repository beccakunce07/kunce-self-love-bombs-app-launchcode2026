import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
     const savedUser = localStorage.getItem('love_bomb_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Automatically load the user if they refresh the page
//   useEffect(() => {
//     const savedUser = localStorage.getItem('love_bomb_user');
//     if (savedUser) {
//       setCurrentUser(JSON.parse(savedUser));
//     }
//   }, []);

  const loginUser = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('love_bomb_user', JSON.stringify(userData)); // Keeps them logged in
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('love_bomb_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
