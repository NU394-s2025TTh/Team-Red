import React, { useState } from 'react';
import "../assets/css/social.css";
import Sidebar from "../components/sidebar";
import { useGetRecipes } from "../hooks/useGetRecipes";
import { addRecipe } from '../components/addRecipe';


export default function Social({ userId }) {
  const { recipes, loading, error } = useGetRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [saved, setSaved] = useState([]);

  const closeModal = () => setSelectedRecipe(null);

  const handleAddToRecipesSocial = (recipe) => {
    addRecipe(
      userId,
      recipe.title,
      recipe.ingredients,
      recipe.instructions,
      0,
      0,
      0,
      0
    );
    setSaved((prevSaved) => [...prevSaved, recipe.title]);
  };

  const isSaved = (title) => saved.includes(title);

  return (
    <div className="social-container">
      <Sidebar />
      
      <div className="main-content">
        <h1 className="page-header">🔥 Popular & Trending Recipes</h1>

        {loading && <p>Loading recipes...</p>}
        {error && <p>Error: {error}</p>}

        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <img 
                src={recipe.photoUrl || 'var(--placeholder-image)'} 
                alt={recipe.title} 
                className="recipe-image"
              />
              <div className="recipe-details">
                <h2>{recipe.title}</h2>
                <p className="rating"><strong>⭐ {recipe.rating}</strong></p>
                <h4>Ingredients:</h4>
                <ul>
                  {recipe.ingredients.slice(0, 4).map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
                <button className="view-recipe-button" onClick={() => setSelectedRecipe(recipe)}>
                  View full recipe →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRecipe && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img src={selectedRecipe.photoUrl} alt={selectedRecipe.title} className="modal-image" />
            <h2>{selectedRecipe.title}</h2>
            <p className="rating"><strong>⭐ {selectedRecipe.rating}</strong></p>
            <h4>Ingredients:</h4>
            <ul>
              {selectedRecipe.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
            <h4>Instructions:</h4>
            <ol>
              {selectedRecipe.instructions?.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            
          </div>
          <button
              className="save-recipe-button"
              disabled={isSaved(selectedRecipe.title)}
              onClick={() => handleAddToRecipesSocial(selectedRecipe)}
            >
              {isSaved(selectedRecipe.title) ? "Saved" : "Save Recipe"}
          </button>
        </div>
      )}
    </div>
  );
}
