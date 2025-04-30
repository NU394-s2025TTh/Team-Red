import React, { useEffect, useState } from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { app } from "../firebaseconfig";

import { useUserData } from "../hooks/useUserData";
import Sidebar from "../components/sidebar";
import Search from "../components/socials/search";
import { RecipeCard } from "../components/recipecard";

export default function Home({ userId }) {
  const { userData, loading, error } = useUserData(userId);
  const [followingRecipes, setFollowingRecipes] = useState([]);
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
            {followingRecipes.length ? (
              Object.entries(recipesByFriend).map(([friend, recipes]) => (
                <div key={friend} style={{ marginBottom: "2.5rem" }}>
                  <h3 style={{ marginBottom: "1rem" }}>{friend}’s Recipes</h3>

                  <RecipeCard
                    recipes={recipes}
                    onAddRecipe={() => {}}  // no save button!!
                    showHeader={false}
                  />
                </div>
              ))
            ) : (
              <p>No recipes from users you follow yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
