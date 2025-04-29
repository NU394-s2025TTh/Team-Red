import React, { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import MainApp from './components/mainApp';
import Profile from './pages/profile';
import Fridge from './pages/fridge';
import GroceryList from './pages/grocery_list.jsx';
import Saved from './pages/saved';
import Social from './pages/social';
import './App.css';

function App() {
  const [userId, setUserId] = useState(null);

  const handleLogin = (userId) => {
    setUserId(userId);
  };

  const handleLogout = () => {
    setUserId(null);
    window.location.reload();
  };

  return (
    <UserContext.Provider value={ {userId: userId, handleLogout} }>
      <Router> 
        <Routes>
          <Route
            path="/"
            element={
              userId
                ? <MainApp userId={userId} onLogout={handleLogout} />
                : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/profile"
            element={
              userId
                ? <Profile userId={userId} />
                : <Navigate to="/" replace />
            }
          />
          <Route
            path="/fridge"
            element={
              userId
                ? <Fridge userId={userId} />
                : <Navigate to="/" replace />
            }
          />
          <Route
            path="/grocery_list"
            element={
              userId
                ? <GroceryList userId={userId} />
                : <Navigate to="/" replace />
            }
          />
          <Route
            path="/saved"
            element={
              userId
                ? <Saved userId={userId} />
                : <Navigate to="/" replace />
            }
          />
          <Route
            path="/social"
            element={
              userId
                ? <Social userId={userId} />
                : <Navigate to="/" replace />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;