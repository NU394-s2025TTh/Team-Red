import React from 'react';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../../firebaseconfig";
import '../../assets/css/AddDelItem.css';


const db = getFirestore(app);

export function DelOneGrocery({ item, quantity, setQuantity, userId }) {
    const incrementItem = async () => {
        const userRef = doc(db, "users", userId);

        if (quantity > 1) {
        try {

            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const groceryList = userDoc.data().groceryList || [];

                // Find the item to update
                const itemIndex = groceryList.findIndex((groceryListItem) => groceryListItem.item === item.item);
                if (itemIndex !== -1) {
                    const updatedItem = {
                        ...groceryList[itemIndex],
                        quantity: parseInt(groceryList[itemIndex].quantity) - 1, // Ensure quantity is treated as a number
                    };

                    // Update the groceryList array
                    const updatedgroceryList = [
                        ...groceryList.slice(0, itemIndex),
                        updatedItem,
                        ...groceryList.slice(itemIndex + 1),
                    ];

                    await updateDoc(userRef, { groceryList: updatedgroceryList });

                    setQuantity(updatedItem.quantity);
                } else {
                    alert("Item not found in groceryList.");
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
        //delete item from groceryList
        try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const groceryList = userDoc.data().groceryList || [];

                // Find the item to update
                const itemIndex = groceryList.findIndex((groceryListItem) => groceryListItem.item === item.item);
                if (itemIndex !== -1) {
                    // Update the groceryList array
                    const updatedgroceryList = [
                        ...groceryList.slice(0, itemIndex),
                        ...groceryList.slice(itemIndex + 1),
                    ];

                    await updateDoc(userRef, { groceryList: updatedgroceryList });

                    setQuantity(0);
                } else {
                    alert("Item not found in groceryList.");
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
