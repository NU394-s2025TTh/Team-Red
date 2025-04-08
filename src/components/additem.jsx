
//import { handleClick } from 'react';
import React, { useState } from 'react';
import { ItemField } from './itemfields';


export function AddItemButton() {

    const [showItemField, setShowItemField] = useState(false);

    const handleClick = () => {
      setShowItemField(true);
    };
  
    return (
        <div>
            <button onClick={handleClick}>
                Add groceries
            </button>

            {showItemField && <ItemField/>}

        </div>
      

    );
  }