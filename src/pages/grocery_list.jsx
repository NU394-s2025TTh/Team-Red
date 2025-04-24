import {React, useState, useEffect} from 'react';
import { DataCardContainer } from '../components/datacardcontainer';
import  GroceryContainer  from '../components/grocery/grocerycontainer';
 import Sidebar from "../components/sidebar";
 import { useUserData } from "../hooks/useUserData";
 import '../assets/css/mainApp.css';
 import '../assets/css/container.css';


 
 export default function GroceryList({ userId, onLogout }) {
  const { userData, loading, error } = useUserData(userId);
  console.log("User Data:", userData); // Log the user data to the console

  
  const [groceryList, setGroceryList] = useState(userData ? userData.groceryList : []);

  

  useEffect(() => {
    if (userData) {
      setGroceryList(userData.groceryList);
    }
  }, [userData]);

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
            </div>

            <div className="right-column">
              <div className="image-container-grocery"> 
                <GroceryContainer userId={userId} />
              </div>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}



 