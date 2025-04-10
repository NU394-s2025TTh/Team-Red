import React, { useState } from 'react';
import '../assets/css/ItemCard.css';

import { AddOneItem } from './AddOneItem';
import { DelOneItem } from './DelOneItem';

export function ItemCard({ item }) {
    const [quantity, setQuantity] = useState(parseInt(item.quantity)); // Manage quantity state in ItemCard

    return (
        <div className="item-card">
            <div className="item-title">
                <h2>{item.item}</h2>
            </div>
            <div className="quantity-container">
                <DelOneItem item={item} quantity={quantity} setQuantity={setQuantity}/>
                <p className="quantity">{quantity}</p>
                <AddOneItem item={item} quantity={quantity} setQuantity={setQuantity}/>
            </div>
            <p className="unit">{item.unit}</p>
        </div>
  );
}

