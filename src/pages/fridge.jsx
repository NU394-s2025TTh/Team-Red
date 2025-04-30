import {React, useState, useEffect} from 'react';
import { DataCardContainer } from '../components/DataCardContainer';
import { useUserData } from "../hooks/useUserData";
import Chat from '../components/chat';
import '../assets/css/container.css';
import Sidebar from '../components/sidebar';
import updateUserSpices from "../hooks/updateUserSpices";
import SpiceSelector from "../components/spiceSelector";

export default function Fridge( { userId, onLogout } ) {
  const { userData, loading, error } = useUserData(userId);
  console.log("User Data:", userData); // Log the user data to the console

  const [fridge, setFridge] = useState(userData ? userData.fridge : []);
  const [spices, setSpices] = useState(userData ? userData.spices : []);

  useEffect(() => {
    if (userData) {
      setFridge(userData.fridge);
      setSpices(userData.spices || []);
    }
  }
  , [userData]);

  useEffect(() => {
    if (userId) {
      updateUserSpices(userId, spices);
    }
  }, [spices, userId]);

  const logout =()=>{
    localStorage.clear()
    window.location.reload()
  }

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
    </div>
  );
}