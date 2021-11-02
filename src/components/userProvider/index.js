import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext([undefined]);

export const UserProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setUser(user);
  }, []);

  const signIn = (username, password) => {
    const users = JSON.parse(window.localStorage.getItem('users')) || [];
    if (users) {
      const index = users.findIndex(
        (user) => username === user.username && password === user.password
      );
      console.log(index);
      if (index !== -1) {
        setUser(username);
        localStorage.setItem('user', username);
        return;
      }
    }
    throw new Error('Invalid username or password');
  };

  const signOut = () => {
    window.localStorage.removeItem('user');
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ user, setUser, signIn, signOut }}>
      {props.children}
    </UserContext.Provider>
  );
};
