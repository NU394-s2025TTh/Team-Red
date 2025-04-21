import React, { useState } from 'react';
import '../assets/css/recipe.css';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function RecipeDetailsModal({ recipe, onClose, onSave }) {
  const { userId, handleLogout } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(recipe.title);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join('\n'));
  const [instructions, setInstructions] = useState(recipe.instructions.join('\n'));
  const [photo, setPhoto] = useState(recipe.photo);
  const [calories, setCalories] = useState(recipe.calories);
  const [carbs, setCarbs] = useState(recipe.carbs);
  const [protein, setProtein] = useState(recipe.protein);
  const [fat, setFat] = useState(recipe.fat);

  const handleSave = () => {
    const updatedRecipe = {
      ...recipe,
      title,
      ingredients: ingredients.split('\n'),
      instructions: instructions.split('\n'),
      photo: photo || "/default-photo.png",
      calories,
      carbs,
      protein,
      fat,
    };
    onSave(userId, updatedRecipe); 
    setIsEditing(false); 
  };

  return (
    <div className="recipe-details-modal">
      <button onClick={onClose}>Close</button>
      {isEditing ? (
        <div>
          <h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="recipe-title-input"
            />
          </h2>
          <img src={photo || "/none.png"} alt={title} className="recipe-image" />
          <div className="recipe-edit-section">
            <h3>Ingredients:</h3>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="recipe-ingredients-input"
            />
          </div>
          <div className="recipe-edit-section">
            <h3>Instructions:</h3>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="recipe-instructions-input"
            />
          </div>
          <div className="recipe-edit-section">
            <h3>Photo URL (optional):</h3>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="recipe-photo-input"
            />
          </div>

          <div className="recipe-edit-section">
            <h3>Nutrition:</h3>
            <div className="nutrition-container">
              <label>
                Calories:
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="nutrition-input"
                />
              </label>
              <label>
                Carbs:
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  className="nutrition-input"
                />
              </label>
              <label>
                Protein:
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  className="nutrition-input"
                />
              </label>
              <label>
                Fat:
                <input
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  className="nutrition-input"
                />
              </label>
            </div>
          </div>

          <div className="recipe-modal-footer">
            <button onClick={handleSave} className="save-button">Save Changes</button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>{title}</h2>
          <img src={photo || "/none.png"} alt={title} className="recipe-image" />
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
          <div className="nutrition-container">
            <p>Calories: {recipe.calories}</p>
            <p>Carbs: {recipe.carbs}</p>
            <p>Protein: {recipe.protein}</p>
            <p>Fat: {recipe.fat}</p>
          </div>

          <button onClick={() => setIsEditing(true)} className="edit-button">Edit Recipe</button>
        </div>
      )}
    </div>
  );
}

export default RecipeDetailsModal;
