// src/hooks/useRecipes.js
import { useState, useEffect } from "react";

export default function useRecipes(userData) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (userData?.recipes) {
      setRecipes(userData.recipes);
    }
  }, [userData]);

  const addRecipe = (newRecipe) => {
    setRecipes((prev) => [...prev, newRecipe]);
  };

  return { recipes, addRecipe };
}
