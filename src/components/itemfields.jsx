import React, { useState } from 'react';
import { app } from "../firebaseconfig";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";

export function ItemField() {
  const [inputValue, setInputValue] = useState('');
  const db = getFirestore(app);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    if (!inputValue.trim()) return; // prevent empty submissions

    const userRef = doc(db, 'users', '1001');

    try {
      await updateDoc(userRef, {
        fridge: arrayUnion({ item: inputValue })
      });
      alert(`You added: ${inputValue}`);
      setInputValue(''); // clear input field
      
    } catch (error) {
      console.error("Error adding item: ", error);
      alert("Failed to add item. Try again.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter an item"
      />
      <button onClick={handleButtonClick}>Submit</button>
    </div>
  );
}
