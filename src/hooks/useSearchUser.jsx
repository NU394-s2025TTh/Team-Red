import { useState } from "react";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { app } from "../firebaseconfig"; 
const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const db = getFirestore(app); 

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);
  
    try {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);
  
      const matchedUsers = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.username && data.username.includes(username)) { 
          matchedUsers.push(data);
        }
      });
  
      if (matchedUsers.length === 0) {
        console.error("No matching users found");
        return;
      }
  
      setUser(matchedUsers); 
  
    } catch (error) {
      console.error("Error searching for user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
