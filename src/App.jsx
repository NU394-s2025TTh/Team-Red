// App.jsx
import React from 'react';
import { DataCardContainer } from './components/DataCardContainer'; // adjust path as needed
import { AddItemButton } from './components/additem';


function App() {
  return (
    <div className="App">
      <DataCardContainer />
      <AddItemButton />
    </div>
    
  );
}

export default App;
