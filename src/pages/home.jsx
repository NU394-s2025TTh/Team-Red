import React from "react";
import { useUserData } from "../hooks/useUserData";
import Sidebar from "../components/sidebar";

export default function Home({ userId }) {
  const { userData, loading, error } = useUserData(userId);

  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div className="content" style={{ padding: "2rem" }}>
        {loading && <p>Loading your data...</p>}
        {error && <p>Error: {error}</p>}

        {userData && (
          <div>
            <h1>Welcome, {userData.name || "User"}!</h1>
            <p>This is your new home page.</p>
          </div>
        )}
      </div>
    </div>
  );
}
