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
            <span className={`label ${isCollapsed ? "collapsed-label" : ""}`}>Home</span>
          </Link>
          <Link to="/profile" className="sidebar-item">
            <FaUser className="icon" />
            <span className={`label ${isCollapsed ? "collapsed-label" : ""}`}>Profile</span>
          </Link>
          <Link to="/fridge" className="sidebar-item">
            <FaCarrot className="icon" />
            <span className={`label ${isCollapsed ? "collapsed-label" : ""}`}>Fridge</span>
          </Link>
          <Link to="/grocery-list" className="sidebar-item">
            <FaList className="icon" />
            <span className={`label ${isCollapsed ? "collapsed-label" : ""}`}>Grocery List</span>
          </Link>
          <Link to="/saved" className="sidebar-item">
            <FaBookmark className="icon" />
            <span className={`label ${isCollapsed ? "collapsed-label" : ""}`}>Saved</span>
          </Link>
          <Link to="/friends" className="sidebar-item">
            <FaUsers className="icon" />
            <span className={`label ${isCollapsed ? "collapsed-label" : ""}`}>Friends</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
