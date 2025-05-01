import React, { useState, useEffect } from 'react';
import RecipeDetailsModal from './RecipeDetailsModal';
import AddNewRecipe from './addnewrecipe';
import { editRecipe } from '../hooks/useEditRecipe.jsx';
import Placeholder from '../assets/branding/recipe-placeholder.png';

export function RecipeCardHome({ recipes: propRecipes, onAddRecipe, showHeader = true }) {
  
  const [recipes, setRecipes] = useState(propRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    setRecipes(propRecipes);
  }, [propRecipes]);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
  };
  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };
  const handleAddRecipeClick = () => {
    setShowAddRecipeForm(true);
  };
  const handleCloseForm = () => {
    setShowAddRecipeForm(false);
  };


  const handleSave = async (userId, updatedRecipe) => { // saves to firestore
    const result = await editRecipe(userId, updatedRecipe);
    if (!result.success) {
      console.error("Failed to save:", result.error);
      alert("Could not save recipe: " + result.error);
      return;
    }
    // replace edited recipe
    setRecipes((prev) =>
      prev.map((r) =>
        r.title === updatedRecipe.title ? updatedRecipe : r
      )
    );
    // Optionally, re-open the modal with the up‑to‑date data:
    setSelectedRecipe(updatedRecipe);
  };

  const addFriendRecipes = (recipe) => {
    addRecipe(
      userId,
      recipe.title,
      recipe.ingredients,
      recipe.instructions,
      recipe.cal,
      recipe.protein,
      recipe.fat,
      recipe.carbs
    );
    setSaved((prevSaved) => [...prevSaved, recipe.title]);
  };

  const isSaved = (title) => saved.includes(title);

  return (
    <div className="home-recipe-card-container" >
      {showHeader && <h1>Your Saved Recipes</h1>}

      <div className="recipe-card-list">
        {recipes.map((recipe, idx) => (
          <div
            key={idx}
            className="recipe-card"
            onClick={() => handleCardClick(recipe)}
          >
            <img
              src={recipe.photo || Placeholder}
              alt={recipe.title}
              className="recipe-card-img"
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '180px',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
            <h3>{recipe.title}</h3>
            
          </div>
       
        ))}
      </div>


      {showAddRecipeForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddNewRecipe
              onAddRecipe={onAddRecipe}
              onCloseForm={handleCloseForm}
            />
          </div>
        </div>
      )}

      {selectedRecipe && (
        <RecipeDetailsModal
          recipe={selectedRecipe}
          onClose={handleCloseModal}
          onSave={handleSave}       // use our wrapped save
          canEdit={false}
        />
      )}
    </div>
  );
}
