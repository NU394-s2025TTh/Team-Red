import React, { useState } from "react";
import '../assets/css/chat.css';
import { useRecipeGenerator } from "../hooks/useRecipeGenerator";
import { addRecipe } from './addRecipe';
import Loading from './loading';

export default function Chat({ ingredients }) {
  const [added, setAdded] = useState(false);
  const { recipes, loading, error, generateRecipe } = useRecipeGenerator();

  const handleGenerateRecipe = async () => {
    if (!ingredients.length) return;
    await generateRecipe(ingredients);
    setAdded(false);
  };

  const handleAddToRecipes = (recipe) => {
    console.log("Saved to DB:", recipe.title);
    addRecipe("1001", recipe.title, recipe.ingredients, recipe.instructions, recipe.macros.calories, recipe.macros.protein, recipe.macros.fat, recipe.macros.carbs);
    setAdded(true);
  };

  return (
    <div className="chat">
      <div><h3>Fridge AI</h3></div>

      <div className="chat-box">
        {loading &&  <Loading />
        
  
        }
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

                {!added && (
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