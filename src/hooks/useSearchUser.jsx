import { useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../firebaseconfig";

export default function useSearchUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const db = getFirestore(app);

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);
    try {
      const qSnap = await getDocs(collection(db, "users"));
      const matches = [];
      qSnap.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.username?.includes(username)) {
          matches.push({ id: docSnap.id, ...data });
        }
      });
      setUser(matches);
    } catch (e) {
      console.error("Search failed:", e);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, user };
}
