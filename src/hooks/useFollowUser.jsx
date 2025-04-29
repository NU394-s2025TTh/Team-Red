import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { app } from "../firebaseconfig";


const useFollowUser = (currentUserId, userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const db = getFirestore(app);

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      
      const currentUserRef = doc(db, "users", currentUserId);
      const userToFollowOrUnfollowRef = doc(db, "users", userId);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing ? arrayRemove(currentUserId) : arrayUnion(currentUserId),
      });

      setIsFollowing((prev) => !prev);
      
      
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
      
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const checkFollowing = async () => {
      try {
        const currentUserRef = doc(db, "users", currentUserId);
        const currentUserDoc = await getDoc(currentUserRef);
        if (currentUserDoc.exists) {
          const followingList = currentUserDoc.data().following || [];
          setIsFollowing(followingList.includes(userId));
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    if (currentUserId && userId) {
      checkFollowing();
    }
  }, [currentUserId, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
