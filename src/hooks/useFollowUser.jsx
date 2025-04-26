import { useEffect, useState } from "react";
import { firestore } from "firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const useFollowUser = (currentUserId, userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, "users", currentUserId);
      const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

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
        const currentUserDoc = await firestore.collection('users').doc(currentUserId).get();
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
