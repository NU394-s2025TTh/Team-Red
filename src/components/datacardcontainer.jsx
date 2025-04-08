import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebaseconfig";
import { DataCard } from './datacard';

const db = getFirestore(app);

export function DataCardContainer() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userRef = doc(db, "users", "1001");
      const docSnap = await getDoc(userRef);

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
    }

    fetchData();
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
