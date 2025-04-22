import '../assets/css/DataCard.css';
import React, { useRef } from 'react';
import { ItemCard } from '../ItemCard';
import { AddItemButton } from '../additem';
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export function DataCard({ userId, groceryList }) {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 150; 
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="data-card">
      <h1>Your Inventory:</h1>

      <div className="items-container" ref={containerRef}>
        {Array.isArray(groceryList) && groceryList.length > 0 ? (
          groceryList.map((item, index) => (
            <ItemCard key={index} item={item} userId={userId} />
          ))
        ) : (
          <p>Nothing in grocery list.</p>
        )}
      </div>

      <div className="scroll-buttons">
        <button onClick={() => scroll('left')}><FaCaretLeft /></button>
        <button onClick={() => scroll('right')}><FaCaretRight /></button>
      </div>

      <div className="add-item-button-container">
        <AddItemButton userId={userId} />
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


