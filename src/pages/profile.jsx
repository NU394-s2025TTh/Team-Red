import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import Sidebar from "../components/sidebar";
import "../assets/css/profile.css";

function Profile({ userId }) {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("Mad_Dawg");
  const [email, setEmail] = useState("user@gmail.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [bio, setBio] = useState("Looove to cook and eat!");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [tempProfile, setTempProfile] = useState({});

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const startEditing = () => {
    setIsEditing(true);
    setTempProfile({ username, email, phone, bio });
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveEditing = () => {
    setUsername(tempProfile.username);
    setEmail(tempProfile.email);
    setPhone(tempProfile.phone);
    setBio(tempProfile.bio);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-page">
      <Sidebar />

      <div className="profile-container">
        {/* Profile Picture */}
        <div className="profile-picture-wrapper">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-picture" />
          ) : (
            <CgProfile className="profile-icon" />
          )}
          <div className="profile-upload">
            <input
              type="file"
              accept="image/*"
              id="upload-profile"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="upload-profile" className="upload-label">Upload</label>
          </div>
        </div>

        {/* Username */}
        <div className="profile-username">
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={tempProfile.username}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <h2>{username}</h2>
          )}
        </div>

        {/* Followers and Following */}
        <div className="profile-social">
          <div className="profile-stat">
            <span className="stat-number">{followers}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="profile-stat">
            <span className="stat-number">{following}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>

        {/* Bio */}
        <div className="profile-bio">
          {isEditing ? (
            <textarea
              name="bio"
              value={tempProfile.bio}
              onChange={handleChange}
              className="profile-input bio-input"
            />
          ) : (
            <p>{bio}</p>
          )}
        </div>

        {/* Contact */}
        <div className="profile-contact">
          {isEditing ? (
            <>
              <input
                type="email"
                name="email"
                value={tempProfile.email}
                onChange={handleChange}
                className="profile-input"
              />
              <input
                type="text"
                name="phone"
                value={tempProfile.phone}
                onChange={handleChange}
                className="profile-input"
              />
            </>
          ) : (
            <>
              <p>{email}</p>
              <p>{phone}</p>
            </>
          )}
        </div>

        {/* Edit/Save/Cancel Buttons */}
        <div className="profile-buttons">
          {isEditing ? (
            <>
              <button className="save-button" onClick={saveEditing}>Save</button>
              <button className="cancel-button" onClick={cancelEditing}>Cancel</button>
            </>
          ) : (
            <button className="edit-button" onClick={startEditing}>Edit Profile</button>
          )}
        </div>

        {/* Logout */}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
