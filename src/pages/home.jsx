import React, { useEffect, useState } from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { app } from "../firebaseconfig";
import "../assets/css/social.css";

import { useUserData } from "../hooks/useUserData";
import { useGetRecipes } from "../hooks/useGetRecipes";
import Sidebar from "../components/sidebar";
import Search from "../components/socials/search";
import { RecipeCardHome } from "../components/recipecardhome";



export default function Home({ userId }) {
  const { userData, loading, error } = useUserData(userId);
  const [followingRecipes, setFollowingRecipes] = useState([]);
  const { recipes: trendingRecipes, loading: loadingTrending, error: errorTrending } = useGetRecipes();

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const closeModal = () => setSelectedRecipe(null);

  const db = getFirestore(app);

  useEffect(() => {
    const fetchFollowingRecipes = async () => {
      if (userData && userData.following.length > 0) {
        const recipes = [];

        for (const followedUser of userData.following) {
          const usersCol = collection(db, "users");
          const allUsers = await getDocs(usersCol);

          allUsers.forEach((doc) => {
            const data = doc.data();
            if (data.username === followedUser && data.recipes) {
              data.recipes.forEach((r) =>
                recipes.push({ username: followedUser, ...r })
              );
            }
          });
        }

        setFollowingRecipes(recipes);
      }
    };

    fetchFollowingRecipes();
  }, [userData, db]);

  /* group recipes by the friend who posted them */
  const recipesByFriend = followingRecipes.reduce((acc, recipe) => {
    acc[recipe.username] = acc[recipe.username]
      ? [...acc[recipe.username], recipe]
      : [recipe];
    return acc;
  }, {});

  return (
    <div className="App" style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div className="content" style={{ flex: 1, padding: "2rem" }}>
        <Search />

        {loading && <p>Loading your data…</p>}
        {error && <p>Error: {error}</p>}

        {userData && (
          <>
            {/* people you follow */}
            <h2>People You Follow:</h2>
            {userData.following?.length ? (
              <ul>
                {userData.following.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ul>
            ) : (
              <p>You are not following anyone yet.</p>
            )}

            {/* show each friend’s recipes in its own section */}
            <h2>Recipes from People You Follow:</h2>
            <div className="friend-recipes-container">
              {followingRecipes.length ? (
                Object.entries(recipesByFriend).map(([friend, recipes]) => {
                  const selectedRecipe = recipes[recipes.length - 1];

                  return (
                    <div key={friend} className="friend-recipe-card" style={{ marginBottom: "2.5rem" }}>
                      <h3 style={{ marginBottom: "1rem" }}>{friend}</h3>

                      <RecipeCardHome
                        recipes={[selectedRecipe]} 
                        onAddRecipe={() => {}}
                        showHeader={false}
                      />
                    </div>
                  );
                })
              ) : (
                <p>No recipes from users you follow yet.</p>
              )}
            </div>


            {/* Trending Recipes Section */}
            <h2 style={{ marginTop: "3rem" }}>🔥 Trending Recipes:</h2>
              {loadingTrending ? (
                <p>Loading trending recipes…</p>
              ) : errorTrending ? (
                <p>Error loading trending recipes: {errorTrending}</p>
              ) : (
                <>
                  <div className="recipe-grid">
                    {trendingRecipes.map((recipe, index) => (
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
                    </div>
                  )}
              </>
            )}

            
            
          </>
        )}
      </div>
    </div>
  );
}