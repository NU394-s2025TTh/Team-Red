import { useState, useEffect } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../firebaseconfig";

export function useUserData(userId) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    async function fetchData() {
      try {
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            name: data.name,
            fridgecontents: data.fridge.map((item) => ({
              item: item.item,
              quantity: item.quantity,
              unit: item.unit,
            })),
          });
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId, db]);

  return { userData, loading, error };
}
