import React, { useState } from 'react';
import RecipeDetailsModal from './RecipeDetailsModal';
import AddNewRecipe from './addnewrecipe';
import useEditRecipt from '../hooks/useEditRecipe';

export function RecipeCard({ recipes, onAddRecipe }) {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  
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
  
    return (
      <div className="recipe-card-container" style={{ marginLeft: '150px' }}>
        <h2>Your Recipes</h2>
  
        {/* recipe cards */}
        <div className="recipe-card-list">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card" onClick={() => handleCardClick(recipe)}>
              <img 
                src={recipe.photo || "/default-photo.png"} 
                alt={recipe.title} 
                className="recipe-card-img"
              />
              <h3>{recipe.title}</h3>
            </div>
          ))}
        </div>
  
        {/* button for new recipe*/}
        <div className="add-recipe-button-container">
          <button className="add-recipe-button" onClick={handleAddRecipeClick}>
            Add New Recipe
          </button>
        </div>
  
        {/* add new recipe form -> modal */}
        {showAddRecipeForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <AddNewRecipe onAddRecipe={onAddRecipe} onCloseForm={handleCloseForm} />
            </div>
          </div>
        )}
  
        {/* selected recipe modal */}
        {selectedRecipe && (
          <RecipeDetailsModal recipe={selectedRecipe} onClose={handleCloseModal} />
        )}
      </div>
    );
  }