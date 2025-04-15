import React, { useState, useEffect } from "react";
import "../assets/css/recipegen.css";
import { addRecipe } from './addRecipe';


export default function RecipeGenerator({ fridgecontents }) {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState(fridgecontents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIngredients(fridgecontents);
  }, [fridgecontents]); 

  const generateRecipe = async () => {
    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const endpoint =
        "https://us-central1-spoonfull-bcfb4.cloudfunctions.net/generateDeepseekRecipe";

      const payload = {
        fridgecontents: Array.isArray(ingredients)
          ? ingredients.join(", ")
          : ingredients,
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
      console.log("[DeepSeek response]", data);
      console.log("[DeepSeek response recipes]", data.recipes);
      setRecipes(data.recipes?.recipes || []);
      console.log("[set recipes]", data.recipes);
      console.log("data.recipes is an array:", Array.isArray(data.recipes));
    } catch (err) {
      console.error("[Error generating recipe]", err);
      setError(err.message || "Error generating recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-generator-container">
      <button
        className="generate-button"
        onClick={generateRecipe}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {recipes.length === 0 && !loading && !error && (
        <p className="placeholder-text">No recipes yet — click the button above!</p>
      )}

      {recipes.length > 0 && (
        <div className="recipes-container">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h2>{recipe.title}</h2>

              <h4>Ingredients:</h4>
              <ul>
                {recipe.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h4>Instructions:</h4>
              <ol>
                {recipe.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>

              <p className="macros">
                <strong>Macros:</strong><br />
                Calories: {recipe.macros?.calories ?? 0},&nbsp;
                Protein: {recipe.macros?.protein ?? 0}g,&nbsp;
                Fat: {recipe.macros?.fat ?? 0}g,&nbsp;
                Carbs: {recipe.macros?.carbs ?? 0}g
              </p>

              <button className="save-button" onClick={() => addRecipe("1001", recipe.title, recipe.ingredients, recipe.instructions, recipe.macros.calories, recipe.macros.protein, recipe.macros.fat, recipe.macros.carbs)}>
                Save Recipe
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
