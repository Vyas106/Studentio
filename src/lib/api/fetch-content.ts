// lib/api/fetch-content.ts
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";
import type { Post, Project, Note } from "./../../../types/user";

export async function fetchUserPosts(uid: string): Promise<Post[]> {
  try {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Post));
  } catch (error) {
    console.error("Error fetching posts:", error);
    toast({
      title: "Error",
      description: "Failed to load posts",
      variant: "destructive",
    });
    return [];
  }
}

export async function fetchUserProjects(uid: string): Promise<Project[]> {
  try {
    const projectsRef = collection(db, "projects");
    const q = query(
      projectsRef,
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Project));
  } catch (error) {
    console.error("Error fetching projects:", error);
    toast({
      title: "Error",
      description: "Failed to load projects",
      variant: "destructive",
    });
    return [];
  }
}

export async function fetchUserNotes(uid: string): Promise<Note[]> {
  try {
    const notesRef = collection(db, "notes");
    const q = query(
      notesRef,
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Note));
  } catch (error) {
    console.error("Error fetching notes:", error);
    toast({
      title: "Error",
      description: "Failed to load notes",
      variant: "destructive",
    });
    return [];
  }
}