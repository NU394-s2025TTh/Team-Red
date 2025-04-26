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
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("User not found");
        return;
      }

      querySnapshot.forEach((docSnap) => {
        setUser(docSnap.data());
      });

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
