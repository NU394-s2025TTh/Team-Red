import React from 'react';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../firebaseconfig";
import './AddDelItem.css';

const db = getFirestore(app);

export function DelOneItem({ item, quantity, setQuantity }) {
    const incrementItem = async () => {
        const userRef = doc(db, "users", "1001");

        if (quantity > 1) {
        try {

            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const fridge = userDoc.data().fridge || [];

                // Find the item to update
                const itemIndex = fridge.findIndex((fridgeItem) => fridgeItem.item === item.item);
                if (itemIndex !== -1) {
                    const updatedItem = {
                        ...fridge[itemIndex],
                        quantity: parseInt(fridge[itemIndex].quantity) - 1, // Ensure quantity is treated as a number
                    };

                    // Update the fridge array
                    const updatedFridge = [
                        ...fridge.slice(0, itemIndex),
                        updatedItem,
                        ...fridge.slice(itemIndex + 1),
                    ];

                    await updateDoc(userRef, { fridge: updatedFridge });

                    setQuantity(updatedItem.quantity);
                } else {
                    alert("Item not found in fridge.");
                }
            } else {
                alert("User document does not exist.");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Failed. Try again.");
        }
    }
    else if (quantity <= 1) {
        //delete item from fridge
        try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const fridge = userDoc.data().fridge || [];

                // Find the item to update
                const itemIndex = fridge.findIndex((fridgeItem) => fridgeItem.item === item.item);
                if (itemIndex !== -1) {
                    // Update the fridge array
                    const updatedFridge = [
                        ...fridge.slice(0, itemIndex),
                        ...fridge.slice(itemIndex + 1),
                    ];

                    await updateDoc(userRef, { fridge: updatedFridge });

                    setQuantity(0);
                } else {
                    alert("Item not found in fridge.");
                }
            } else {
                alert("User document does not exist.");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Failed. Try again.");
        }
    }
};

    return (
        <button onClick={incrementItem} className="adddel-button">
            -
        </button>
    );
}
