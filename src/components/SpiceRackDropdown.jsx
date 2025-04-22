import React, { useState } from 'react';

export default function Dropdown() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedValue} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="option1">Salt</option>
        <option value="option2">Pepper</option>
        <option value="option3">Paprika</option>
        <option value="option4">Garlic Powder</option>
        <option value="option5">Cayenne Pepper</option>
        <option value="option6">Cinnamon</option>
      </select>
      
    </div>
  );
}

