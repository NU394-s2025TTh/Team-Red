import React from 'react';
import { DataCardContainer } from '../components/DataCardContainer';
import { useUserData } from "../hooks/useUserData";
import Chat from '../components/chat';
import '../assets/css/container.css';
import Sidebar from '../components/sidebar';

function InventoryPage() {
  const { userData, loading, error } = useUserData("1001");

  const logout =()=>{
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="App" style={{ backgroundColor: 'rgb(199, 218, 207)', minHeight: '100vh' }}>
      

       <Sidebar />
      
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
