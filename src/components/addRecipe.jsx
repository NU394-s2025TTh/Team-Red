import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { app } from "../firebaseconfig";

export async function addRecipe(userId, title, ingredients, instructions, cal, protein, fat, carbs) {
  const db = getFirestore(app);
  const userRef = doc(db, 'users', userId);

  try {
    await updateDoc(userRef, {
      recipes: arrayUnion({
        title,
        ingredients,
        instructions,
        cal,
        protein,
        fat,
        carbs,
      }),
    });
    return { success: true };
  } catch (err) {
    console.error("Error adding recipe:", err);
    return { success: false, error: err.message };
  }
}