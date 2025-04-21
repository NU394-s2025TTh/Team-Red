// import {React, useState, useEffect} from 'react';
// import { DataCardContainer } from './components/DataCardContainer';
// import { AddItemButton } from './components/additem';
// import { useUserData } from "./hooks/useUserData";
// import Chat from './components/chat';
// import './App.css';
// import './assets/css/container.css';
// import Sidebar from './components/sidebar';

// import { RecipeCard } from './components/recipecard';

// function App() {
//   const { userData, loading, error } = useUserData("1001");
//   console.log("User Data:", userData); // Log the user data to the console

//   const [recipes, setRecipes] = useState(userData ? userData.recipes : []);

//   useEffect(() => {
//     if (userData) {
//       setRecipes(userData.recipes);
//     }
//   }, [userData]);

//   const handleAddRecipe = (newRecipe) => {
//     setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
//   };

//   const logout =()=>{
//     localStorage.clear()
//     window.location.reload()
//   }

//   return (
//     <div className="App" style={{ backgroundColor: 'rgb(199, 218, 207)', minHeight: '100vh' }}>

//         < Sidebar />
      
//         <header className="App-header">
         
//         <img 
//           src="/spoonfull_logo.png" 
//           alt="Spoonfull Logo" 
//           className="app-logo"
//         />
//       </header>

//       <div>
//             <h1>Home Page</h1>
//             <button onClick={logout}>Logout</button>
//         </div>



//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}

//       {userData && (
//         <div className="data-card-wrapper">
//           <div className="data-card-content">
//             <div className="left-column">
//               <DataCardContainer userData={userData} />
//             </div>
            
//             <div className="right-column">
//               <Chat ingredients={userData.fridgecontents.map(item => item.item)} />
//             </div>
//           </div>
//         </div>
//       )}

//       {userData && (
//         <div>
//         <RecipeCard recipes={recipes} onAddRecipe={handleAddRecipe} />
//       </div>
//     )}

      
//     </div>
//   );
// }

// export default App;


// login
import React, { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import MainApp from './components/mainApp';
import Profile from './pages/profile';
import './App.css';

function App() {
  const [fakeUserId, setFakeUserId] = useState(null);

  const handleLogin = (userId) => {
    setFakeUserId(userId);
  };

  const handleLogout = () => {
    setFakeUserId(null);
    window.location.reload();
  };

  return (
    <UserContext.Provider value={ {userId: fakeUserId, handleLogout} }>
      <Router> {/* This is the ONLY Router in your app */}
        <Routes>
          <Route
            path="/"
            element={
              fakeUserId
                ? <MainApp userId={fakeUserId} onLogout={handleLogout} />
                : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/profile"
            element={
              fakeUserId
                ? <Profile userId={fakeUserId} />
                : <Navigate to="/" replace />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
