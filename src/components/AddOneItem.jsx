import React from 'react';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../firebaseconfig";

const db = getFirestore(app);

export function AddOneItem({ item, quantity, setQuantity }) {
    const decrementItem = async () => {
        const userRef = doc(db, "users", "1001");

        try {
            // Get the current fridge array
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const fridge = userDoc.data().fridge || [];

                // Find the item to update
                const itemIndex = fridge.findIndex((fridgeItem) => fridgeItem.item === item.item);
                if (itemIndex !== -1) {
                    const updatedItem = {
                        ...fridge[itemIndex],
                        quantity: parseInt(fridge[itemIndex].quantity) + 1, // Ensure quantity is treated as a number
                    };

                    // Update the fridge array
                    const updatedFridge = [
                        ...fridge.slice(0, itemIndex),
                        updatedItem,
                        ...fridge.slice(itemIndex + 1),
                    ];

                    // Update the Firestore document
                    await updateDoc(userRef, { fridge: updatedFridge });

                    // Update quantity in ItemCard
                    setQuantity(updatedItem.quantity);
                } else {
                    alert("Item not found in fridge.");
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
        <button onClick={decrementItem}>
            +
        </button>
    );
}
