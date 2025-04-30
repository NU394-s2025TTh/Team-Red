import React, { useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useUser } from "../../contexts/UserContext";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "./SuggestedUser";

export default function Search() {
  const searchRef = useRef();
  const { userId: currentUser } = useUser();
  const { user: matchedUsers, isLoading, getUserProfile } = useSearchUser();

  const handleSearchUser = (e) => {
    e.preventDefault();
    const q = searchRef.current?.value.trim();
    if (q) getUserProfile(q);
  };

  return (
    <div className="search-container">
      <h1>Search for friends</h1>
      <form onSubmit={handleSearchUser}>
        <input ref={searchRef} placeholder="Enter username…" />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching…" : <FiSearch size={20} />}
        </button>
      </form>

      <SuggestedUser users={matchedUsers || []} currentUser={currentUser} />
    </div>
  );
}
