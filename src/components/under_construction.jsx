import React from 'react';
 import "../assets/css/under_construction.css";
 
 export default function UnderConstruction() {
   return (
     <div className="under-construction-wrapper">
       <h1>Under construction!</h1>
       <img src="/src/assets/branding/logo-transparent.png" alt="App Logo" className="construction-image" />
       <p>Check back soon!</p>
     </div>
   );
 }