import React, { useState, useEffect } from "react";
import "../assets/css/ingredientSelector.css"; // Import your CSS file for styling

export default function IngredientSelector({ allIngredients, onSelectionChange }) {
  const [selected, setSelected] = useState(allIngredients);

  // When the selection changes, notify the parent.
  // select all ingredients by default

  /*useEffect(() => {
    if (allIngredients && allIngredients.length > 0) {
      setSelected(allIngredients);
    }
  }, [allIngredients]);*/


   useEffect(() => {
     onSelectionChange(selected);
   }, [selected, onSelectionChange]);

  // Toggle ingredient selection
  const handleToggle = (ingredient) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        // remove ingredient
        return prevSelected.filter((i) => i !== ingredient);
      } else {
        // add ingredient
        return [...prevSelected, ingredient];
      }
    });
  };

  return (
    <div className="ingredient-selector">
      <h4>Select Ingredients to Include:</h4>
      <ul>
        {allIngredients.map((ingredient, idx) => (
          <li key={idx}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(ingredient)}
                onChange={() => handleToggle(ingredient)}
              />{" "}
              {ingredient}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
