import '../assets/css/DataCard.css';
import React from 'react';
import { ItemCard } from './ItemCard';
import { AddItemButton } from './additem';

export function DataCard({ userId, fridge }) {
  return (
    <div className="data-card">
      <h1>Your Inventory:</h1>

      <div className="items-container">
        {Array.isArray(fridge) && fridge.length > 0 ? (
          fridge.map((item, index) => (
            <ItemCard key={index} item={item} userId={userId} />
          ))
        ) : (
          <p>No items in fridge.</p>
        )}
      </div>
      <div className="add-item-button-container">
        <AddItemButton userId={userId}/>
      </div>
    </div>
  );
}


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
// }


