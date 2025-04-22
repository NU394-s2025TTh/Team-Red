import React from 'react';
import '../assets/css/container.css';
import Logo from "../assets/branding/logo-transparent.png"

export default function Header() {
    <header className="app-header">
         <img 
           src={Logo}
           alt="Spoonfull Logo" 
           style={{
             height: '50px', 
             width: '50px', 
             display: 'block',    
             marginLeft: 'auto',  
             marginRight: 'auto', 
             marginBottom: '20px' 
           }}
         />
     </header>
}