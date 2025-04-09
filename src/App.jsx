import React from 'react';
import { DataCardContainer } from './components/DataCardContainer';
import { AddItemButton } from './components/additem';
import RecipeGenerator from "./components/recipegen";
import { useUserData } from "./hooks/useUserData";

function App() {
  const { userData, loading, error } = useUserData("1001");

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {userData && (
        <>
          <DataCardContainer userData={userData} />
          <AddItemButton />
          <RecipeGenerator fridgecontents={userData.fridgecontents.map((item) => item.item)} />
        </>
      )}
    </div>
  );
}
export default App;