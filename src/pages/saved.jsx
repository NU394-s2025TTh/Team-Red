// import React from 'react';
// import Sidebar from "../components/sidebar";
// import { RecipeCard } from "../components/recipecard";

// function Saved({ recipes }) {
//   return (
//     <div style={{ backgroundColor: '#FFFADD', minHeight: '100vh' }}>
//       <Sidebar />
//       <div style={{ marginLeft: '250px', padding: '20px' }}>
//         <h1>Saved Recipes</h1>
//         <RecipeCard recipes={recipes} />
//       </div>
//     </div>
//   );
// }

// export default Saved;

// src/pages/Saved.jsx
import React from "react";
import Sidebar from "../components/sidebar";
import { RecipeCard } from "../components/recipecard";
import { useUserData } from "../hooks/useUserData";
import useRecipes from "../hooks/useRecipes";

function Saved({ userId }) {
  const { userData, loading, error } = useUserData(userId);
  const { recipes, addRecipe } = useRecipes(userData);

  return (
    <div className="App" style={{ backgroundColor: "#FFFADD", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ marginLeft: "250px", padding: "20px" }}>
        <h1>Saved Recipes</h1>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {userData && (
          <RecipeCard recipes={recipes} onAddRecipe={addRecipe} />
        )}
      </div>
    </div>
  );
}

export default Saved;
