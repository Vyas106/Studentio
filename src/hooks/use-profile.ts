"use client";

// hooks/use-profile.ts
import { useState, useEffect } from "react";
import { auth, db, doc, getDoc, collection, getDocs, updateDoc, signOut } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { arrayUnion, arrayRemove } from "firebase/firestore";
import type { UserProfile, Post, Project, Note } from "./../../types/user";

export function useProfile(userId?: string) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser && !userId) {
        router.push("/login");
        return;
      }

      const profileId = userId || currentUser?.uid;

      try {
        // Fetch user profile
        const userRef = doc(db, "users", profileId!);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data() as UserProfile;
          setUser(userData);
          
          // Check if current user is following this profile
          if (currentUser && userId) {
            const currentUserRef = doc(db, "users", currentUser.uid);
            const currentUserSnap = await getDoc(currentUserRef);
            if (currentUserSnap.exists()) {
              const following = currentUserSnap.data().following || [];
              setIsFollowing(following.includes(userId));
            }
          }

          // Fetch user content
          await Promise.all([
            fetchPosts(profileId!),
            fetchProjects(profileId!),
            fetchNotes(profileId!)
          ]);
        } else if (!userId) {
          router.push("/form");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, router]);

  const fetchPosts = async (uid: string) => {
    try {
      const postsRef = collection(db, `users/${uid}/posts`);
      const postsSnap = await getDocs(postsRef);
      const postsData = postsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchProjects = async (uid: string) => {
    try {
      const projectsRef = collection(db, `users/${uid}/projects`);
      const projectsSnap = await getDocs(projectsRef);
      const projectsData = projectsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchNotes = async (uid: string) => {
    try {
      const notesRef = collection(db, `users/${uid}/notes`);
      const notesSnap = await getDocs(notesRef);
      const notesData = notesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Note[];
      setNotes(notesData);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleFollowToggle = async () => {
    if (!auth.currentUser || !user) return;
    
    try {
      const currentUserRef = doc(db, "users", auth.currentUser.uid);
      const targetUserRef = doc(db, "users", user.uid);
      
      if (isFollowing) {
        await updateDoc(currentUserRef, {
          following: arrayRemove(user.uid)
        });
        await updateDoc(targetUserRef, {
          followers: arrayRemove(auth.currentUser.uid)
        });
      } else {
        await updateDoc(currentUserRef, {
          following: arrayUnion(user.uid)
        });
        await updateDoc(targetUserRef, {
          followers: arrayUnion(auth.currentUser.uid)
        });
      }
      
      setIsFollowing(!isFollowing);
      toast({
        title: "Success",
        description: isFollowing ? "Unfollowed user" : "Following user",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update follow status",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const handlePostCreate = (post: Post) => {
    setPosts([post, ...posts]);
  };

  const handleProjectCreate = (project: Project) => {
    setProjects([project, ...projects]);
  };

  const handleNoteCreate = (note: Note) => {
    setNotes([note, ...notes]);
  };

  const handlePostDelete = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleProjectDelete = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const handleNoteDelete = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  return {
    user,
    posts,
    projects,
    notes,
    loading,
    isFollowing,
    handleFollowToggle,
    handleLogout,
    handlePostCreate,
    handleProjectCreate,
    handleNoteCreate,
    handlePostDelete,
    handleProjectDelete,
    handleNoteDelete,
  };
}