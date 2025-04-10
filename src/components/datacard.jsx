import './DataCard.css';
import React from 'react';
import { ItemCard } from './ItemCard';
import { AddItemButton } from './additem';

export function DataCard({ fridgecontents }) {
    return (
        <div className="data-card">
          <h1>{name}Your Inventory:</h1>
          <div className="items-container">
            {fridgecontents.map((item, index) => (
                <ItemCard item={item} />
            ))}
          </div>
          <div className="add-item-button-container">
            <AddItemButton />
          </div>
        </div>
    );
  // return (
  //       <div className="data-card">
  //         <p>Hi {name}! Your fridge has the following items:</p>
  //         <ul>
  //           {fridgecontents.map((item, index) => (
  //             <li key={index}>
  //               {item.quantity} {item.unit} of {item.item}
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     );
}


