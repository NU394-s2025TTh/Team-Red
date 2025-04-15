import React, { useState } from "react";
import "../assets/css/chat.css";
import { useRecipeGenerator } from "../hooks/useRecipeGenerator";
import IngredientSelector from "./ingredientSelector"; // Make sure the filename matches exactly (e.g., IngredientSelector.jsx)
import { addRecipe } from "./addRecipe";

export default function Chat({ ingredients: allIngredients }) {
  // selectedIngredients holds the user's chosen ingredients
  const [selectedIngredients, setSelectedIngredients] = useState(allIngredients);
  const { recipes, loading, error, generateRecipe } = useRecipeGenerator();
  const [saved, setSaved] = useState(false);

  // This function is triggered when the user clicks the generate button.
  // It uses the currently selected ingredients.
  const handleGenerateRecipe = async () => {
    if (!selectedIngredients.length) return;
    await generateRecipe(selectedIngredients);
    setSaved(false);
  };

  const handleAddToRecipes = (recipe) => {
    console.log("Saved to DB:", recipe.title);
    addRecipe(
      "1001",
      recipe.title,
      recipe.ingredients,
      recipe.instructions,
      recipe.macros.calories,
      recipe.macros.protein,
      recipe.macros.fat,
      recipe.macros.carbs
    );
    setSaved(true);
  };

  return (
    <div className="chat">
      <div>
        <h3>Fridge AI</h3>
      </div>

      {/* Ingredient selector block: allows user to choose which ingredients to include */}
      <IngredientSelector 
        allIngredients={allIngredients} 
        onSelectionChange={(selected) => setSelectedIngredients(selected)} 
      />

      {/* Chat box area displays generated recipes */}
      <div className="chat-box">
        {loading && <p>Generating recipe...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && recipes.length === 0 && !error && (
          <p className="text-gray-400">No recipe yet... push the button below to generate</p>
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

                {!saved && (
                  <button
                    className="button-add"
                    onClick={() => handleAddToRecipes(recipe)}
                  >
                    Add to my recipes
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="chat-buttons">
        <button onClick={handleGenerateRecipe} className="button-generate">
          Recipe Me!
        </button>
      </div>
    </div>
  );
}
