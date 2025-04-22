import React from 'react';
 import "../assets/css/under_construction.css";
 
 export default function UnderConstruction() {
   return (
     <div className="under-construction-wrapper">
       <h1>This page is under construction</h1>
       <img src="/src/assets/branding/construction.png" alt="Under Construction" className="construction-image" />
       <p>Coming soon...</p>
     </div>
   );
 }