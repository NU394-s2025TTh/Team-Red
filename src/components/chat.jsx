import React, { useState } from "react";
import "../assets/css/chat.css";
import { useRecipeGenerator } from "../hooks/useRecipeGenerator";
import IngredientSelector from "./ingredientSelector";
import { addRecipe } from "./addRecipe";
import placeholderImage from "../assets/branding/recipe-placeholder.png";
import Loading from "./loading";


export default function Chat({ ingredients: allIngredients, userId }) {
  const [selectedIngredients, setSelectedIngredients] = useState(allIngredients);
  const { recipes, loading, error, generateRecipe } = useRecipeGenerator();
  const [saved, setSaved] = useState([]);

  // called when user clicks generate recipe button
  const handleGenerateRecipe = async () => {
    if (!selectedIngredients.length) return;
    await generateRecipe(selectedIngredients);
    // setSaved(false);
  };

  const handleAddToRecipes = (recipe) => {
    console.log("Saved to DB:", recipe.title);
    addRecipe(
      userId,
      recipe.title,
      recipe.ingredients,
      recipe.instructions,
      recipe.macros.calories,
      recipe.macros.protein,
      recipe.macros.fat,
      recipe.macros.carbs
    );
    // setSaved(true);
    setSaved((prevSaved) => [...prevSaved, recipe.title]);
  };

  const isSaved = (title) => saved.includes(title);

  return (
    <div className="chat">
      <div>
        <h3>Fridge AI</h3>
      </div>

      <IngredientSelector 
        allIngredients={allIngredients} 
        onSelectionChange={(selected) => setSelectedIngredients(selected)} 
      />

      {/* Chat box area displays generated recipes */}
      <div className="chat-box">
        {loading && <Loading/>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && recipes.length === 0 && !error && (
          <p className="text-gray-400">No recipe yet... push the button below to generate</p>
        )}

        {recipes.length > 0 && (
          <div className="recipes-container">
            {recipes.map((recipe, index) => (
              
              
              <div key={index} className="recipe-card">
                <img src={placeholderImage} alt="Recipe Preview" className="recipe-image" />
                
                
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

                {!isSaved(recipe.title) && (
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
