import {React, useState, useEffect} from 'react';
import { DataCardContainer } from './components/DataCardContainer';
import { AddItemButton } from './components/additem';
import { useUserData } from "./hooks/useUserData";
import Chat from './components/chat';
import './assets/css/container.css';
import Sidebar from './components/sidebar';

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

  const logout =()=>{
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="App" style={{ backgroundColor: 'rgb(199, 218, 207)', minHeight: '100vh' }}>

        < Sidebar />
      
        <header className="app-header">
         
          <img 
            src="/spoonfull_logo.png" 
            alt="Spoonfull Logo" 
            style={{
              height: '150px', 
              width: 'auto', 
              display: 'block',    
              marginLeft: 'auto',  
              marginRight: 'auto', 
              marginBottom: '20px' 
            }}
          />
      </header>

      <div>
            <h1>Home Page</h1>
            <button onClick={logout}>Logout</button>
        </div>



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
