import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCarrot, FaList, FaBookmark, FaUsers, FaBars } from "react-icons/fa";
import "../assets/css/sidebar.css";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <FaBars className="hamburger-icon" />
      </button>

      <div className={`sidebar ${isCollapsed ? "collapsed-sidebar" : ""}`}>
        <div className="sidebar-items">
          <Link to="/" className="sidebar-item">
            <FaHome className="icon" />
            <span className="label">Home</span>
          </Link>
          <Link to="/profile" className="sidebar-item">
            <FaUser className="icon" />
            <span className="label">Profile</span>
          </Link>
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
      </div>
    </div>
  );
}
