// src/hooks/useEditRecipe.jsx
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../firebaseconfig";
export async function editRecipe(userId, updatedRecipe) {
  const db = getFirestore(app);
  const userRef = doc(db, 'users', userId);

  try {
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      throw new Error("User does not exist");
    }

    const userData = userSnapshot.data();
    const userRecipes = userData.recipes || [];

    const updatedRecipes = userRecipes.map((recipe) => {
      if (recipe.title !== updatedRecipe.title) return recipe;

      return { // if a field is was left blank, that field will not be updated. 
        title: updatedRecipe.title ?? recipe.title,
        ingredients: updatedRecipe.ingredients ?? recipe.ingredients,
        instructions: updatedRecipe.instructions ?? recipe.instructions,
        cal: updatedRecipe.cal ?? recipe.cal ?? 0,
        protein: updatedRecipe.protein ?? recipe.protein ?? 0,
        fat: updatedRecipe.fat ?? recipe.fat ?? 0,
        carbs: updatedRecipe.carbs ?? recipe.carbs ?? 0,
      };
    });

    await updateDoc(userRef, {
      recipes: updatedRecipes,
    });

    return { success: true };
  } catch (err) {
    console.error("Error updating recipe:", err);
    return { success: false, error: err.message };
  }
}
