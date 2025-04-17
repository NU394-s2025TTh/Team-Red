import React, { useState } from 'react';

export default function AddNewRecipe({ onAddRecipe, onCloseForm }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [photo, setPhoto] = useState('');

  const handleAddRecipe = () => {
    const newRecipe = {
      title,
      ingredients: ingredients.split('\n'),
      instructions: instructions.split('\n'),
      photo: photo || "/none.png",
      calories: 0, 
      carbs: 0,   
      protein: 0, 
      fat: 0,  
    };
    onAddRecipe(newRecipe);
    onCloseForm(); 
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