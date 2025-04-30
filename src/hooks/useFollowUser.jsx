import { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { app } from "../firebaseconfig";

export default function useFollowUser(currentUserId, targetUserId) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const db = getFirestore(app);

  // 1) Subscribe to currentUser's `following` field
  useEffect(() => {
    if (!currentUserId || !targetUserId) return;
    const uid = String(currentUserId);
    const ref = doc(db, "users", uid);

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          const followingList = snap.data().following || [];
          setIsFollowing(followingList.includes(String(targetUserId)));
        }
      },
      (err) => console.error("Error listening to follow list:", err)
    );

    return unsubscribe;
  }, [db, currentUserId, targetUserId]);

  // 2) Toggle follow/unfollow by always reading the up-to-date array first
  const handleFollowUser = async () => {
    if (!currentUserId || !targetUserId) return;
    setIsUpdating(true);

    try {
      const uid = String(currentUserId);
      const tid = String(targetUserId);
      const meRef = doc(db, "users", uid);
      const youRef = doc(db, "users", tid);

      // fetch the _live_ list so we never go out of sync
      const meSnap = await getDoc(meRef);
      const liveFollowing = meSnap.data()?.following || [];
      const shouldUnfollow = liveFollowing.includes(tid);

      await updateDoc(meRef, {
        following: shouldUnfollow ? arrayRemove(tid) : arrayUnion(tid),
      });
      await updateDoc(youRef, {
        followers: shouldUnfollow ? arrayRemove(uid) : arrayUnion(uid),
      });

      // no need to flip isFollowing here — onSnapshot will fire shortly
    } catch (err) {
      console.error("Error follow/unfollow:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return { isFollowing, isUpdating, handleFollowUser };
}
