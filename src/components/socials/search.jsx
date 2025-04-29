import { useRef } from "react";
import { FiSearch } from "react-icons/fi";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "./SuggestedUser";
import "../../assets/css/Search.css";

const Search = () => {
  const searchRef = useRef(null);
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();

  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Search for friends</h1>
      <form className="search-form" onSubmit={handleSearchUser}>
        <input
          type="text"
          placeholder="Enter username..."
          ref={searchRef}
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={isLoading}>
          {isLoading ? "Searching..." : <FiSearch size={20} />}
        </button>
      </form>

      {user && (
        <div className="suggested-user">
          <SuggestedUser user={user} setUser={setUser} />
        </div>
      )}
    </div>
  );
};

export default Search;