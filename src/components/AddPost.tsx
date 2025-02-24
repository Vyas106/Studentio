// // // // // components/AddPost.tsx
// // // // "use client";

// // // // import { useState } from "react";
// // // // import { auth, db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL } from "@/lib/firebase";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Card } from "@/components/ui/card";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Textarea } from "@/components/ui/textarea";
// // // // import { toast } from "sonner";
// // // // import type { Post } from "../../types/user";

// // // // export function AddPost({ onPostCreated }: { onPostCreated: (post: Post) => void }) {
// // // //   const [content, setContent] = useState("");
// // // //   const [image, setImage] = useState<File | null>(null);
// // // //   const [tags, setTags] = useState("");
// // // //   const [loading, setLoading] = useState(false);

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     if (!auth.currentUser) return;

// // // //     setLoading(true);
// // // //     try {
// // // //       let imageUrl;
// // // //       if (image) {
// // // //         const imageRef = ref(storage, `posts/${auth.currentUser.uid}/${Date.now()}`);
// // // //         await uploadBytes(imageRef, image);
// // // //         imageUrl = await getDownloadURL(imageRef);
// // // //       }

// // // //       const postData: Omit<Post, "id"> = {
// // // //         userId: auth.currentUser.uid,
// // // //         content,
// // // //         imageUrl,
// // // //         tags: tags.split(",").map(tag => tag.trim()).filter(Boolean),
// // // //         likes: [],
// // // //         createdAt: Date.now()
// // // //       };

// // // //       const docRef = await addDoc(collection(db, "posts"), postData);
// // // //       const newPost = { ...postData, id: docRef.id } as Post;
      
// // // //       onPostCreated(newPost);
// // // //       setContent("");
// // // //       setImage(null);
// // // //       setTags("");
      
// // // //       toast({
// // // //         title: "Success",
// // // //         description: "Post created successfully",
// // // //       });
// // // //     } catch (error) {
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "Failed to create post",
// // // //         variant: "destructive",
// // // //       });
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Card className="p-4 mb-6">
// // // //       <form onSubmit={handleSubmit} className="space-y-4">
// // // //         <Textarea
// // // //           placeholder="What's on your mind?"
// // // //           value={content}
// // // //           onChange={(e) => setContent(e.target.value)}
// // // //           required
// // // //         />
        
// // // //         <Input
// // // //           type="file"
// // // //           accept="image/*"
// // // //           onChange={(e) => e.target.files?.[0] && setImage(e.target.files[0])}
// // // //         />
        
// // // //         <Input
// // // //           placeholder="Tags (comma-separated)"
// // // //           value={tags}
// // // //           onChange={(e) => setTags(e.target.value)}
// // // //         />
        
// // // //         <Button type="submit" disabled={loading}>
// // // //           {loading ? "Posting..." : "Create Post"}
// // // //         </Button>
// // // //       </form>
// // // //     </Card>
// // // //   );
// // // // }

// // // // // components/AddProject.tsx
// // // // export function AddProject({ onProjectCreated }: { onProjectCreated: (project: Project) => void }) {
// // // //   const [title, setTitle] = useState("");
// // // //   const [description, setDescription] = useState("");
// // // //   const [image, setImage] = useState<File | null>(null);
// // // //   const [links, setLinks] = useState<{ title: string; url: string }[]>([{ title: "", url: "" }]);
// // // //   const [loading, setLoading] = useState(false);

// // // //   const addLink = () => {
// // // //     setLinks([...links, { title: "", url: "" }]);
// // // //   };

// // // //   const updateLink = (index: number, field: "title" | "url", value: string) => {
// // // //     const newLinks = [...links];
// // // //     newLinks[index][field] = value;
// // // //     setLinks(newLinks);
// // // //   };

// // // //  // components/AddProject.tsx (continued)
// // // //  const handleSubmit = async (e: React.FormEvent) => {
// // // //   e.preventDefault();
// // // //   if (!auth.currentUser) return;

// // // //   setLoading(true);
// // // //   try {
// // // //     let imageUrl;
// // // //     if (image) {
// // // //       const imageRef = ref(storage, `projects/${auth.currentUser.uid}/${Date.now()}`);
// // // //       await uploadBytes(imageRef, image);
// // // //       imageUrl = await getDownloadURL(imageRef);
// // // //     }

// // // //     const projectData: Omit<Project, "id"> = {
// // // //       userId: auth.currentUser.uid,
// // // //       title,
// // // //       description,
// // // //       imageUrl,
// // // //       links: links.filter(link => link.title && link.url),
// // // //       createdAt: Date.now()
// // // //     };

// // // //     const docRef = await addDoc(collection(db, "projects"), projectData);
// // // //     const newProject = { ...projectData, id: docRef.id } as Project;
    
// // // //     onProjectCreated(newProject);
// // // //     setTitle("");
// // // //     setDescription("");
// // // //     setImage(null);
// // // //     setLinks([{ title: "", url: "" }]);
    
// // // //     toast({
// // // //       title: "Success",
// // // //       description: "Project created successfully",
// // // //     });
// // // //   } catch (error) {
// // // //     toast({
// // // //       title: "Error",
// // // //       description: "Failed to create project",
// // // //       variant: "destructive",
// // // //     });
// // // //   } finally {
// // // //     setLoading(false);
// // // //   }
// // // // };

// // // // return (
// // // //   <Card className="p-4 mb-6">
// // // //     <form onSubmit={handleSubmit} className="space-y-4">
// // // //       <Input
// // // //         placeholder="Project Title"
// // // //         value={title}
// // // //         onChange={(e) => setTitle(e.target.value)}
// // // //         required
// // // //       />
      
// // // //       <Textarea
// // // //         placeholder="Project Description"
// // // //         value={description}
// // // //         onChange={(e) => setDescription(e.target.value)}
// // // //         required
// // // //       />
      
// // // //       <Input
// // // //         type="file"
// // // //         accept="image/*"
// // // //         onChange={(e) => e.target.files?.[0] && setImage(e.target.files[0])}
// // // //       />
      
// // // //       {links.map((link, index) => (
// // // //         <div key={index} className="flex gap-2">
// // // //           <Input
// // // //             placeholder="Link Title"
// // // //             value={link.title}
// // // //             onChange={(e) => updateLink(index, "title", e.target.value)}
// // // //           />
// // // //           <Input
// // // //             placeholder="URL"
// // // //             value={link.url}
// // // //             onChange={(e) => updateLink(index, "url", e.target.value)}
// // // //           />
// // // //         </div>
// // // //       ))}
      
// // // //       <Button type="button" variant="outline" onClick={addLink}>
// // // //         Add Link
// // // //       </Button>
      
// // // //       <Button type="submit" disabled={loading}>
// // // //         {loading ? "Creating..." : "Create Project"}
// // // //       </Button>
// // // //     </form>
// // // //   </Card>
// // // // );
// // // // }

// // // // // components/AddNote.tsx
// // // // export function AddNote({ onNoteCreated }: { onNoteCreated: (note: Note) => void }) {
// // // // const [title, setTitle] = useState("");
// // // // const [driveLink, setDriveLink] = useState("");
// // // // const [description, setDescription] = useState("");
// // // // const [loading, setLoading] = useState(false);

// // // // const handleSubmit = async (e: React.FormEvent) => {
// // // //   e.preventDefault();
// // // //   if (!auth.currentUser) return;

// // // //   setLoading(true);
// // // //   try {
// // // //     const noteData: Omit<Note, "id"> = {
// // // //       userId: auth.currentUser.uid,
// // // //       title,
// // // //       driveLink,
// // // //       description,
// // // //       createdAt: Date.now()
// // // //     };

// // // //     const docRef = await addDoc(collection(db, "notes"), noteData);
// // // //     const newNote = { ...noteData, id: docRef.id } as Note;
    
// // // //     onNoteCreated(newNote);
// // // //     setTitle("");
// // // //     setDriveLink("");
// // // //     setDescription("");
    
// // // //     toast({
// // // //       title: "Success",
// // // //       description: "Note created successfully",
// // // //     });
// // // //   } catch (error) {
// // // //     toast({
// // // //       title: "Error",
// // // //       description: "Failed to create note",
// // // //       variant: "destructive",
// // // //     });
// // // //   } finally {
// // // //     setLoading(false);
// // // //   }
// // // // };

// // // // return (
// // // //   <Card className="p-4 mb-6">
// // // //     <form onSubmit={handleSubmit} className="space-y-4">
// // // //       <Input
// // // //         placeholder="Note Title"
// // // //         value={title}
// // // //         onChange={(e) => setTitle(e.target.value)}
// // // //         required
// // // //       />
      
// // // //       <Input
// // // //         placeholder="Google Drive Link"
// // // //         value={driveLink}
// // // //         onChange={(e) => setDriveLink(e.target.value)}
// // // //         required
// // // //       />
      
// // // //       <Textarea
// // // //         placeholder="Description"
// // // //         value={description}
// // // //         onChange={(e) => setDescription(e.target.value)}
// // // //         required
// // // //       />
      
// // // //       <Button type="submit" disabled={loading}>
// // // //         {loading ? "Creating..." : "Create Note"}
// // // //       </Button>
// // // //     </form>
// // // //   </Card>
// // // // );
// // // // }

// // // // // Fetch functions for Profile Page
// // // // const fetchPosts = async (uid: string) => {
// // // // try {
// // // //   const postsRef = collection(db, "posts");
// // // //   const q = query(
// // // //     postsRef,
// // // //     where("userId", "==", uid),
// // // //     orderBy("createdAt", "desc")
// // // //   );
  
// // // //   const querySnapshot = await getDocs(q);
// // // //   const posts: Post[] = [];
  
// // // //   querySnapshot.forEach((doc) => {
// // // //     posts.push({ ...doc.data(), id: doc.id } as Post);
// // // //   });
  
// // // //   setPosts(posts);
// // // // } catch (error) {
// // // //   console.error("Error fetching posts:", error);
// // // //   toast({
// // // //     title: "Error",
// // // //     description: "Failed to load posts",
// // // //     variant: "destructive",
// // // //   });
// // // // }
// // // // };

// // // // const fetchProjects = async (uid: string) => {
// // // // try {
// // // //   const projectsRef = collection(db, "projects");
// // // //   const q = query(
// // // //     projectsRef,
// // // //     where("userId", "==", uid),
// // // //     orderBy("createdAt", "desc")
// // // //   );
  
// // // //   const querySnapshot = await getDocs(q);
// // // //   const projects: Project[] = [];
  
// // // //   querySnapshot.forEach((doc) => {
// // // //     projects.push({ ...doc.data(), id: doc.id } as Project);
// // // //   });
  
// // // //   setProjects(projects);
// // // // } catch (error) {
// // // //   console.error("Error fetching projects:", error);
// // // //   toast({
// // // //     title: "Error",
// // // //     description: "Failed to load projects",
// // // //     variant: "destructive",
// // // //   });
// // // // }
// // // // };

// // // // const fetchNotes = async (uid: string) => {
// // // // try {
// // // //   const notesRef = collection(db, "notes");
// // // //   const q = query(
// // // //     notesRef,
// // // //     where("userId", "==", uid),
// // // //     orderBy("createdAt", "desc")
// // // //   );
  
// // // //   const querySnapshot = await getDocs(q);
// // // //   const notes: Note[] = [];
  
// // // //   querySnapshot.forEach((doc) => {
// // // //     notes.push({ ...doc.data(), id: doc.id } as Note);
// // // //   });
  
// // // //   setNotes(notes);
// // // // } catch (error) {
// // // //   console.error("Error fetching notes:", error);
// // // //   toast({
// // // //     title: "Error",
// // // //     description: "Failed to load notes",
// // // //     variant: "destructive",
// // // //   });
// // // // }
// // // // };

// // // // // Content List Components
// // // // export function PostsList({ posts }: { posts: Post[] }) {
// // // // return (
// // // //   <div className="space-y-4">
// // // //     {posts.map((post) => (
// // // //       <Card key={post.id} className="p-4">
// // // //         <div className="space-y-2">
// // // //           <p className="whitespace-pre-wrap">{post.content}</p>
// // // //           {post.imageUrl && (
// // // //             <img
// // // //               src={post.imageUrl}
// // // //               alt="Post"
// // // //               className="rounded-lg max-h-96 object-cover"
// // // //             />
// // // //           )}
// // // //           {post.tags.length > 0 && (
// // // //             <div className="flex flex-wrap gap-2">
// // // //               {post.tags.map((tag) => (
// // // //                 <span
// // // //                   key={tag}
// // // //                   className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
// // // //                 >
// // // //                   {tag}
// // // //                 </span>
// // // //               ))}
// // // //             </div>
// // // //           )}
// // // //           <div className="text-sm text-gray-500">
// // // //             {new Date(post.createdAt).toLocaleDateString()}
// // // //           </div>
// // // //         </div>
// // // //       </Card>
// // // //     ))}
// // // //   </div>
// // // // );
// // // // }

// // // // export function ProjectsList({ projects }: { projects: Project[] }) {
// // // // return (
// // // //   <div className="space-y-4">
// // // //     {projects.map((project) => (
// // // //       <Card key={project.id} className="p-4">
// // // //         <div className="space-y-4">
// // // //           <div className="flex items-center justify-between">
// // // //             <h3 className="text-lg font-medium">{project.title}</h3>
// // // //             <span className="text-sm text-gray-500">
// // // //               {new Date(project.createdAt).toLocaleDateString()}
// // // //             </span>
// // // //           </div>
          
// // // //           {project.imageUrl && (
// // // //             <img
// // // //               src={project.imageUrl}
// // // //               alt={project.title}
// // // //               className="rounded-lg max-h-60 object-cover"
// // // //             />
// // // //           )}
          
// // // //           <p className="text-gray-600">{project.description}</p>
          
// // // //           {project.links.length > 0 && (
// // // //             <div className="flex flex-wrap gap-2">
// // // //               {project.links.map((link, index) => (
// // // //                 <a
// // // //                   key={index}
// // // //                   href={link.url}
// // // //                   target="_blank"
// // // //                   rel="noopener noreferrer"
// // // //                   className="text-blue-600 hover:text-blue-800"
// // // //                 >
// // // //                   {link.title}
// // // //                 </a>
// // // //               ))}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </Card>
// // // //     ))}
// // // //   </div>
// // // // );
// // // // }

// // // // export function NotesList({ notes }: { notes: Note[] }) {
// // // // return (
// // // //   <div className="space-y-4">
// // // //     {notes.map((note) => (
// // // //       <Card key={note.id} className="p-4">
// // // //         <div className="space-y-2">
// // // //           <div className="flex items-center justify-between">
// // // //             <h3 className="text-lg font-medium">{note.title}</h3>
// // // //             <span className="text-sm text-gray-500">
// // // //               {new Date(note.createdAt).toLocaleDateString()}
// // // //             </span>
// // // //           </div>
          
// // // //           <p className="text-gray-600">{note.description}</p>
          
// // // //           <a
// // // //             href={note.driveLink}
// // // //             target="_blank"
// // // //             rel="noopener noreferrer"
// // // //             className="text-blue-600 hover:text-blue-800"
// // // //           >
// // // //             View Note
// // // //           </a>
// // // //         </div>
// // // //       </Card>
// // // //     ))}
// // // //   </div>
// // // // );
// // // // }


// // // // components/forms/AddPost.tsx
// // // import { useState } from "react";
// // // import { auth, db, storage } from "@/lib/firebase";
// // // import { collection, addDoc } from "firebase/firestore";
// // // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // // import { Button } from "@/components/ui/button";
// // // import { Card } from "@/components/ui/card";
// // // import { Input } from "@/components/ui/input";
// // // import { Textarea } from "@/components/ui/textarea";
// // // import { toast } from "@/hooks/use-toast";
// // // import type { Post } from "../../types/user";

// // // interface AddPostProps {
// // //   userId: string;
// // //   onPostCreated: (post: Post) => void;
// // // }

// // // // export function AddPost({ onPostCreated }: { onPostCreated: (post: Post) => void }) {
// // //   export function AddPost({ onPostCreated, userId }: { onPostCreated: (post: Post) => void; userId: string }) {

// // //   const [content, setContent] = useState("");
// // //   const [image, setImage] = useState<File | null>(null);
// // //   const [tags, setTags] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!auth.currentUser) return;

// // //     setLoading(true);
// // //     try {
// // //       let imageUrl;
// // //       if (image) {
// // //         const imageRef = ref(storage, `posts/${auth.currentUser.uid}/${Date.now()}`);
// // //         await uploadBytes(imageRef, image);
// // //         imageUrl = await getDownloadURL(imageRef);
// // //       }

// // //       const postData: Omit<Post, "id"> = {
// // //         // userId: auth.currentUser.uid,
// // //         userId,
// // //         content,
// // //         imageUrl,
// // //         tags: tags.split(",").map(tag => tag.trim()).filter(Boolean),
// // //         likes: [],
// // //         createdAt: Date.now()
// // //       };

// // //       const docRef = await addDoc(collection(db, "posts"), postData);
// // //       onPostCreated({ ...postData, id: docRef.id } as Post);
      
// // //       setContent("");
// // //       setImage(null);
// // //       setTags("");
// // //       toast({ title: "Success", description: "Post created successfully" });
// // //     } catch (error) {
// // //       toast({ title: "Error", description: "Failed to create post", variant: "destructive" });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <Card className="p-4 mb-6">
// // //       <form onSubmit={handleSubmit} className="space-y-4">
// // //         <Textarea
// // //           placeholder="What's on your mind?"
// // //           value={content}
// // //           onChange={(e) => setContent(e.target.value)}
// // //           required
// // //         />
// // //         <Input
// // //           type="file"
// // //           accept="image/*"
// // //           onChange={(e) => e.target.files?.[0] && setImage(e.target.files[0])}
// // //         />
// // //         <Input
// // //           placeholder="Tags (comma-separated)"
// // //           value={tags}
// // //           onChange={(e) => setTags(e.target.value)}
// // //         />
// // //         <Button type="submit" disabled={loading}>
// // //           {loading ? "Posting..." : "Create Post"}
// // //         </Button>
// // //       </form>
// // //     </Card>
// // //   );
// // // }



// // // import { useState } from "react";
// // // import { db } from "@/lib/firebase";
// // // import { collection, addDoc } from "firebase/firestore";
// // // import { Button } from "@/components/ui/button";
// // // import { Card } from "@/components/ui/card";
// // // import { Input } from "@/components/ui/input";
// // // import { Textarea } from "@/components/ui/textarea";
// // // import { toast } from "@/hooks/use-toast";
// // // import type { Post } from "../../types/user";

// // // interface AddPostProps {
// // //   userId: string;
// // //   onPostCreated: (post: Post) => void;
// // // }

// // // async function uploadToCloudinary(file: File) {
// // //   try {
// // //     const formData = new FormData();
// // //     formData.append('file', file);
// // //     formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
// // //     formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);

// // //     const response = await fetch(
// // //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
// // //       {
// // //         method: 'POST',
// // //         body: formData,
// // //       }
// // //     );

// // //     if (!response.ok) {
// // //       throw new Error('Upload failed');
// // //     }

// // //     const data = await response.json();
// // //     return data.secure_url;
// // //   } catch (error) {
// // //     console.error('Error uploading to Cloudinary:', error);
// // //     throw error;
// // //   }
// // // }

// // // export function AddPost({ onPostCreated, userId }: AddPostProps) {
// // //   const [content, setContent] = useState("");
// // //   const [image, setImage] = useState<File | null>(null);
// // //   const [tags, setTags] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     try {
// // //       let imageUrl;
// // //       if (image) {
// // //         imageUrl = await uploadToCloudinary(image);
// // //       }

// // //       const postData: Omit<Post, "id"> = {
// // //         userId,
// // //         content,
// // //         imageUrl,
// // //         tags: tags.split(",").map(tag => tag.trim()).filter(Boolean),
// // //         likes: [],
// // //         createdAt: Date.now()
// // //       };

// // //       const docRef = await addDoc(collection(db, "posts"), postData);
// // //       onPostCreated({ ...postData, id: docRef.id } as Post);
      
// // //       setContent("");
// // //       setImage(null);
// // //       setTags("");
// // //       toast({ title: "Success", description: "Post created successfully" });
// // //     } catch (error) {
// // //       console.error('Error creating post:', error);
// // //       toast({ 
// // //         title: "Error", 
// // //         description: "Failed to create post. Please try again.", 
// // //         variant: "destructive" 
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <Card className="p-4 mb-6">
// // //       <form onSubmit={handleSubmit} className="space-y-4">
// // //         <Textarea
// // //           placeholder="What's on your mind?"
// // //           value={content}
// // //           onChange={(e) => setContent(e.target.value)}
// // //           required
// // //         />
// // //         <Input
// // //           type="file"
// // //           accept="image/*"
// // //           onChange={(e) => e.target.files?.[0] && setImage(e.target.files[0])}
// // //         />
// // //         <Input
// // //           placeholder="Tags (comma-separated)"
// // //           value={tags}
// // //           onChange={(e) => setTags(e.target.value)}
// // //         />
// // //         <Button type="submit" disabled={loading}>
// // //           {loading ? "Posting..." : "Create Post"}
// // //         </Button>
// // //       </form>
// // //     </Card>
// // //   );
// // // }



// // //     // components/forms/AddProject.tsx
// // //     import { useState, useCallback } from 'react';
// // // import { useDropzone } from 'react-dropzone';
// // // import { PlusCircle, X, Upload, Loader2 } from 'lucide-react';
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from '@/components/ui/select';
// // // import { Textarea } from '@/components/ui/textarea';
// // // import { Input } from '@/components/ui/input';
// // // import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// // // import { useToast } from '@/hooks/use-toast';
// // // import { addDoc, collection } from 'firebase/firestore';
// // // import { db, auth } from '@/lib/firebase';
// // // import { EnhancedProject, ProjectMember, ProjectLink } from './../../types/user';
// // // import { uploadToCloudinary } from './../../utils/cloudinary';
// // // import { Button } from '@/components/ui/button';
// // // import {
// // //   Form,
// // //   FormControl,
// // //   FormField,
// // //   FormItem,
// // //   FormLabel,
// // //   FormMessage,
// // // } from '@/components/ui/form';
// // // import { z } from 'zod';
// // // import { useForm } from 'react-hook-form';
// // // import { zodResolver } from '@hookform/resolvers/zod';

// // // const projectSchema = z.object({
// // //   title: z.string().min(1, 'Title is required'),
// // //   description: z.string().min(10, 'Description must be at least 10 characters'),
// // //   teamSize: z.number().min(1, 'Team size must be at least 1'),
// // //   category: z.string().min(1, 'Category is required'),
// // //   skills: z.array(z.string()),
// // //   deadline: z.string().optional(),
// // //   status: z.literal('Open'),
// // //   links: z.array(z.object({
// // //     title: z.string(),
// // //     url: z.string().url('Invalid URL')
// // //   }))
// // // });

// // // type ProjectFormValues = z.infer<typeof projectSchema>;

// // // const categories = [
// // //   { value: 'web', label: 'Web Development' },
// // //   { value: 'mobile', label: 'Mobile Development' },
// // //   { value: 'ai', label: 'AI/ML' },
// // //   { value: 'design', label: 'Design' },
// // //   { value: 'other', label: 'Other' }
// // // ];

// // // export function AddProject({ 
// // //   onProjectCreated 
// // // }: { 
// // //   onProjectCreated: (project: EnhancedProject) => void 
// // // }) {
// // //   const [image, setImage] = useState<File | null>(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const { toast } = useToast();

// // //   const form = useForm<ProjectFormValues>({
// // //     resolver: zodResolver(projectSchema),
// // //     defaultValues: {
// // //       title: '',
// // //       description: '',
// // //       teamSize: 1,
// // //       category: '',
// // //       skills: [],
// // //       status: 'Open',
// // //       links: []
// // //     }
// // //   });

// // //   const onDrop = useCallback((acceptedFiles: File[]) => {
// // //     const file = acceptedFiles[0];
// // //     if (file) {
// // //       if (file.size > 5 * 1024 * 1024) { // 5MB limit
// // //         toast({
// // //           title: "Error",
// // //           description: "Image must be less than 5MB",
// // //           variant: "destructive"
// // //         });
// // //         return;
// // //       }
// // //       setImage(file);
// // //     }
// // //   }, [toast]);

// // //   const { getRootProps, getInputProps, isDragActive } = useDropzone({
// // //     onDrop,
// // //     accept: { 'image/*': [] },
// // //     maxFiles: 1
// // //   });

// // //   const onSubmit = async (data: ProjectFormValues) => {
// // //     if (!auth.currentUser) {
// // //       toast({
// // //         title: "Error",
// // //         description: "You must be logged in to create a project",
// // //         variant: "destructive"
// // //       });
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     try {
// // //       let imageUrl;
// // //       if (image) {
// // //         const imageData = await uploadToCloudinary(image, 'projects');
// // //         imageUrl = imageData?.url;
// // //       }

// // //       const projectData: Omit<EnhancedProject, 'id'> = {
// // //         userId: auth.currentUser.uid,
// // //         ...data,
// // //         imageUrl,
// // //         currentMembers: 1,
// // //         members: [] as ProjectMember[],
// // //         createdAt: Date.now()
// // //       };

// // //       const docRef = await addDoc(collection(db, 'projects'), projectData);
// // //       onProjectCreated({ ...projectData, id: docRef.id } as EnhancedProject);
      
// // //       form.reset();
// // //       setImage(null);
      
// // //       toast({
// // //         title: "Success",
// // //         description: "Project created successfully"
// // //       });
// // //     } catch (error) {
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to create project",
// // //         variant: "destructive"
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <Card className="w-full max-w-2xl mx-auto">
// // //       <CardHeader>
// // //         <CardTitle>Create New Project</CardTitle>
// // //       </CardHeader>
// // //       <CardContent>
// // //         <Form {...form}>
// // //           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
// // //             <FormField
// // //               control={form.control}
// // //               name="title"
// // //               render={({ field }) => (
// // //                 <FormItem>
// // //                   <FormLabel>Project Title</FormLabel>
// // //                   <FormControl>
// // //                     <Input {...field} placeholder="Enter project title" />
// // //                   </FormControl>
// // //                   <FormMessage />
// // //                 </FormItem>
// // //               )}
// // //             />

// // //             <div className="space-y-2">
// // //               <FormLabel>Project Image</FormLabel>
// // //               <div
// // //                 {...getRootProps()}
// // //                 className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
// // //                   ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
// // //               >
// // //                 <input {...getInputProps()} />
// // //                 {image ? (
// // //                   <div className="space-y-2">
// // //                     <p className="text-sm text-gray-600">{image.name}</p>
// // //                     <Button
// // //                       type="button"
// // //                       variant="ghost"
// // //                       size="sm"
// // //                       onClick={(e) => {
// // //                         e.stopPropagation();
// // //                         setImage(null);
// // //                       }}
// // //                     >
// // //                       Remove
// // //                     </Button>
// // //                   </div>
// // //                 ) : (
// // //                   <>
// // //                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
// // //                     <p className="mt-2 text-sm text-gray-600">
// // //                       {isDragActive
// // //                         ? "Drop the image here"
// // //                         : "Drag 'n' drop a project image, or click to select"}
// // //                     </p>
// // //                   </>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             <FormField
// // //               control={form.control}
// // //               name="description"
// // //               render={({ field }) => (
// // //                 <FormItem>
// // //                   <FormLabel>Description</FormLabel>
// // //                   <FormControl>
// // //                     <Textarea
// // //                       {...field}
// // //                       placeholder="Describe your project"
// // //                       className="min-h-[120px]"
// // //                     />
// // //                   </FormControl>
// // //                   <FormMessage />
// // //                 </FormItem>
// // //               )}
// // //             />

// // //             <div className="grid grid-cols-2 gap-4">
// // //               <FormField
// // //                 control={form.control}
// // //                 name="teamSize"
// // //                 render={({ field }) => (
// // //                   <FormItem>
// // //                     <FormLabel>Team Size</FormLabel>
// // //                     <FormControl>
// // //                       <Input
// // //                         type="number"
// // //                         min="1"
// // //                         {...field}
// // //                         onChange={(e) => field.onChange(parseInt(e.target.value))}
// // //                       />
// // //                     </FormControl>
// // //                     <FormMessage />
// // //                   </FormItem>
// // //                 )}
// // //               />

// // //               <FormField
// // //                 control={form.control}
// // //                 name="category"
// // //                 render={({ field }) => (
// // //                   <FormItem>
// // //                     <FormLabel>Category</FormLabel>
// // //                     <Select
// // //                       value={field.value}
// // //                       onValueChange={field.onChange}
// // //                     >
// // //                       <FormControl>
// // //                         <SelectTrigger>
// // //                           <SelectValue placeholder="Select category" />
// // //                         </SelectTrigger>
// // //                       </FormControl>
// // //                       <SelectContent>
// // //                         {categories.map((category) => (
// // //                           <SelectItem key={category.value} value={category.value}>
// // //                             {category.label}
// // //                           </SelectItem>
// // //                         ))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                     <FormMessage />
// // //                   </FormItem>
// // //                 )}
// // //               />
// // //             </div>

// // //             <div className="space-y-2">
// // //               <FormLabel>Project Links</FormLabel>
// // //               {form.watch('links')?.map((_, index) => (
// // //                 <div key={index} className="flex gap-2">
// // //                   <FormField
// // //                     control={form.control}
// // //                     name={`links.${index}.title`}
// // //                     render={({ field }) => (
// // //                       <FormItem className="flex-1">
// // //                         <FormControl>
// // //                           <Input {...field} placeholder="Link Title" />
// // //                         </FormControl>
// // //                         <FormMessage />
// // //                       </FormItem>
// // //                     )}
// // //                   />
// // //                   <FormField
// // //                     control={form.control}
// // //                     name={`links.${index}.url`}
// // //                     render={({ field }) => (
// // //                       <FormItem className="flex-1">
// // //                         <FormControl>
// // //                           <Input {...field} placeholder="URL" />
// // //                         </FormControl>
// // //                         <FormMessage />
// // //                       </FormItem>
// // //                     )}
// // //                   />
// // //                   <Button
// // //                     type="button"
// // //                     variant="ghost"
// // //                     size="icon"
// // //                     onClick={() => {
// // //                       const currentLinks = form.getValues('links');
// // //                       form.setValue('links', currentLinks.filter((_, i) => i !== index));
// // //                     }}
// // //                   >
// // //                     <X className="h-4 w-4" />
// // //                   </Button>
// // //                 </div>
// // //               ))}
// // //               <Button
// // //                 type="button"
// // //                 variant="outline"
// // //                 onClick={() => {
// // //                   const currentLinks = form.getValues('links');
// // //                   form.setValue('links', [...currentLinks, { title: '', url: '' }]);
// // //                 }}
// // //                 className="w-full"
// // //               >
// // //                 <PlusCircle className="h-4 w-4 mr-2" />
// // //                 Add Link
// // //               </Button>
// // //             </div>

// // //             <Button type="submit" disabled={loading} className="w-full">
// // //               {loading ? (
// // //                 <>
// // //                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // //                   Creating Project...
// // //                 </>
// // //               ) : (
// // //                 'Create Project'
// // //               )}
// // //             </Button>
// // //           </form>
// // //         </Form>
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect, useRef } from 'react';
// // import { Camera, X, Loader2 } from 'lucide-react';
// // import { uploadToCloudinary } from '../../utils/cloudinary';  
// // import { extractHashtags, popularHashtags } from './../../utils/hashtags';
// // import { addDoc, collection } from 'firebase/firestore';
// // import { useToast } from '@/hooks/use-toast';
// // import { Card, CardHeader, CardContent } from '@/components/ui/card';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Button } from '@/components/ui/button';
// // import { Post } from './../../types/user';
// // import { db } from '@/lib/firebase';
// // import {
// //   Command,
// //   CommandEmpty,
// //   CommandGroup,
// //   CommandInput,
// //   CommandItem,
// //   CommandList
// // } from '@/components/ui/command';
// // import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// // interface AddPostProps {
// //   onPostCreated: (post: Post) => void;
// //   userId: string;
// // }

// // export function AddPost({ onPostCreated, userId }: AddPostProps) {
// //   const [content, setContent] = useState('');
// //   const [image, setImage] = useState<File | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [imagePreview, setImagePreview] = useState<string | null>(null);
// //   const [hashtags, setHashtags] = useState<string[]>([]);
// //   const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [cursorPosition, setCursorPosition] = useState<number>(0);
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const textareaRef = useRef<HTMLTextAreaElement>(null);
// //   const { toast } = useToast();

// //   useEffect(() => {
// //     if (image) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImagePreview(reader.result as string);
// //       };
// //       reader.readAsDataURL(image);
// //     } else {
// //       setImagePreview(null);
// //     }
// //   }, [image]);

// //   const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
// //     const newContent = e.target.value;
// //     const cursorPos = e.target.selectionStart;
// //     setCursorPosition(cursorPos);
// //     setContent(newContent);
    
// //     // Extract hashtags from content
// //     const extractedTags = extractHashtags(newContent);
// //     setHashtags(extractedTags);

// //     // Check if we should show hashtag suggestions
// //     const lastWord = getWordAtCursor(newContent, cursorPos);
// //     if (lastWord.startsWith('#')) {
// //       const search = lastWord.slice(1).toLowerCase();
// //       const filtered = popularHashtags
// //         .filter(tag => tag.toLowerCase().startsWith(search))
// //         .slice(0, 5);
// //       setSuggestedTags(filtered);
// //       setShowSuggestions(filtered.length > 0);
// //     } else {
// //       setShowSuggestions(false);
// //     }
// //   };

// //   const getWordAtCursor = (text: string, cursorPos: number): string => {
// //     const textBeforeCursor = text.slice(0, cursorPos);
// //     const words = textBeforeCursor.split(/\s/);
// //     return words[words.length - 1];
// //   };

// //   const insertHashtag = (tag: string) => {
// //     if (!textareaRef.current) return;

// //     const textBeforeCursor = content.slice(0, cursorPosition);
// //     const textAfterCursor = content.slice(cursorPosition);
// //     const words = textBeforeCursor.split(/\s/);
// //     words.pop(); // Remove the partial hashtag
// //     const newContent = [...words, `#${tag}`, textAfterCursor].join(' ');
    
// //     setContent(newContent);
// //     setShowSuggestions(false);
    
// //     // Focus back on textarea
// //     textareaRef.current.focus();
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!content.trim()) {
// //       toast({
// //         title: "Error",
// //         description: "Post content cannot be empty",
// //         variant: "destructive"
// //       });
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       let imageData;
// //       if (image) {
// //         if (image.size > 5 * 1024 * 1024) { // 5MB limit
// //           throw new Error("Image size must be less than 5MB");
// //         }
// //         imageData = await uploadToCloudinary(image, 'posts');
// //       }

// //       const postData: Omit<Post, 'id'> = {
// //         userId,
// //         content: content.trim(),
// //         imageUrl: imageData?.url,
// //         tags: hashtags,
// //         likes: [],
// //         createdAt: Date.now()
// //       };

// //       const docRef = await addDoc(collection(db, 'posts'), postData);
// //       onPostCreated({ ...postData, id: docRef.id } as Post);
      
// //       // Reset form
// //       setContent('');
// //       setImage(null);
// //       setHashtags([]);
// //       setShowSuggestions(false);
      
// //       toast({ title: "Success", description: "Post created successfully" });
// //     } catch (error) {
// //       toast({ 
// //         title: "Error", 
// //         description: error instanceof Error ? error.message : "Failed to create post", 
// //         variant: "destructive" 
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Card>
// //       <CardHeader>
// //         <h3 className="text-lg font-semibold">Create Post</h3>
// //       </CardHeader>
// //       <CardContent>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div className="relative">
// //             <Textarea
// //               ref={textareaRef}
// //               placeholder="What's on your mind? Use # for hashtags"
// //               value={content}
// //               onChange={handleContentChange}
// //               className="min-h-[120px] resize-none"
// //               required
// //             />
            
// //             {showSuggestions && (
// //               <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
// //                 <PopoverContent 
// //                   className="w-64 p-0" 
// //                   align="start"
// //                   side="bottom"
// //                 >
// //                   <Command>
// //                     <CommandList>
// //                       <CommandGroup>
// //                         {suggestedTags.map((tag) => (
// //                           <CommandItem
// //                             key={tag}
// //                             onSelect={() => insertHashtag(tag)}
// //                             className="cursor-pointer"
// //                           >
// //                             #{tag}
// //                           </CommandItem>
// //                         ))}
// //                       </CommandGroup>
// //                     </CommandList>
// //                   </Command>
// //                 </PopoverContent>
// //               </Popover>
// //             )}
// //           </div>

// //           {hashtags.length > 0 && (
// //             <div className="flex flex-wrap gap-2">
// //               {hashtags.map(tag => (
// //                 <span
// //                   key={tag}
// //                   className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
// //                 >
// //                   #{tag}
// //                 </span>
// //               ))}
// //             </div>
// //           )}

// //           <div className="flex items-center gap-4">
// //             <Button
// //               type="button"
// //               variant="outline"
// //               size="icon"
// //               onClick={() => fileInputRef.current?.click()}
// //             >
// //               <Camera className="h-4 w-4" />
// //             </Button>
// //             <input
// //               ref={fileInputRef}
// //               type="file"
// //               accept="image/*"
// //               onChange={(e) => {
// //                 const file = e.target.files?.[0];
// //                 if (file) {
// //                   if (file.size > 5 * 1024 * 1024) {
// //                     toast({
// //                       title: "Error",
// //                       description: "Image must be less than 5MB",
// //                       variant: "destructive"
// //                     });
// //                     return;
// //                   }
// //                   setImage(file);
// //                 }
// //               }}
// //               className="hidden"
// //             />
// //           </div>

// //           {imagePreview && (
// //             <div className="relative">
// //               <img
// //                 src={imagePreview}
// //                 alt="Preview"
// //                 className="rounded-lg max-h-96 w-full object-cover"
// //               />
// //               <Button
// //                 type="button"
// //                 variant="destructive"
// //                 size="icon"
// //                 className="absolute top-2 right-2"
// //                 onClick={() => {
// //                   setImage(null);
// //                   setImagePreview(null);
// //                 }}
// //               >
// //                 <X className="h-4 w-4" />
// //               </Button>
// //             </div>
// //           )}

// //           <Button 
// //             type="submit" 
// //             disabled={loading || !content.trim()} 
// //             className="w-full"
// //           >
// //             {loading ? (
// //               <>
// //                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //                 Creating Post...
// //               </>
// //             ) : (
// //               'Create Post'
// //             )}
// //           </Button>
// //         </form>
// //       </CardContent>
// //     </Card>
// //   );
// // }


// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import { Camera, X, Loader2, ImagePlus, Hash, Sparkles } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { uploadToCloudinary } from '../../utils/cloudinary';
// import { extractHashtags, popularHashtags } from './../../utils/hashtags';
// import { addDoc, collection } from 'firebase/firestore';
// import { useToast } from '@/hooks/use-toast';
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardFooter,
// } from '@/components/ui/card';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList
// } from '@/components/ui/command';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger
// } from '@/components/ui/popover';
// import { Separator } from '@/components/ui/separator';
// import { db } from '@/lib/firebase';

// interface AddPostProps {
//   onPostCreated: (post: any) => void;
//   userId: string;
// }

// export function AddPost({ onPostCreated, userId }: AddPostProps) {
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [hashtags, setHashtags] = useState<string[]>([]);
//   const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [cursorPosition, setCursorPosition] = useState<number>(0);
//   const [charCount, setCharCount] = useState(0);
//   const MAX_CHARS = 500;
  
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     if (image) {
//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result as string);
//       reader.readAsDataURL(image);
//     } else {
//       setImagePreview(null);
//     }
//   }, [image]);

//   useEffect(() => {
//     setCharCount(content.length);
//   }, [content]);

//   const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const newContent = e.target.value;
//     if (newContent.length <= MAX_CHARS) {
//       const cursorPos = e.target.selectionStart;
//       setCursorPosition(cursorPos);
//       setContent(newContent);
      
//       const extractedTags = extractHashtags(newContent);
//       setHashtags(extractedTags);

//       const lastWord = getWordAtCursor(newContent, cursorPos);
//       if (lastWord.startsWith('#')) {
//         const search = lastWord.slice(1).toLowerCase();
//         const filtered = popularHashtags
//           .filter(tag => tag.toLowerCase().startsWith(search))
//           .slice(0, 5);
//         setSuggestedTags(filtered);
//         setShowSuggestions(filtered.length > 0);
//       } else {
//         setShowSuggestions(false);
//       }
//     }
//   };

//   const getWordAtCursor = (text: string, cursorPos: number): string => {
//     const textBeforeCursor = text.slice(0, cursorPos);
//     const words = textBeforeCursor.split(/\s/);
//     return words[words.length - 1];
//   };

//   const insertHashtag = (tag: string) => {
//     if (!textareaRef.current) return;

//     const textBeforeCursor = content.slice(0, cursorPosition);
//     const textAfterCursor = content.slice(cursorPosition);
//     const words = textBeforeCursor.split(/\s/);
//     words.pop();
//     const newContent = [...words, `#${tag}`, textAfterCursor].join(' ').trim();
    
//     if (newContent.length <= MAX_CHARS) {
//       setContent(newContent);
//       setShowSuggestions(false);
//       textareaRef.current.focus();
//     }
//   };

//   const handleImageUpload = (file: File) => {
//     if (file.size > 5 * 1024 * 1024) {
//       toast({
//         title: "Error",
//         description: "Image must be less than 5MB",
//         variant: "destructive"
//       });
//       return;
//     }
//     setImage(file);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!content.trim()) {
//       toast({
//         title: "Error",
//         description: "Post content cannot be empty",
//         variant: "destructive"
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       let imageData;
//       if (image) {
//         imageData = await uploadToCloudinary(image, 'posts');
//       }

//       const postData = {
//         userId,
//         content: content.trim(),
//         imageUrl: imageData?.url,
//         tags: hashtags,
//         likes: [],
//         createdAt: Date.now()
//       };

//       const docRef = await addDoc(collection(db, 'posts'), postData);
//       onPostCreated({ ...postData, id: docRef.id });
      
//       setContent('');
//       setImage(null);
//       setHashtags([]);
//       setShowSuggestions(false);
      
//       toast({ 
//         title: "Success", 
//         description: "Your post has been shared!",
//         icon: <Sparkles className="h-4 w-4" />
//       });
//     } catch (error) {
//       toast({ 
//         title: "Error", 
//         description: error instanceof Error ? error.message : "Failed to create post", 
//         variant: "destructive" 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-lg">
//       <CardHeader className="space-y-1">
//         <div className="flex items-center justify-between">
//           <h3 className="text-2xl font-semibold">Create Post</h3>
//           <div className="text-sm text-muted-foreground">
//             {charCount}/{MAX_CHARS}
//           </div>
//         </div>
//       </CardHeader>
      
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <Textarea
//               ref={textareaRef}
//               placeholder="What's on your mind? Use # for hashtags..."
//               value={content}
//               onChange={handleContentChange}
//               className="min-h-[120px] resize-none text-lg leading-relaxed"
//               required
//             />
            
//             <AnimatePresence>
//               {showSuggestions && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                 >
//                   <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
//                     <PopoverContent 
//                       className="w-64 p-0" 
//                       align="start"
//                       side="bottom"
//                     >
//                       <Command>
//                         <CommandInput placeholder="Search hashtags..." />
//                         <CommandList>
//                           <CommandEmpty>No hashtags found</CommandEmpty>
//                           <CommandGroup heading="Suggested Tags">
//                             {suggestedTags.map((tag) => (
//                               <CommandItem
//                                 key={tag}
//                                 onSelect={() => insertHashtag(tag)}
//                                 className="cursor-pointer hover:bg-accent"
//                               >
//                                 <Hash className="mr-2 h-4 w-4" />
//                                 {tag}
//                               </CommandItem>
//                             ))}
//                           </CommandGroup>
//                         </CommandList>
//                       </Command>
//                     </PopoverContent>
//                   </Popover>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           <AnimatePresence>
//             {hashtags.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 className="flex flex-wrap gap-2"
//               >
//                 {hashtags.map(tag => (
//                   <span
//                     key={tag}
//                     className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full"
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <Separator />

//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="icon"
//                 onClick={() => fileInputRef.current?.click()}
//                 className="relative overflow-hidden"
//               >
//                 {image ? (
//                   <Camera className="h-4 w-4 text-green-500" />
//                 ) : (
//                   <ImagePlus className="h-4 w-4" />
//                 )}
//               </Button>
//               <span className="text-sm text-muted-foreground">
//                 {image ? 'Image added' : 'Add image'}
//               </span>
//             </div>

//             <Button 
//               type="submit" 
//               disabled={loading || !content.trim()} 
//               className="min-w-[120px]"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Posting...
//                 </>
//               ) : (
//                 'Post'
//               )}
//             </Button>
//           </div>

//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) handleImageUpload(file);
//             }}
//             className="hidden"
//           />
//         </form>
//       </CardContent>

//       <AnimatePresence>
//         {imagePreview && (
//           <CardFooter className="p-4">
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="relative w-full"
//             >
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="rounded-lg max-h-96 w-full object-cover"
//               />
//               <Button
//                 type="button"
//                 variant="destructive"
//                 size="icon"
//                 className="absolute top-2 right-2"
//                 onClick={() => {
//                   setImage(null);
//                   setImagePreview(null);
//                 }}
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </motion.div>
//           </CardFooter>
//         )}
//       </AnimatePresence>
//     </Card>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, Loader2, ImagePlus, Hash, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { extractHashtags, popularHashtags } from './../../utils/hashtags';
import { addDoc, collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/firebase';
import { Post } from '../../types/user';

interface AddPostProps {
  onPostCreated: (post: Post) => void;
  userId: string;
}

export function AddPost({ onPostCreated, userId }: AddPostProps) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 500;
  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  useEffect(() => {
    setCharCount(content.length);
  }, [content]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_CHARS) {
      const cursorPos = e.target.selectionStart;
      setCursorPosition(cursorPos);
      setContent(newContent);
      
      const extractedTags = extractHashtags(newContent);
      setHashtags(extractedTags);

      const lastWord = getWordAtCursor(newContent, cursorPos);
      if (lastWord.startsWith('#')) {
        const search = lastWord.slice(1).toLowerCase();
        const filtered = popularHashtags
          .filter(tag => tag.toLowerCase().startsWith(search))
          .slice(0, 5);
        setSuggestedTags(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const getWordAtCursor = (text: string, cursorPos: number): string => {
    const textBeforeCursor = text.slice(0, cursorPos);
    const words = textBeforeCursor.split(/\s/);
    return words[words.length - 1];
  };

  const insertHashtag = (tag: string) => {
    if (!textareaRef.current) return;

    const textBeforeCursor = content.slice(0, cursorPosition);
    const textAfterCursor = content.slice(cursorPosition);
    const words = textBeforeCursor.split(/\s/);
    words.pop();
    const newContent = [...words, `#${tag}`, textAfterCursor].join(' ').trim();
    
    if (newContent.length <= MAX_CHARS) {
      setContent(newContent);
      setShowSuggestions(false);
      textareaRef.current.focus();
    }
  };

  const handleImageUpload = (file: File) => {
    if (file.size > MAX_IMAGE_SIZE) {
      const fileSize = formatFileSize(file.size);
      toast({
        title: "Image too large",
        description: `Image size (${fileSize}) exceeds 2MB limit. Please choose a smaller image.`,
        variant: "destructive",
        icon: <AlertCircle className="h-4 w-4" />
      });
      return;
    }
    setImage(file);
    toast({
      title: "Image added",
      description: `Image size: ${formatFileSize(file.size)}`,
      icon: <Camera className="h-4 w-4" />
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Post content cannot be empty",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      let imageData;
      if (image) {
        imageData = await uploadToCloudinary(image, 'posts');
      }

      const postData = {
        userId,
        content: content.trim(),
        imageUrl: imageData?.url,
        tags: hashtags,
        likes: [],
        createdAt: Date.now()
      };

      const docRef = await addDoc(collection(db, 'posts'), postData);
      onPostCreated({ ...postData, id: docRef.id });
      
      setContent('');
      setImage(null);
      setHashtags([]);
      setShowSuggestions(false);
      
      toast({ 
        title: "Success", 
        description: "Your post has been shared!",
        icon: <Sparkles className="h-4 w-4" />
      });
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Failed to create post", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Create Post</h3>
          <div className="text-sm text-muted-foreground">
            {charCount}/{MAX_CHARS}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              placeholder="What's on your mind? Use # for hashtags..."
              value={content}
              onChange={handleContentChange}
              className="min-h-[120px] resize-none text-lg leading-relaxed"
              required
            />
            
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
                    <PopoverContent 
                      className="w-64 p-0" 
                      align="start"
                      side="bottom"
                    >
                      <Command>
                        <CommandInput placeholder="Search hashtags..." />
                        <CommandList>
                          <CommandEmpty>No hashtags found</CommandEmpty>
                          <CommandGroup heading="Suggested Tags">
                            {suggestedTags.map((tag) => (
                              <CommandItem
                                key={tag}
                                onSelect={() => insertHashtag(tag)}
                                className="cursor-pointer hover:bg-accent"
                              >
                                <Hash className="mr-2 h-4 w-4" />
                                {tag}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {hashtags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-wrap gap-2"
              >
                {hashtags.map(tag => (
                  <span
                    key={tag}
                    className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="relative overflow-hidden"
              >
                {image ? (
                  <Camera className="h-4 w-4 text-green-500" />
                ) : (
                  <ImagePlus className="h-4 w-4" />
                )}
              </Button>
              <span className="text-sm text-muted-foreground">
                {image ? `Image added (${formatFileSize(image.size)})` : 'Add image (max 2MB)'}
              </span>
            </div>

            <Button 
              type="submit" 
              disabled={loading || !content.trim()} 
              className="min-w-[120px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post'
              )}
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
            className="hidden"
          />
        </form>
      </CardContent>

      <AnimatePresence>
        {imagePreview && (
          <CardFooter className="p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full"
            >
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-lg max-h-96 w-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          </CardFooter>
        )}
      </AnimatePresence>
    </Card>
  );
}