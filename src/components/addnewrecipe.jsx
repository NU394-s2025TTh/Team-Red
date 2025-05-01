import React, { useState } from 'react';
import { addRecipe } from "./addRecipe";

export default function AddNewRecipe({ userId, onAddRecipe, onCloseForm }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [photo, setPhoto] = useState('');

  const handleAddRecipe = async () => {
    const recipeObj = {
      title,
      ingredients: ingredients.split('\n'),
      instructions: instructions.split('\n'),
      photo: photo || "/none.png",
      cal: calories,
      protein: protein,
      fat: fat,
      carbs: carbs,
    };

    const result = await addRecipe(
      userId,
      recipeObj.title,
      recipeObj.ingredients,
      recipeObj.instructions,
      recipeObj.cal,
      recipeObj.protein,
      recipeObj.fat,
      recipeObj.carbs
    );

    if (result.success) {
      onAddRecipe(recipeObj); 
      onCloseForm();
    } else {
      alert("Failed to add recipe: " + result.error);
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add New Recipe</h2>
      <input 
        type="text" 
        placeholder="Recipe Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Ingredients (one per line)" 
        value={ingredients} 
        onChange={(e) => setIngredients(e.target.value)} 
      />
      <textarea 
        placeholder="Instructions (one per line)" 
        value={instructions} 
        onChange={(e) => setInstructions(e.target.value)} 
      />
      <textarea 
        placeholder="Calories (enter 0 if not sure)" 
        value={calories} 
        onChange={(e) => setCalories(e.target.value)} 
      />
      <textarea 
        placeholder="Protein (enter 0 if not sure)" 
        value={protein} 
        onChange={(e) => setProtein(e.target.value)} 
      />
      <textarea 
        placeholder="Fat (enter 0 if not sure)" 
        value={fat} 
        onChange={(e) => setFat(e.target.value)} 
      />
      <textarea 
        placeholder="Carbs (enter 0 if not sure)" 
        value={carbs} 
        onChange={(e) => setCarbs(e.target.value)} 
      />
      
      <input 
        type="text" 
        placeholder="Photo URL (optional)" 
        value={photo} 
        onChange={(e) => setPhoto(e.target.value)} 
      />
      <button onClick={handleAddRecipe}>Add Recipe</button>
      <button onClick={onCloseForm}>Cancel</button>
    </div>
  );
}