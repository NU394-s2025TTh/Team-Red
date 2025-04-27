import { React, useState, useEffect } from "react";
import { DataCardContainer } from "./DataCardContainer";
import { AddItemButton } from "./additem";
import { useUserData } from "../hooks/useUserData";
import SpiceSelector from "./spiceSelector";
import Chat from "./chat";
import "../assets/css/mainApp.css";
import "../assets/css/container.css";
import Sidebar from "./sidebar";
import { RecipeCard } from "./recipecard";
import Logo from "../assets/branding/logo-transparent.png";
import updateUserSpices from "../hooks/updateUserSpices";

export default function MainApp({ userId, onLogout }) {
  const { userData, loading, error } = useUserData(userId);
  console.log("User Data:", userData); // Log the user data to the console

  const [recipes, setRecipes] = useState(userData ? userData.recipes : []);
  const [fridge, setFridge] = useState(userData ? userData.fridge : []);
  const [spices, setSpices] = useState(userData ? userData.spices : []);

  useEffect(() => {
    if (userData) {
      setRecipes(userData.recipes || []);
      setFridge(userData.fridge || []);
      setSpices(userData.spices || []);
    }
  }, [userData]);

  useEffect(() => {
    if (userId) {
      updateUserSpices(userId, spices);
    }
  }, [spices, userId]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="mobile-header"></div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {userData && (
        <div className="data-card-wrapper">
          <div className="data-card-content">
            <div className="left-column">
              <DataCardContainer userId={userId} />
              <SpiceSelector spices={spices} onChange={setSpices} />
            </div>

            <div className="right-column">
              <Chat
                ingredients={fridge?.map((item) => item.item) || []}
                spices={spices}
                userId={userId}
              />
            </div>
          </div>
        </div>
      )}

      {userData && (
        <div>
          <RecipeCard recipes={recipes} onAddRecipe={handleAddRecipe} />
        </div>
      )}
    </div>
  );
}
