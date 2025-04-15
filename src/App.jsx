import {React, useState, useEffect} from 'react';
import { DataCardContainer } from './components/DataCardContainer';
import { AddItemButton } from './components/additem';
import { useUserData } from "./hooks/useUserData";
import Chat from './components/chat';
import './assets/css/container.css';
import { RecipeCard } from './components/recipecard';

function App() {
  const { userData, loading, error } = useUserData("1001");
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

  return (
    <div className="App" style={{ backgroundColor: 'rgb(199, 218, 207)', minHeight: '100vh' }}>
      <header className="app-header">
          {/* Replace the header with the logo */}
          <img 
            src="/spoonfull_logo.png" 
            alt="Spoonfull Logo" 
            style={{
              height: '150px', 
              width: 'auto', 
              display: 'block',    // Makes the image behave like a block-level element
              marginLeft: 'auto',  // Automatically adjusts the left margin
              marginRight: 'auto', // Automatically adjusts the right margin
              marginBottom: '20px' // Space below the logo
            }}
          />
      </header>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {userData && (
        <div className="data-card-wrapper">
          <div className="data-card-content">
            <div className="left-column">
              <DataCardContainer userData={userData} />
            </div>
            
            <div className="right-column">
              <Chat ingredients={userData.fridgecontents.map(item => item.item)} />
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

export default App;
