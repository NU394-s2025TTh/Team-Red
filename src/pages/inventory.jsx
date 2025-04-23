import {React, useState, useEffect} from 'react';
import { DataCardContainer } from '../components/DataCardContainer';
import { useUserData } from "../hooks/useUserData";
import Chat from '../components/chat';
// import '../assets/css/mainApp.css';
import '../assets/css/container.css';
import Sidebar from '../components/sidebar';


export default function Inventory( { userId, onLogout } ) {
  const { userData, loading, error } = useUserData(userId);
  console.log("User Data:", userData); // Log the user data to the console

  const [fridge, setFridge] = useState(userData ? userData.fridge : []);

  useEffect(() => {
    if (userData) {
      setFridge(userData.fridge);
    }
  }
  , [userData]);

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
        <div className="data-card-wrapper">
          <div className="data-card-content">
            <div className="left-column">
              <DataCardContainer userId={userId} />
            </div>
            
            <div className="right-column">
            <Chat ingredients={fridge?.map(item => item.item) || []}
            userId={userId}
             />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}