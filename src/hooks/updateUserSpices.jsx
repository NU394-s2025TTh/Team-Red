import { app } from "../firebaseconfig";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

export default function updateUserSpices(userId, spices) {
  if (!userId) {
    console.error("User ID is required");
    return;
  }

  if (!spices || !Array.isArray(spices)) {
    console.error("Spices must be an array");
    return;
  }

  const db = getFirestore(app);
  const userRef = doc(db, "users", userId);

  updateDoc(userRef, { spices })
    .then(() => {
      console.log("Spices updated successfully");
    })
    .catch((err) => {
      console.error("Failed to update spices:", err);
    });
}
