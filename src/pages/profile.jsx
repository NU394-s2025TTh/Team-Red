import React from 'react';
import { CgProfile } from "react-icons/cg";
import Sidebar from "../components/sidebar"; 
import "../assets/css/profile.css"


function Profile({ userId }) {
  return (
    <div className="profile-page">
      {/* sidebar */}
      <Sidebar />

      <div className="profile-container">
        <CgProfile className="profile-icon" />
        <h2 className="username">User ID: {userId}</h2>
      </div>
    </div>
  );
}

export default Profile;
