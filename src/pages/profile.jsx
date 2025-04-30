import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../firebaseconfig";
import { CgProfile } from "react-icons/cg";
import Sidebar from "../components/sidebar";
import "../assets/css/profile.css";

function Profile({ userId }) {
  const db = getFirestore(app);
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({});
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const ref = doc(db, "users", userId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfileData(snap.data());
          setLoading(false);
        } else {
          console.error("User not found.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (userId) fetchProfile();
  }, [userId]);

  const startEditing = () => {
    setIsEditing(true);
    setTempProfile({
      username: profileData.username || "",
      email: profileData.email || "",
      phone: profileData.phone || "",
      bio: profileData.bio || "",
    });
  };

  const cancelEditing = () => setIsEditing(false);

  const handleChange = (e) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  const saveEditing = async () => {
    try {
      const ref = doc(db, "users", userId);
      await updateDoc(ref, {
        username: tempProfile.username,
        email: tempProfile.email,
        phone: tempProfile.phone,
        bio: tempProfile.bio,
      });
      setProfileData((prev) => ({ ...prev, ...tempProfile }));
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <div className="profile-page"><Sidebar /><p>Loading...</p></div>;

  const { username, email, phone, bio, followers = [], following = [] } = profileData || {};

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
            <span className="stat-number">{followers.length}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="profile-stat">
            <span className="stat-number">{following.length}</span>
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

        {/* Contact Info */}
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
              <p>{bio || "No bio provided yet"}</p>
              <p>{email || "No email on file"}</p>
              <p>{phone || "No phone number"}</p>
            </>
          )}
        </div>


        {/* Buttons */}
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
