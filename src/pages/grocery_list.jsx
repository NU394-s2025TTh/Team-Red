import {React, useState, useEffect} from 'react';
import { DataCardContainer } from '../components/DataCardContainer';
 import Sidebar from "../components/sidebar";
 import { AddItemButton } from '../components/additem';
 import { useUserData } from "../hooks/useUserData";
 import Chat from '../components/chat';
 import '../assets/css/mainApp.css';
 import '../assets/css/container.css';

 import { RecipeCard } from '../components/recipecard';
 
 export default function GroceryList({ userId }) {
  const { userData, loading, error } = useUserData(userId);
  console.log("User Data:", userData); // Log the user data to the console

  const [recipes, setRecipes] = useState(userData ? userData.recipes : []);
  const [fridge, setFridge] = useState(userData ? userData.fridge : []);

  useEffect(() => {
    if (userData) {
      setRecipes(userData.recipes);
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      setFridge(userData.fridge);
    }
  }
  , [userData]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const logout =()=>{
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="App" style={{ backgroundColor: '#FFFADD', minHeight: '100vh' }}>

        < Sidebar />
      
        <header className="App-header">
         
        <img 
          src="/spoonfull_logo.png" 
          alt="Spoonfull Logo" 
          className="app-logo"
        />
      </header>
      <div>
        </div>



      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {userData && (
        <div className="data-card-wrapper">
          <div className="data-card-content">
            <div className="left-column">
              <DataCardContainer userId={userId} />
            </div>
            
            <div className="right-column">
              <DataCardContainer userId={userId} />
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


 