import './DataCard.css';
import React from 'react';
import { ItemCard } from './ItemCard';

export function DataCard({ fridgecontents }) {
    return (
        <div className="data-card">
          <h1>{name}'s Inventory</h1>
          <ul>
            {fridgecontents.map((item, index) => (
                <ItemCard item={item} />
            ))}
          </ul>
        </div>
      );
}


