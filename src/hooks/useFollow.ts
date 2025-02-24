
  // hooks/useFollow.ts
  import { useState } from 'react';
  import { db, auth } from '@/lib/firebase';
  import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
  import { useToast } from '@/hooks/use-toast';
  
  export const useFollow = (targetUserId: string) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const currentUser = auth.currentUser;
  
    const toggleFollow = async () => {
      if (!currentUser) {
        toast({
          title: "Authentication required",
          description: "Please sign in to follow users",
          variant: "destructive",
        });
        return;
      }
  
      setLoading(true);
      try {
        const currentUserRef = doc(db, "users", currentUser.uid);
        const targetUserRef = doc(db, "users", targetUserId);
  
        if (isFollowing) {
          await updateDoc(currentUserRef, {
            following: arrayRemove(targetUserId)
          });
          await updateDoc(targetUserRef, {
            followers: arrayRemove(currentUser.uid)
          });
        } else {
          await updateDoc(currentUserRef, {
            following: arrayUnion(targetUserId)
          });
          await updateDoc(targetUserRef, {
            followers: arrayUnion(currentUser.uid)
          });
        }
  
        setIsFollowing(!isFollowing);
        toast({
          title: isFollowing ? "Unfollowed" : "Following",
          description: `You are ${isFollowing ? 'no longer' : 'now'} following this user`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update following status",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
  
    return { isFollowing, loading, toggleFollow };
  };
  