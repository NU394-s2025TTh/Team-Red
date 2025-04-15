import React from "react";
import {
  FaHome,
  FaUser,
  FaCarrot,
  FaList,
  FaBookmark,
  FaUsers
} from "react-icons/fa";
import "../assets/css/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <FaHome className="icon" />
        <span className="label">Home</span>
      </div>
      <div className="sidebar-item">
        <FaUser className="icon" />
        <span className="label">Profile</span>
      </div>
      <div className="sidebar-item">
        <FaCarrot className="icon" />
        <span className="label">Fridge</span>
      </div>
      <div className="sidebar-item">
        <FaList className="icon" />
        <span className="label">Grocery List</span>
      </div>
      <div className="sidebar-item">
        <FaBookmark className="icon" />
        <span className="label">Saved</span>
      </div>
      <div className="sidebar-item">
        <FaUsers className="icon" />
        <span className="label">Friends</span>
      </div>
    </div>
  );
}
