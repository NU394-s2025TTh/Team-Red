import { useState, useRef } from "react";
import useSearchUser from "../../hooks/useSearchUser";
import { FiSearch } from "react-icons/fi";
import SuggestedUser from "./SuggestedUser";
import "../../assets/css/Search.css"; 

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();

  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
     
      <div className="tooltip-container">
        <div className="search-button" onClick={openModal}>
			<FiSearch size={20} color="white" />
          <span className="search-text">Search</span>
        </div>
        <div className="tooltip-text">Search</div>
      </div>

      
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            <h2>Search User</h2>
            <form onSubmit={handleSearchUser}>
              <div className="form-control">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="asaprogrammer"
                  ref={searchRef}
                  className="input"
                />
              </div>
              <div className="form-footer">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Search"}
                </button>
              </div>
            </form>
            {user && (
              <div className="suggested-user">
                <SuggestedUser user={user} setUser={setUser} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
