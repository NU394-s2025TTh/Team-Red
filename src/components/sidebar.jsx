import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCarrot, FaList, FaBookmark, FaUsers, FaBars } from "react-icons/fa";
import "../assets/css/sidebar.css";
import Logo from "../assets/branding/logo.png";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); // Set initial state based on current window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (window.innerWidth <= 768) {
    return (
      <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
        <button className={`hamburger-btn ${isCollapsed ? "hamburger-btn-collapsed" : ""}`} onClick={toggleSidebar}>
          <FaBars className="hamburger-icon" />
        </button>
        <div className={`sidebar ${isCollapsed ? "collapsed-sidebar" : ""}`}>
        <img src={Logo} alt="Logo" className={`logo ${isCollapsed ? "collapsed-logo" : ""}`} />
          <div className="sidebar-items">
            <Link to="/" className="sidebar-item">
              <FaHome className="icon" />
              <span className="label">Home</span>
            </Link>
            <Link to="/profile" className="sidebar-item">
              <FaUser className="icon" />
              <span className="label">Profile</span>
            </Link>
            <Link to="/fridge" className="sidebar-item">
              <FaCarrot className="icon" />
              <span className="label">Fridge</span>
            </Link>
            <Link to="/grocery_list" className="sidebar-item">
              <FaList className="icon" />
              <span className="label">Groceries</span>
            </Link>
            <Link to="/saved" className="sidebar-item">
              <FaBookmark className="icon" />
              <span className="label">Saved</span>
            </Link>
            <Link to="/social" className="sidebar-item">
              <FaUsers className="icon" />
              <span className="label">Social</span>
            </Link>
            </div>
          </div>
      </div>
    );
  }
  else {
    return (
      <div className="sidebar-container">
        <div className={`sidebar ${isCollapsed ? "collapsed-sidebar" : ""}`}>
        <img src={Logo} alt="Logo" className={`logo ${isCollapsed ? "collapsed-logo" : ""}`} />
          <div className="sidebar-items">
            <Link to="/" className="sidebar-item">
              <FaHome className="icon" />
              <span className="label">Home</span>
            </Link>
            <Link to="/profile" className="sidebar-item">
              <FaUser className="icon" />
              <span className="label">Profile</span>
            </Link>
            <Link to="/fridge" className="sidebar-item">
              <FaCarrot className="icon" />
              <span className="label">Fridge</span>
            </Link>
            <Link to="/grocery_list" className="sidebar-item">
              <FaList className="icon" />
              <span className="label">Groceries</span>
            </Link>
            <Link to="/saved" className="sidebar-item">
              <FaBookmark className="icon" />
              <span className="label">Saved</span>
            </Link>
            <Link to="/social" className="sidebar-item">
              <FaUsers className="icon" />
              <span className="label">Social</span>
            </Link>
            </div>
          </div>
        </div>
    );
  }
}
