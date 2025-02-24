// "use client";
// import { useState } from "react";
// import { addDoc, collection } from "firebase/firestore";
// import { auth,db } from "@/lib/firebase";
// // import { Card, Input, Textarea, Button, toast } from "@/components/ui";
// import { Card } from "./ui/card";
// import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
// import { Button } from "./ui/button";
// // import { Toast } from "./ui/toast";
// import { toast } from "@/hooks/use-toast";


// import { Note } from "../../types/user";


// interface AddNoteProps {
//   onNoteCreated: (note: Note) => void;
// }

// export function AddNote({ onNoteCreated }: AddNoteProps) {
//   const [formData, setFormData] = useState({
//     title: "",
//     driveLink: "",
//     description: ""
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!auth.currentUser) return;

//     setLoading(true);
//     try {
//       const noteData: Omit<Note, "id"> = {
//         userId: auth.currentUser.uid,
//         ...formData,
//         createdAt: Date.now()
//       };

//       const docRef = await addDoc(collection(db, "notes"), noteData);
//       onNoteCreated({ ...noteData, id: docRef.id });
      
//       setFormData({ title: "", driveLink: "", description: "" });
//       toast({ title: "Success", description: "Note created successfully" });
//     } catch (error) {
//       toast({ title: "Error", description: "Failed to create note", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="p-4 mb-6">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input
//           name="title"
//           placeholder="Note Title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           name="driveLink"
//           placeholder="Google Drive Link"
//           value={formData.driveLink}
//           onChange={handleChange}
//           required
//         />
//         <Textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />
//         <Button type="submit" disabled={loading}>
//           {loading ? "Creating..." : "Create Note"}
//         </Button>
//       </form>
//     </Card>
//   );
// }
