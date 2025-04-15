// import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
// import { app } from "../firebaseconfig";

// const db = getFirestore(app);

// export async function addNewUserIfNotExists(authUser) {
//   const usersRef = collection(db, "users");

//   const existingUsersSnapshot = await getDocs(usersRef);
//   let existingUser = null;
//   let highestId = 1001;

//   existingUsersSnapshot.forEach((docSnap) => {
//     const data = docSnap.data();
//     if (data.username === authUser.username) {
//       existingUser = docSnap;
//     }

//     const idAsNumber = parseInt(docSnap.id);
//     if (!isNaN(idAsNumber) && idAsNumber > highestId) {
//       highestId = idAsNumber;
//     }
//   });

//   if (existingUser) {
//     console.log("User already exists:", authUser.email);
//     return;
//   }
  
//   const newUserId = (highestId + 1).toString();

  
//   await setDoc(doc(usersRef, newUserId), {
//     username: authUser.email,
//     groceryList: [],
//     recipes: [],
//     fridge: []
//   });

//   console.log(`User added with ID ${newUserId}`);
// }
import { getFirestore, collection, getDoc, setDoc, doc } from "firebase/firestore";
import { app } from "../firebaseconfig";
export async function addNewUserIfNotExists(authUser) {
  const userDocRef = doc(getFirestore(app), "users", authUser.id); // use authUser.id directly
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    console.log("User already exists:", authUser.id);
    return authUser.id;
  }
  
  // Create a new document for this user
  await setDoc(userDocRef, {
    username: authUser.id,
    groceryList: [],
    recipes: [],
    fridge: []
  });
  
  console.log(`User added with ID ${authUser.id}`);
  return authUser.id;
}

