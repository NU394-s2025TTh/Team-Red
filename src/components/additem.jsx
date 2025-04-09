
//import { handleClick } from 'react';
import React, { useState } from 'react';
import { ItemField } from './itemfields';
import './AddItemButton.css';


export function AddItemButton() {

    const [showItemField, setShowItemField] = useState(false);

    const handleClick = () => {
      setShowItemField(true);
    };
  
    return (
        <div className="add-item-container">
            <button onClick={handleClick} className="add-item-button">
                Add groceries
            </button>

            {showItemField && <ItemField/>}

        </div>
      

    );
  }