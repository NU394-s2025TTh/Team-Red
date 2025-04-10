import React from 'react';
import { DataCardContainer } from './components/DataCardContainer';
import { AddItemButton } from './components/additem';
import { useUserData } from "./hooks/useUserData";
import Chat from './components/chat';
import './components/container.css';

function App() {
  const { userData, loading, error } = useUserData("1001");

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {userData && (
        <div className="data-card-wrapper">
          <div className="data-card-content">
            <div className="left-column">
              <DataCardContainer userData={userData} />
              <AddItemButton />
            </div>
            
            <div className="right-column">
              <Chat ingredients={userData.fridgecontents.map(item => item.item)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="App">
  //     {loading && <p>Loading...</p>}
  //     {error && <p>Error: {error}</p>}

  //     {userData && (
  //       <>
  //         <DataCardContainer userData={userData} />
  //         <AddItemButton />
  //         <Chat ingredients={userData.fridgecontents.map(item => item.item)} />
  //       </>
  //     )}
  //   </div>
  // );
}

export default App;
