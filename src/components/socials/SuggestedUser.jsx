
import React from "react";
import "../../assets/css/Search.css"; 
import { FaTimes } from "react-icons/fa";

const SuggestedUser = ({ user, setUser }) => {
  if (!user) return null;


  const users = Array.isArray(user) ? user : [user];

  return (
    <div className="suggested-user-list">
      {users.map((u, index) => (
        <div key={index} className="suggested-user-item">
          <div>
            <strong>{u.username}</strong>
            {u.name && <span> — {u.name}</span>}
          </div>
          <button onClick={() => setUser(null)} className="clear-button">
            < FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SuggestedUser;
