import React, { useEffect, useState } from 'react';
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { app } from "../firebaseconfig";
import { DataCard } from './datacard';

const db = getFirestore(app);

export function DataCardContainer() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userRef = doc(db, "users", "1001");

    // Listen for real-time updates
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData({
          name: data.name,
          fridgecontents: data.fridge.map(item => ({
            item: item.item,
            quantity: item.quantity,
            unit: item.unit,
          }))
        });
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      {userData ? (
        <DataCard name={userData.name} fridgecontents={userData.fridgecontents} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
