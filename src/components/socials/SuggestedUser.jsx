import React from "react";
import SuggestedUserItem from "./suggestedUserItem";

export default function SuggestedUser({ users, currentUser }) {
  if (!Array.isArray(users) || users.length === 0) return null;

  return (
    <div className="suggested-user-list">
      {users.map((u) => (
        <SuggestedUserItem key={u.id} user={u} currentUserId={currentUser} />
      ))}
    </div>
  );
}
