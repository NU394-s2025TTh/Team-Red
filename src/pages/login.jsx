// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { addNewUserIfNotExists } from '../components/adduser';

// const auth = getAuth(app);

// export default function Login (){

//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleUsernameChange = (event) => {
//         setUsername(event.target.value);
//     };

//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//     };

//     const handleSubmit = (event) => {
        
//     }

//     return (
//             <div>
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={handleInputChange}
//                 placeholder="Enter user ID"
//               />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     placeholder="Enter password"
//                 />
//               <button onClick={handleButtonClick}>Submit</button>
//             </div>
//         );
// }

// //this is the function for auth state

// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     await addNewUserIfNotExists(user);
//   }
// });

// Updated Login.jsx
import React, { useState } from "react";
import {auth} from "../firebaseconfig";
import { addNewUserIfNotExists } from "../components/adduser";
import "../assets/css/LoginPage.css"
import Logo from "../assets/branding/logo.png";

export default function Login({ onLogin }) {
  const [userIdInput, setUserIdInput] = useState("");
  const [password, setPassword] = useState(""); // password ignored for now


  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedId = userIdInput.trim();
    if (!trimmedId) return;
    
    // Create a fake user object with a simple id
    const userId = { id: trimmedId };
    
    const resolvedUserId = await addNewUserIfNotExists(userId);
    localStorage.setItem("userId", resolvedUserId); 
    console.log("Resolved user ID:", resolvedUserId);
    onLogin(resolvedUserId);
  };

  return (
    <div className="login-page">
      <h1>Welcome to Spoonfull!</h1>
      <img src={Logo} alt="Spoonfull Logo" className="app-logo"/>
      <h3>Please log in to enjoy our service.</h3>
        <form onSubmit={handleSubmit}>
        <div className="login-form-container">
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter user ID"
              value={userIdInput}
              onChange={(e) => setUserIdInput(e.target.value)}
              className="input"
            />
          </div>
          {/* <div className="input-container">
            <input
              type="password"
              placeholder="Enter password (ignored)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div> */}
          <button className="submit-login-button" type="submit">Submit</button>
          </div>
        </form>
    </div>
  );
}
