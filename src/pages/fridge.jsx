import React from "react";
 import Sidebar from "../components/sidebar";
 import UnderConstruction from "../components/under_construction";
 import "../assets/css/styles.css";
 
 export default function Fridge({ userId }) {
   return (
     <div className="page">
         <Sidebar />
       <UnderConstruction />
     </div>
   );
 }