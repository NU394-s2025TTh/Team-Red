import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { app, storage } from "../firebaseconfig";
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageRef = ref(storage, `profilePictures/${userId}`);
    try {
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);
      setProfileImage(imageUrl);
      const refDoc = doc(db, "users", userId);
      await updateDoc(refDoc, { profileImage: imageUrl });
    } catch (err) {
      console.error("Failed to upload image:", err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const ref = doc(db, "users", userId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setProfileData(data);
          if (data.profileImage) setProfileImage(data.profileImage);
        } else {
          console.error("User not found.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchProfile();
  }, [userId]);

  const startEditing = () => {
    setIsEditing(true);
    setTempProfile({
      username: profileData?.username || "",
      email: profileData?.email || "",
      phone: profileData?.phone || "",
      bio: profileData?.bio || "",
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
              placeholder="Username"
              value={tempProfile.username}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <h2>{username || "Unnamed User"}</h2>
          )}
        </div>

        {/* Followers/Following */}
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
              placeholder="Write a short bio"
              value={tempProfile.bio}
              onChange={handleChange}
              className="profile-input bio-input"
            />
          ) : (
            <p>{bio || "Write short bio"}</p>
          )}
        </div>

        {/* Contact */}
        <div className="profile-contact">
          {isEditing ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={tempProfile.email}
                onChange={handleChange}
                className="profile-input"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={tempProfile.phone}
                onChange={handleChange}
                className="profile-input"
              />
            </>
          ) : (
            <>
              <p>{email || "Add Email"}</p>
              <p>{phone || "Add Phone Number"}</p>
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

        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
