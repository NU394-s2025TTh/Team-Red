import React from "react";
import { FaUserPlus } from "react-icons/fa";
import useFollowUser from "../../hooks/useFollowUser";

export default function SuggestedUserItem({ user, currentUserId }) {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    currentUserId,
    user.id
  );

  return (
    <div className="suggested-user-item">
      <div>
        <strong>{user.username}</strong>
        {user.name && <span> — {user.name}</span>}
      </div>
      <button
        onClick={handleFollowUser}
        disabled={isUpdating}
        className={`clear-button ${isFollowing ? "following" : ""}`}
      >
        {isUpdating ? (
          <span className="spinner" />
        ) : isFollowing ? (
          "Unfollow"
        ) : (
          "Follow"
        )}
      </button>
    </div>
  );
}
