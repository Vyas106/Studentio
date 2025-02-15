import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth,db } from "@/lib/firebase";
// import { Card, Input, Textarea, Button, toast } from "@/components/ui";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
// import { Toast } from "./ui/toast";
import { toast } from "@/hooks/use-toast";


import { Note } from "../../types/user";


interface AddNoteProps {
  onNoteCreated: (note: Note) => void;
}

export function AddNote({ onNoteCreated }: AddNoteProps) {
  const [formData, setFormData] = useState({
    title: "",
    driveLink: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setLoading(true);
    try {
      const noteData: Omit<Note, "id"> = {
        userId: auth.currentUser.uid,
        ...formData,
        createdAt: Date.now()
      };

      const docRef = await addDoc(collection(db, "notes"), noteData);
      onNoteCreated({ ...noteData, id: docRef.id });
      
      setFormData({ title: "", driveLink: "", description: "" });
      toast({ title: "Success", description: "Note created successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to create note", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Note Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          name="driveLink"
          placeholder="Google Drive Link"
          value={formData.driveLink}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Note"}
        </Button>
      </form>
    </Card>
  );
}

//   // Fetch functions for Profile Page
//   const fetchPosts = async (uid: string) => {
//     try {
//       const postsRef = collection(db, "posts");
//       const q = query(
//         postsRef,
//         where("userId", "==", uid),
//         orderBy("createdAt", "desc")
//       );
      
//       const querySnapshot = await getDocs(q);
//       const posts: Post[] = [];
      
//       querySnapshot.forEach((doc) => {
//         posts.push({ ...doc.data(), id: doc.id } as Post);
//       });
      
//       setPosts(posts);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       toast({
//         title: "Error",
//         description: "Failed to load posts",
//         variant: "destructive",
//       });
//     }
//   };
  
//   const fetchProjects = async (uid: string) => {
//     try {
//       const projectsRef = collection(db, "projects");
//       const q = query(
//         projectsRef,
//         where("userId", "==", uid),
//         orderBy("createdAt", "desc")
//       );
      
//       const querySnapshot = await getDocs(q);
//       const projects: Project[] = [];
      
//       querySnapshot.forEach((doc) => {
//         projects.push({ ...doc.data(), id: doc.id } as Project);
//       });
      
//       setProjects(projects);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//       toast({
//         title: "Error",
//         description: "Failed to load projects",
//         variant: "destructive",
//       });
//     }
//   };
  
//   const fetchNotes = async (uid: string) => {
//     try {
//       const notesRef = collection(db, "notes");
//       const q = query(
//         notesRef,
//         where("userId", "==", uid),
//         orderBy("createdAt", "desc")
//       );
      
//       const querySnapshot = await getDocs(q);
//       const notes: Note[] = [];
      
//       querySnapshot.forEach((doc) => {
//         notes.push({ ...doc.data(), id: doc.id } as Note);
//       });
      
//       setNotes(notes);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//       toast({
//         title: "Error",
//         description: "Failed to load notes",
//         variant: "destructive",
//       });
//     }
//   };
  
//   // Content List Components
//   export function PostsList({ posts }: { posts: Post[] }) {
//     return (
//       <div className="space-y-4">
//         {posts.map((post) => (
//           <Card key={post.id} className="p-4">
//             <div className="space-y-2">
//               <p className="whitespace-pre-wrap">{post.content}</p>
//               {post.imageUrl && (
//                 <img
//                   src={post.imageUrl}
//                   alt="Post"
//                   className="rounded-lg max-h-96 object-cover"
//                 />
//               )}
//               {post.tags.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {post.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//               <div className="text-sm text-gray-500">
//                 {new Date(post.createdAt).toLocaleDateString()}
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     );
//   }
  
//   export function ProjectsList({ projects }: { projects: Project[] }) {
//     return (
//       <div className="space-y-4">
//         {projects.map((project) => (
//           <Card key={project.id} className="p-4">
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-medium">{project.title}</h3>
//                 <span className="text-sm text-gray-500">
//                   {new Date(project.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
              
//               {project.imageUrl && (
//                 <img
//                   src={project.imageUrl}
//                   alt={project.title}
//                   className="rounded-lg max-h-60 object-cover"
//                 />
//               )}
              
//               <p className="text-gray-600">{project.description}</p>
              
//               {project.links.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {project.links.map((link, index) => (
//                     <a
//                       key={index}
//                       href={link.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       {link.title}
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </Card>
//         ))}
//       </div>
//     );
//   }
  
//   export function NotesList({ notes }: { notes: Note[] }) {
//     return (
//       <div className="space-y-4">
//         {notes.map((note) => (
//           <Card key={note.id} className="p-4">
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-medium">{note.title}</h3>
//                 <span className="text-sm text-gray-500">
//                   {new Date(note.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
              
//               <p className="text-gray-600">{note.description}</p>
              
//               <a
//                 href={note.driveLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:text-blue-800"
//               >
//                 View Note
//               </a>
//             </div>
//           </Card>
//         ))}
//       </div>
//     );
//   }