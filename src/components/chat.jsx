import React, { useState } from "react";
import './chat.css';

export default function Chat({ ingredients }) {
  const [chatMessage, setChatMessage] = useState("");
  const [added, setAdded] = useState(false);

  const handleGenerateRecipe = async () => {
    if (!ingredients.length) return;

    // calling the chatwrapper backend here
    const response = await fetch("/api/generate-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ingredients })
    });

      const data = await response.json();
      console.log(data)
    setChatMessage(data.recipe);
    setAdded(false);
  };

  const handleAddToRecipes = () => {
    console.log("Saved to DB:", chatMessage);
    setAdded(true);
  };

  return (
    <div className="chat">
      <div>
        <h3>Fridge AI</h3>
      </div>

      <div className="chat-box">
        {chatMessage ? (
          <p className="text-gray-800">{chatMessage}</p>
        ) : (
          <p className="text-gray-400">No recipe yet...</p>
        )}
      </div>

      <div className="chat-buttons">
        {chatMessage && !added && (
          <button onClick={handleAddToRecipes} className="button-add">
            Add to my recipes
          </button>
        )}
        <button onClick={handleGenerateRecipe} className="button-generate">
          Recipe Me!
        </button>
      </div>
    </div>
  );
}