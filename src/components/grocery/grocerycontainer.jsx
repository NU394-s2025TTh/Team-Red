import React, { useEffect, useState } from 'react';
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { app } from "../firebaseconfig";
import { DataCard } from './datacard';
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const db = getFirestore(app);

export function DataCardContainer({userId,}) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userRef = doc(db, "users", userId);

    // Listen for real-time updates
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData({
          name: data.name,
          groceryList: Array.isArray(data.groceryList)
          ? data.groceryList.map(item => ({
              item: item.item,
              quantity: item.quantity,
              unit: item.unit,
            }))
          : []
        });
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      {userData ? (
        <DataCard userId={userId} groceryList={userData.groceryList} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
  }
