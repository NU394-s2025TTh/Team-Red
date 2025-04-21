import { createContext, useContext, useState } from 'react';

export const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

// export function UserProvider({ children }) {
//   const [customUserId, setCustomUserId] = useState(null);

//   return (
//     <UserContext.Provider value={{ customUserId, setCustomUserId }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export const useUserId = () => useContext(UserContext);
