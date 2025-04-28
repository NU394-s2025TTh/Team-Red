import React from 'react';
 import Sidebar from "../components/sidebar";
 import Search from "../components/socials/search";
 
 export default function Social({ userId }) {
     return (
         <div>
             <Sidebar />
           <Search />
         </div>
     );
 }
     