import {React, useState, useEffect} from 'react';
import { useUserData } from "../hooks/useUserData";
// import '../assets/css/mainApp.css';
import '../assets/css/container.css';
import Sidebar from '../components/sidebar';
import { RecipeCard } from '../components/recipecard';


export default function Saved( { userId, onLogout } ) {
  const { userData, loading, error } = useUserData(userId);
  console.log("User Data:", userData); // Log the user data to the console

  const [recipes, setRecipes] = useState(userData ? userData.recipes : []);

  useEffect(() => {
    if (userData) {
      setRecipes(userData.recipes);
    }
  }, [userData]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const logout =()=>{
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="App" style={{ minHeight: '100vh' }}>

        < Sidebar />
        <div className="mobile-header"></div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {userData && (
        <div>
        <RecipeCard recipes={recipes} onAddRecipe={handleAddRecipe} />
      </div>
    )}

      
    </div>
  );
}

