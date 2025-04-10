import React, { useState } from 'react';
import { app } from "../firebaseconfig";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import "../assets/css/AddItemButton.css";

export function AddItemButton() {
  const [inputValue, setInputValue] = useState('');
  const [unitValue, setUnitValue] = useState('');
  const db = getFirestore(app);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleUnitChange = (event) => {
    setUnitValue(event.target.value);
  }

  const handleButtonClick = async () => {
    if (!inputValue.trim()) return; // prevent empty submissions
    if (!unitValue.trim()) return; // prevent empty submissions

    const userRef = doc(db, 'users', '1001');

    try {
      await updateDoc(userRef, {
        fridge: arrayUnion({ item: inputValue, quantity: 1, unit: unitValue }) // add item to fridge array
      });
      setInputValue(''); // clear input field
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
