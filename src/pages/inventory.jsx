import React from 'react';
import { DataCardContainer } from '../components/DataCardContainer';
import { useUserData } from "../hooks/useUserData";
import Chat from '../components/chat';
import '../assets/css/container.css';
import Sidebar from '../components/sidebar';
import Logo from "../assets/branding/logo-transparent.png"
import Header from '../components/Header';

function InventoryPage() {
  const { userData, loading, error } = useUserData("1001");

  const logout =()=>{
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      

       <Sidebar />
      {/* <Header /> */}
      

      <div>
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
    </div>
  );
}

export default InventoryPage;
