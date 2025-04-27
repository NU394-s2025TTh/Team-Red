import React, { useState } from 'react';
import { app } from "../../firebaseconfig";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import "../../assets/css/AddItemButton.css";
//import { useUser } from '../contexts/UserContext';

export function AddGroceryButton( {userId}) {
  const [inputValue, setInputValue] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [unitValue, setUnitValue] = useState('');
  const db = getFirestore(app);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantityValue(event.target.value);
  };

  const handleUnitChange = (event) => {
    setUnitValue(event.target.value);
  }

  const handleButtonClick = async () => {
    if (!inputValue.trim()) return; // prevent empty submissions

    //const { userId } = useUser();

    const storedUserId = localStorage.getItem("userId"); 
    if (!storedUserId) return;

    const userRef = doc(db, 'users', userId);

    //const userRef = doc(db, 'users', storedUserId);

    try {
      await updateDoc(userRef, {
        groceryList: arrayUnion({ item: inputValue.toLowerCase(), quantity: quantityValue ? quantityValue: 1, unit: unitValue.toLowerCase() }) 
      });
      setInputValue(''); // clear input field
      setQuantityValue(''); // clear quantity field
        setUnitValue(''); // clear unit field
      
    } catch (error) {
      console.error("Error adding item: ", error);
      alert("Failed to add item. Try again.");
    }
  };

  return (
    <div className="add-item-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add an ingredient"
        className="add-item-input"
      />
      <input
        type="number"
        value={quantityValue}
        onChange={handleQuantityChange}
        placeholder="Qty"
        min="1"
        className="add-qt-input"
      />
      <input
        type="text"
        value={unitValue}
        onChange={handleUnitChange}
        placeholder="Unit"
        className="add-unit-input"
      />
      <button onClick={handleButtonClick} className="add-item-button">Submit</button>
    </div>
  );
}

