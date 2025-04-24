import React, { useState } from "react";
import "../assets/css/spiceSelector.css";

const DEFAULT_SPICES = [
  "Salt",
  "Pepper",
  "Cumin",
  "Coriander",
  "Paprika",
  "Turmeric",
  "Oregano",
  "Thyme",
  "Rosemary",
  "Cinnamon",
  "Nutmeg",
  "Clove",
  "Basil",
  "Chili Powder",
  "Curry Powder",
];

export default function SpiceSelector({ spices, onChange }) {
  const [search, setSearch] = useState("");
  const [customSpice, setCustomSpice] = useState("");

  const filtered = DEFAULT_SPICES.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (spice) => {
    if (spices.includes(spice)) {
      onChange(spices.filter((s) => s !== spice));
    } else {
      onChange([...spices, spice]);
    }
  };

  const handleAddCustomSpice = () => {
    const trimmed = customSpice.trim();
    if (trimmed && !selectedSpices.includes(trimmed)) {
      onChange([...spices, trimmed]);
      setCustomSpice("");
    }
  };

  return (
    <div className="spice-selector">
      <h4>Spice Cabinet</h4>
      <input
        type="text"
        placeholder="Search spices..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="spice-search"
      />

      <div className="spice-list">
        {filtered.map((spice, idx) => (
          <label key={idx} className="spice-option">
            <input
              type="checkbox"
              checked={selectedSpices.includes(spice)}
              onChange={() => handleToggle(spice)}
            />
            {spice}
          </label>
        ))}
      </div>

      <div className="custom-spice">
        <input
          type="text"
          placeholder="Add custom spice"
          value={customSpice}
          onChange={(e) => setCustomSpice(e.target.value)}
        />
        <button onClick={handleAddCustomSpice}>Add</button>
      </div>
    </div>
  );
}
