import './DataCard.css';
import React from 'react';


export function DataCard({ fridgecontents }) {
    return (
        <div className="data-card">
          <p>Hi {name}! Your fridge has the following items:</p>
          <ul>
            {fridgecontents.map((item, index) => (
              <li key={index}>
                {item.quantity} {item.unit} of {item.item}
              </li>
            ))}
          </ul>
        </div>
      );
}


