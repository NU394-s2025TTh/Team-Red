import { useState } from "react";

export function useRecipeGenerator() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateRecipe = async (
    selectedIngredients,
    selectedSpices,
    userPrompt = ""
  ) => {
    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const endpoint =
        "https://us-central1-spoonfull-bcfb4.cloudfunctions.net/generateDeepseekRecipe";

      const payload = {
        fridgecontents: Array.isArray(selectedIngredients)
          ? selectedIngredients.join(", ")
          : selectedIngredients,
        spices: Array.isArray(selectedSpices)
          ? selectedSpices.join(", ")
          : selectedSpices,
        userPrompt: userPrompt,
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const data = await response.json();
      setRecipes(data.recipes?.recipes || []);
    } catch (err) {
      setError(err.message || "Error generating recipe");
    } finally {
      setLoading(false);
    }
  };

  return { recipes, loading, error, generateRecipe };
}
