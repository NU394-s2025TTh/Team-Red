import { useState, useEffect } from "react";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { app } from "../firebaseconfig";

export function useUserData(userId) {
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    const userRef = doc(db, "users", userId);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData({
          name: data.name,
          fridge: data.fridge.map((item) => ({
            item: item.item,
            quantity: item.quantity,
            unit: item.unit,
          })),
          recipes: data.recipes.map((recipe) => ({
            title: recipe.title,
            calories: recipe.cal,
            carbs: recipe.carbs,
            fat: recipe.fat,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            protein: recipe.protein,
          })),
        });
        setLoading(false);
      } else {
        setError("User not found");
        setLoading(false);
      }
    }, (err) => {
      console.error("Firestore error:", err);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, db]);

  return { userData, loading, error };
}
