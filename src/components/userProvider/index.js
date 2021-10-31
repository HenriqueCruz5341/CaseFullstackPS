import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext([undefined]);

export const UserProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setUser(user);
  }, []);

  const signIn = (user) => {
    window.localStorage.setItem('user', user);
    setUser(user);
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
