import React from 'react';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../firebaseconfig";
import '../assets/css/AddDelItem.css';

const db = getFirestore(app);

export function AddOneItem({ item, quantity, setQuantity, userId }) {
    const decrementItem = async () => {
        const userRef = doc(db, "users", userId);

        try {
            // Get the current groceryList array
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const groceryList = userDoc.data().groceryList || [];

                // Find the item to update
                const itemIndex = groceryList.findIndex((groceryItem) => groceryItem.item === item.item);
                if (itemIndex !== -1) {
                    const updatedItem = {
                        ...groceryList[itemIndex],
                        quantity: parseInt(groceryList[itemIndex].quantity) + 1, // Ensure quantity is treated as a number
                    };

                    
                    const updatedGroceryList = [
                        ...groceryList.slice(0, itemIndex),
                        updatedItem,
                        ...groceryList.slice(itemIndex + 1),
                    ];

                    // Update the Firestore document
                    await updateDoc(userRef, { groceryList: updatedGroceryList });

                    // Update quantity in ItemCard
                    setQuantity(updatedItem.quantity);
                } else {
                    alert("Item not found in grocery list.");
                }
            } else {
                alert("User document does not exist.");
            }
        } catch (error) {
            console.error("Error incrementing item: ", error);
            alert("Failed to increment item. Try again.");
        }
    };

    return (
        <button onClick={decrementItem} className="adddel-button">
            +
        </button>
    );
}
