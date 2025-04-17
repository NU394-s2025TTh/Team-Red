import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { app } from "../firebaseconfig";

export async function addRecipe(userId, title, ingredients, instructions, cal, protein, fat, carbs, updatedRecipe) {
  const db = getFirestore(app);
  const userRef = doc(db, 'users', userId);
  const updatedRecipes = recipes.map((recipe) => recipe.title === updatedRecipes.title ? updatedRecipe : recipe);

  }
  try {
    await updateDoc(userRef, {
      recipes: updatedRecipes
    });
    return { success: true };
  } catch (err) {
    console.error("Error editing recipe:", err);
    return { success: false, error: err.message };
  }
