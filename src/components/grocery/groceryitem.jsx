import '../../assets/css/DataCard.css';
import '../../assets/css/ItemCard.css';
import React, { useRef, useState, useEffect } from 'react';
import { ItemCard } from '../ItemCard';
import { AddGroceryButton } from './addgrocery';
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { app } from "../../firebaseconfig";
import { FaTrash } from "react-icons/fa";

export default function GroceryCard({ userId, groceryList }) {
  const containerRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState(
    groceryList.reduce((acc, item) => {
      acc[item.item] = true;
      return acc;
    }, {})
  );

  useEffect(() => {
    setSelectedItems(
      groceryList.reduce((acc, item) => {
        acc[item.item] = true;
        return acc;
      }, {})
    );
  }, [groceryList]);

  

  const db = getFirestore(app);
  const userRef = doc(db, "users", userId);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 150;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleToggle = async (item) => {
    const isSelected = selectedItems[item.item];

    if (isSelected) {
      try {
        await updateDoc(userRef, {
          fridge: arrayUnion({
            item: item.item.toLowerCase(),
            quantity: item.quantity || 1,
            unit: item.unit ? item.unit.toLowerCase() : '',
          }),
          groceryList: arrayRemove(item),
        });
      } catch (error) {
        console.error("Error adding item to fridge:", error);
        alert("Failed to move item to fridge.");
        return;
      }
    }

    setSelectedItems((prev) => ({
      ...prev,
      [item.item]: !isSelected,
    }));
  };


  const handleDelete = async (item) => {
    const standardizedItem = {
      item: item.item.toLowerCase(),
      quantity: item.quantity || 1,
      unit: item.unit ? item.unit.toLowerCase() : '',
    };
  
    try {
      await updateDoc(userRef, {
        groceryList: arrayRemove(standardizedItem),
      });
  
      setSelectedItems((prev) => {
        const updated = { ...prev };
        delete updated[item.item];
        return updated;
      });
    } catch (error) {
      console.error("Error deleting item from grocery list:", error);
      alert("Failed to delete item.");
    }
  };



  return (
    <div className="data-card">
      <h1>Your Grocery List:</h1>

      <div className="items-container" ref={containerRef}>
        {Array.isArray(groceryList) && groceryList.length > 0 ? (
          groceryList.map((item, index) => (
            <div key={index} className="grocery-item">
              <input
                type="checkbox"
                className="standard-checkbox"
                checked={selectedItems[item.item]}
                onChange={() => handleToggle(item)}
              />
              <ItemCard item={item} userId={userId} />

              <button
                  className="delete-button"
                  onClick={() => handleDelete(item)}
                  aria-label="Delete item"
                >
                  <FaTrash />
                </button>
            </div>
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
        <AddGroceryButton userId={userId} />
      </div>
    </div>
  );
}
