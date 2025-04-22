import React from "react";
 import Sidebar from "../components/sidebar";
 import UnderConstruction from "../components/under_construction";
 
 export default function Fridge({ userId }) {
   return (
     <div>
         <Sidebar />
       <UnderConstruction />
     </div>
   );
 }