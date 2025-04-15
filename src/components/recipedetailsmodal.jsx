import React from 'react';
import './recipe.css';

function RecipeDetailsModal({ recipe, onClose }) {
  return (
    <div className="recipe-details-modal">
      <button onClick={onClose}>Close</button>
      <h2>{recipe.title}</h2>
      <img src={recipe.photo || "/none.png"} alt={recipe.title} />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      <h3>Nutrition:</h3>
      <p>Calories: {recipe.calories}</p>
      <p>Carbs: {recipe.carbs}</p>
      <p>Protein: {recipe.protein}</p>
      <p>Fat: {recipe.fat}</p>
    </div>
  );
}

export default RecipeDetailsModal;