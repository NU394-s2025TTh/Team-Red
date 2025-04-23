import React from 'react';
 import Sidebar from "../components/sidebar";
 import UnderConstruction from "../components/under_construction";
 
 export default function GroceryList({ userId }) {
   return (
     <div className="page">
         <Sidebar />
       <UnderConstruction />
     </div>
   );
 }