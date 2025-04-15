import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [customUserId, setCustomUserId] = useState(null);

  return (
    <UserContext.Provider value={{ customUserId, setCustomUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserId = () => useContext(UserContext);
