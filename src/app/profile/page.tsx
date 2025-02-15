
// // // components/ProfilePage.tsx
// // "use client";

import ProfilePage from "@/components/ProfilePage"

// // import { useEffect, useState } from "react";
// // import { auth, db, doc, getDoc, signOut, updateDoc, storage, ref, uploadBytes, getDownloadURL, deleteObject } from "@/lib/firebase";
// // import { useRouter } from "next/navigation";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
// // import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { toast } from "sonner";
// // import { LoadingSpinner } from "@/components/LoadingSpinner";
// // import type { UserProfile } from "../../../types/user";

// // export default function ProfilePage() {
// // const [user, setUser] = useState<UserProfile | null>(null);
// // const [editing, setEditing] = useState(false);
// // const [loading, setLoading] = useState(true);
// // const [saving, setSaving] = useState(false);
// // const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
// // const [newPhoto, setNewPhoto] = useState<File | null>(null);
// // const router = useRouter();

// // useEffect(() => {
// // const fetchUserData = async () => {
// // const currentUser = auth.currentUser;
// // if (!currentUser) {
// // router.push("/login");
// // return;
// // }

// // try {
// // const userRef = doc(db, "users", currentUser.uid);
// // const docSnap = await getDoc(userRef);

// // if (docSnap.exists()) {
// // const userData = docSnap.data() as UserProfile;
// // setUser(userData);
// // setEditForm(userData);
// // } else {
// // router.push("/form");
// // }
// // } catch (error) {
// // toast({
// // title: "Error",
// // description: "Failed to load profile data",
// // variant: "destructive",
// // });
// // } finally {
// // setLoading(false);
// // }
// // };

// // fetchUserData();
// // }, [router]);

// // const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // if (e.target.files?.[0]) {
// // const file = e.target.files[0];
// // if (file.size > 5 * 1024 * 1024) {
// // toast({
// // title: "Error",
// // description: "Image size should be less than 5MB",
// // variant: "destructive",
// // });
// // return;
// // }
// // setNewPhoto(file);
// // }
// // };

// // const handleEditChange = (
// // e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// // ) => {
// // const { name, value } = e.target;
// // if (name.startsWith("social.")) {
// // const social = name.split(".")[1];
// // setEditForm(prev => ({
// // ...prev,
// // socialLinks: {
// // ...prev.socialLinks,
// // [social]: value
// // }
// // }));
// // } else {
// // setEditForm(prev => ({ ...prev, [name]: value }));
// // }
// // };

// // const handleSave = async () => {
// // if (!user) return;
// // setSaving(true);

// // try {
// // let photoURL = user.photoURL;

// // if (newPhoto) {
// // // Delete old photo if it exists
// // if (user.photoURL) {
// // const oldPhotoRef = ref(storage, `profile-photos/${user.uid}`);
// // await deleteObject(oldPhotoRef);
// // }

// // // Upload new photo
// // const photoRef = ref(storage, `profile-photos/${user.uid}`);
// // await uploadBytes(photoRef, newPhoto);
// // photoURL = await getDownloadURL(photoRef);
// // }

// // const updatedData = {
// // ...editForm,
// // photoURL,
// // updatedAt: Date.now()
// // };

// // const userRef = doc(db, "users", user.uid);
// // await updateDoc(userRef, updatedData);

// // setUser(updatedData as UserProfile);
// // setEditing(false);
// // toast({
// // title: "Success",
// // description: "Profile updated successfully",
// // });
// // } catch (error) {
// // console.error("Update error:", error);
// // toast({
// // title: "Error",
// // description: "Failed to update profile",
// // variant: "destructive",
// // });
// // } finally {
// // setSaving(false);
// // }
// // };

// // const handleLogout = async () => {
// // try {
// // await signOut(auth);
// // router.push("/auth/login");
// // } catch (error) {
// // toast({
// // title: "Error",
// // description: "Failed to log out",
// // variant: "destructive",
// // });
// // }
// // };

// // const handleShare = async () => {
// // if (user) {
// // const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${user.uid}`;
// // await navigator.clipboard.writeText(profileUrl);
// // toast({
// // title: "Success",
// // description: "Profile link copied to clipboard!",
// // });
// // }
// // };

// // if (loading) {
// // return (
// // <div className="flex justify-center items-center min-h-screen">
// // <LoadingSpinner />
// // </div>
// // );
// // }

// // if (!user) return null;

// // return (
// // <Card className="max-w-2xl mx-auto mt-8">
// // <CardHeader className="text-center">
// // <div className="flex justify-center mb-4">
// // <div className="relative">
// // <Avatar className="w-24 h-24">
// // <AvatarImage src={user.photoURL} />
// // <AvatarFallback>{user.name[0]}</AvatarFallback>
// // </Avatar>
// // {editing && (
// // <Input
// //   type="file"
// //   accept="image/*"
// //   onChange={handlePhotoChange}
// //   className="absolute bottom-0 left-0 w-full opacity-0 cursor-pointer"
// // />
// // )}
// // </div>
// // </div>
// // {editing ? (
// // <Input
// // name="name"
// // value={editForm.name}
// // onChange={handleEditChange}
// // className="text-2xl font-bold text-center"
// // />
// // ) : (
// // <h2 className="text-2xl font-bold">{user.name}</h2>
// // )}
// // <p className="text-gray-600">{user.email}</p>
// // </CardHeader>

// // <CardContent className="space-y-6">
// // {editing ? (
// // <div className="space-y-4">
// // <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // <Input
// //   name="college"
// //   placeholder="College"
// //   value={editForm.college}
// //   onChange={handleEditChange}
// // />
// // <Input
// //   name="course"
// //   placeholder="Course"
// //   value={editForm.course}
// //   onChange={handleEditChange}
// // />
// // <Input
// //   name="semester"
// //   placeholder="Semester"
// //   value={editForm.semester}
// //   onChange={handleEditChange}
// // />
// // <Input
// //   name="enrollment"
// //   placeholder="Enrollment"
// //   value={editForm.enrollment}
// //   onChange={handleEditChange}
// // />
// // </div>

// // <Textarea
// // name="bio"
// // placeholder="About you..."
// // value={editForm.bio}
// // onChange={handleEditChange}
// // className="h-24"
// // />

// // <div className="space-y-2">
// // <h3 className="font-medium">Social Links</h3>
// // <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //   <Input
// //     name="social.linkedin"
// //     placeholder="LinkedIn URL"
// //     value={editForm.socialLinks?.linkedin}
// //     onChange={handleEditChange}
// //   />
// //   <Input
// //     name="social.github"
// //     placeholder="GitHub URL"
// //     value={editForm.socialLinks?.github}
// //     onChange={handleEditChange}
// //   />
// //   <Input
// //     name="social.twitter"
// //     placeholder="Twitter URL"
// //     value={editForm.socialLinks?.twitter}
// //     onChange={handleEditChange}
// //   />
// // </div>
// // </div>
// // </div>
// // ) : (
// // <>
// // <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // <div>
// //   <h3 className="font-medium">College</h3>
// //   <p>{user.college}</p>
// // </div>
// // <div>
// //   <h3 className="font-medium">Course</h3>
// //   <p>{user.course}</p>
// // </div>
// // <div>
// //   <h3 className="font-medium">Semester</h3>
// //   <p>{user.semester}</p>
// // </div>
// // <div>
// //   <h3 className="font-medium">Enrollment No.</h3>
// //   <p>{user.enrollment}</p>
// // </div>
// // </div>

// // {user.bio && (
// // <div>
// //   <h3 className="font-medium">About</h3>
// //   <p className="whitespace-pre-wrap">{user.bio}</p>
// // </div>
// // )}

// // {user.socialLinks && Object.keys(user.socialLinks).length > 0 && (
// // <div>
// //   <h3 className="font-medium">Social Links</h3>
// //   <div className="flex space-x-4 mt-2">
// //     {Object.entries(user.socialLinks).map(([platform, url]) => (
// //       url && (
// //         <a
// //           key={platform}
// //           href={url}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="text-blue-600 hover:text-blue-800"
// //         >
// //           {platform.charAt(0).toUpperCase() + platform.slice(1)}
// //         </a>
// //       )
// //     ))}
// //   </div>
// // </div>
// // )}
// // </>
// // )}
// // </CardContent>

// // <CardFooter className="flex justify-between">
// // <div className="space-x-2">
// // {editing ? (
// // <>
// // <Button onClick={handleSave} disabled={saving}>
// //   {saving ? (
// //     <div className="flex items-center gap-2">
// //       <LoadingSpinner />
// //       Saving...
// //     </div>
// //   ) : (
// //     "Save Changes"
// //   )}
// // </Button>
// // <Button onClick={() => setEditing(false)} variant="outline">
// //   Cancel
// // </Button>
// // </>
// // ) : (
// // <>
// // <Button onClick={() => setEditing(true)}>Edit Profile</Button>
// // <Button onClick={handleShare} variant="outline">
// //   Share Profile
// // </Button>
// // </>
// // )}
// // </div>
// // <Button onClick={handleLogout} variant="destructive">
// // Logout
// // </Button>
// // </CardFooter>
// // </Card>
// // );
// // }



// // components/ProfilePage.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { auth, db, doc, getDoc, signOut, updateDoc, storage, ref, 
//          uploadBytes, getDownloadURL, deleteObject, arrayUnion, arrayRemove } from "@/lib/firebase";
// import { useRouter } from "next/navigation";
// import { Tab } from "@headlessui/react";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { LoadingSpinner } from "@/components/LoadingSpinner";
// import { AddPost } from "./AddPost";
// import { AddProject } from "./AddProject";
// import { AddNote } from "./AddNote";
// import { PostsList } from "./PostsList";
// import { ProjectsList } from "./ProjectsList";
// import { NotesList } from "./NotesList";
// import { MessageButton } from "./MessageButton";
// import { toast } from "sonner";
// import type { UserProfile, Post, Project, Note } from "@/types/user";

// export default function ProfilePage({ userId }: { userId?: string }) {
//   // State Management
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [isOwnProfile, setIsOwnProfile] = useState(false);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
//   const [newPhoto, setNewPhoto] = useState<File | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       const currentUser = auth.currentUser;
//       if (!currentUser && !userId) {
//         router.push("/login");
//         return;
//       }

//       const profileId = userId || currentUser?.uid;
//       setIsOwnProfile(!userId || userId === currentUser?.uid);

//       try {
//         // Fetch user profile
//         const userRef = doc(db, "users", profileId!);
//         const userSnap = await getDoc(userRef);
        
//         if (userSnap.exists()) {
//           const userData = userSnap.data() as UserProfile;
//           setUser(userData);
//           setEditForm(userData);
          
//           // Check if current user is following this profile
//           if (currentUser && userId) {
//             const currentUserRef = doc(db, "users", currentUser.uid);
//             const currentUserSnap = await getDoc(currentUserRef);
//             if (currentUserSnap.exists()) {
//               const following = currentUserSnap.data().following || [];
//               setIsFollowing(following.includes(userId));
//             }
//           }

//           // Fetch user content
//           await Promise.all([
//             fetchPosts(profileId!),
//             fetchProjects(profileId!),
//             fetchNotes(profileId!)
//           ]);
//         } else if (!userId) {
//           router.push("/form");
//         }
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to load profile data",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId, router]);

//   // Content Fetching Functions
//   const fetchPosts = async (uid: string) => {
//     try {
//       const postsRef = collection(db, `users/${uid}/posts`);
//       const postsSnap = await getDocs(postsRef);
//       const postsData = postsSnap.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Post[];
//       setPosts(postsData);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   const fetchProjects = async (uid: string) => {
//     try {
//       const projectsRef = collection(db, `users/${uid}/projects`);
//       const projectsSnap = await getDocs(projectsRef);
//       const projectsData = projectsSnap.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Project[];
//       setProjects(projectsData);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   const fetchNotes = async (uid: string) => {
//     try {
//       const notesRef = collection(db, `users/${uid}/notes`);
//       const notesSnap = await getDocs(notesRef);
//       const notesData = notesSnap.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Note[];
//       setNotes(notesData);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };

//   // Profile Actions
//   const handleFollow = async () => {
//     if (!auth.currentUser || !user) return;
    
//     try {
//       const currentUserRef = doc(db, "users", auth.currentUser.uid);
//       const targetUserRef = doc(db, "users", user.uid);
      
//       if (isFollowing) {
//         await updateDoc(currentUserRef, {
//           following: arrayRemove(user.uid)
//         });
//         await updateDoc(targetUserRef, {
//           followers: arrayRemove(auth.currentUser.uid)
//         });
//       } else {
//         await updateDoc(currentUserRef, {
//           following: arrayUnion(user.uid)
//         });
//         await updateDoc(targetUserRef, {
//           followers: arrayUnion(auth.currentUser.uid)
//         });
//       }
      
//       setIsFollowing(!isFollowing);
//       toast({
//         title: "Success",
//         description: isFollowing ? "Unfollowed user" : "Following user",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update follow status",
//         variant: "destructive",
//       });
//     }
//   };

//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const file = e.target.files[0];
//       if (file.size > 5 * 1024 * 1024) {
//         toast({
//           title: "Error",
//           description: "Image size should be less than 5MB",
//           variant: "destructive",
//         });
//         return;
//       }
//       setNewPhoto(file);
//     }
//   };

//   const handleEditChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     if (name.startsWith("social.")) {
//       const social = name.split(".")[1];
//       setEditForm(prev => ({
//         ...prev,
//         socialLinks: {
//           ...prev.socialLinks,
//           [social]: value
//         }
//       }));
//     } else {
//       setEditForm(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSave = async () => {
//     if (!user) return;
//     setSaving(true);

//     try {
//       let photoURL = user.photoURL;

//       if (newPhoto) {
//         if (user.photoURL) {
//           const oldPhotoRef = ref(storage, `profile-photos/${user.uid}`);
//           await deleteObject(oldPhotoRef);
//         }

//         const photoRef = ref(storage, `profile-photos/${user.uid}`);
//         await uploadBytes(photoRef, newPhoto);
//         photoURL = await getDownloadURL(photoRef);
//       }

//       const updatedData = {
//         ...editForm,
//         photoURL,
//         updatedAt: Date.now()
//       };

//       const userRef = doc(db, "users", user.uid);
//       await updateDoc(userRef, updatedData);

//       setUser(updatedData as UserProfile);
//       setEditing(false);
//       toast({
//         title: "Success",
//         description: "Profile updated successfully",
//       });
//     } catch (error) {
//       console.error("Update error:", error);
//       toast({
//         title: "Error",
//         description: "Failed to update profile",
//         variant: "destructive",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleShare = async () => {
//     if (user) {
//       const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${user.uid}`;
//       await navigator.clipboard.writeText(profileUrl);
//       toast({
//         title: "Success",
//         description: "Profile link copied to clipboard!",
//       });
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       router.push("/auth/login");
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to log out",
//         variant: "destructive",
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (!user) return null;

//   return (
//     <div className="max-w-6xl mx-auto mt-8 px-4">
//       <Card>
//         <CardHeader className="text-center">
//           <div className="flex justify-center mb-4">
//             <div className="relative">
//               <Avatar className="w-24 h-24">
//                 <AvatarImage src={user.photoURL} />
//                 <AvatarFallback>{user.name[0]}</AvatarFallback>
//               </Avatar>
//               {editing && (
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePhotoChange}
//                   className="absolute bottom-0 left-0 w-full opacity-0 cursor-pointer"
//                 />
//               )}
//             </div>
//           </div>

//           {editing ? (
//             <Input
//               name="name"
//               value={editForm.name}
//               onChange={handleEditChange}
//               className="text-2xl font-bold text-center"
//             />
//           ) : (
//             <h2 className="text-2xl font-bold">{user.name}</h2>
//           )}
//           <p className="text-gray-600">{user.email}</p>

//           {!isOwnProfile && (
//             <div className="flex justify-center gap-4 mt-4">
//               <Button
//                 onClick={handleFollow}
//                 variant={isFollowing ? "outline" : "default"}
//               >
//                 {isFollowing ? "Unfollow" : "Follow"}
//               </Button>
//               <MessageButton userId={user.uid} userName={user.name} />
//             </div>
//           )}
//         </CardHeader>

//         <CardContent className="space-y-6">
//           {editing ? (
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Input
//                   name="college"
//                   placeholder="College"
//                   value={editForm.college}
//                   onChange={handleEditChange}
//                 />
//                 <Input
//                   name="course"
//                   placeholder="Course"
//                   value={editForm.course}
//                   onChange={handleEditChange}
//                 />
//                 <Input
//                   name="semester"
//                   placeholder="Semester"
//                   value={editForm.semester}
//                   onChange={handleEditChange}
//                 />
//                 <Input
//                   name="enrollment"
//                   placeholder="Enrollment"
//                   value={editForm.enrollment}
//                   onChange={handleEditChange}
//                 />
//               </div>

//               <Textarea
//                 name="bio"
//                 placeholder="About you..."
//                 value={editForm.bio}
//                 onChange={handleEditChange}
//                 className="h-24"
//               />

//               <div className="space-y-2">
//                 <h3 className="font-medium">Social Links</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <Input
//                     name="social.linkedin"
//                     placeholder="LinkedIn URL"
//                     value={editForm.socialLinks?.linkedin}
//                     onChange={handleEditChange}
//                   />
//                   <Input
//                     name="social.github"
//                     placeholder="GitHub URL"
//                     value={editForm.socialLinks?.github}
//                     onChange={handleEditChange}
//                   />
//                   <Input
//                     name="social.twitter"
//                     placeholder="Twitter URL"
//                     value={editForm.socialLinks?.twitter}
//                     onChange={handleEditChange}
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <h3 className="font-medium">College</h3>
//                   <p>{user.college}</p>
//                 </div>
//                 <div>
//                   <h3 className="font-medium">Course</h3>
//                   <p>{user.course}</p>
//                 </div>
//                 <div>
//                   <h3 className="font-medium">Semester</h3>
//                   <p>{user.semester}</p>
//                 </div>
//                 <div>
//                   <h3 className="font-medium">Enrollment No.</h3>
//                   <p>{user.enrollment}</p>
//                 </div>
//               </div>

//               {user.bio && (
//                 <div>
//                   <h3 className="font-medium">About</h3>
//                   <p className="whitespace-pre-wrap">{user.bio}</p>
//                 </div>
//               )}

//               {user.socialLinks && Object.keys(user.socialLinks).length > 0 && (
//                 <div>
//                   <h3 className="font-medium">Social Links</h3>
//                   <div className="flex space-x-4 mt-2">
//                     {Object.entries(user.socialLinks).map(([platform, url]) => (
//                       url && (
//                         <a
//                           key={platform}
//                           href={url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:text-blue-800"
//                         >
//                           {platform.charAt(0).toUpperCase() + platform.slice(1)}
//                         </a>
//                       )
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {isOwnProfile && (
//             <div className="flex justify-between mt-4">
//               <div className="space-x-2">
//                 {editing ? (
//                   <>
//                     <Button onClick={handleSave} disabled={saving}>
//                       {saving ? (
//                         <div className="flex items-center gap-2">
//                           <LoadingSpinner />
//                           Saving...
//                         </div>
//                       ) : (
//                         "Save Changes"
//                       )}
//                     </Button>
//                     <Button onClick={() => setEditing(false)} variant="outline">Cancel
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button onClick={() => setEditing(true)}>Edit Profile</Button>
//                     <Button onClick={handleShare} variant="outline">
//                       Share Profile
//                     </Button>
//                   </>
//                 )}
//               </div>
//               <Button onClick={handleLogout} variant="destructive">
//                 Logout
//               </Button>
//             </div>
//           )}
//         </CardContent>

//         <Tab.Group>
//           <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mx-6">
//             <Tab className={({ selected }) =>
//               `w-full rounded-lg py-2.5 text-sm font-medium leading-5
//               ${selected
//                 ? 'bg-white text-blue-700 shadow'
//                 : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
//               }`
//             }>
//               Posts
//             </Tab>
//             <Tab className={({ selected }) =>
//               `w-full rounded-lg py-2.5 text-sm font-medium leading-5
//               ${selected
//                 ? 'bg-white text-blue-700 shadow'
//                 : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
//               }`
//             }>
//               Projects
//             </Tab>
//             <Tab className={({ selected }) =>
//               `w-full rounded-lg py-2.5 text-sm font-medium leading-5
//               ${selected
//                 ? 'bg-white text-blue-700 shadow'
//                 : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
//               }`
//             }>
//               Notes
//             </Tab>
//           </Tab.List>

//           <Tab.Panels className="mt-6 px-6 pb-6">
//             <Tab.Panel>
//               <div className="space-y-6">
//                 {isOwnProfile && (
//                   <AddPost 
//                     onPostCreated={(post) => setPosts([post, ...posts])} 
//                     userId={user.uid}
//                   />
//                 )}
//                 <PostsList 
//                   posts={posts} 
//                   isOwnProfile={isOwnProfile}
//                   onPostDelete={(postId) => {
//                     setPosts(posts.filter(post => post.id !== postId));
//                   }}
//                 />
//               </div>
//             </Tab.Panel>

//             <Tab.Panel>
//               <div className="space-y-6">
//                 {isOwnProfile && (
//                   <AddProject 
//                     onProjectCreated={(project) => setProjects([project, ...projects])}
//                     userId={user.uid}
//                   />
//                 )}
//                 <ProjectsList 
//                   projects={projects}
//                   isOwnProfile={isOwnProfile}
//                   onProjectDelete={(projectId) => {
//                     setProjects(projects.filter(project => project.id !== projectId));
//                   }}
//                 />
//               </div>
//             </Tab.Panel>

//             <Tab.Panel>
//               <div className="space-y-6">
//                 {isOwnProfile && (
//                   <AddNote 
//                     onNoteCreated={(note) => setNotes([note, ...notes])}
//                     userId={user.uid}
//                   />
//                 )}
//                 <NotesList 
//                   notes={notes}
//                   isOwnProfile={isOwnProfile}
//                   onNoteDelete={(noteId) => {
//                     setNotes(notes.filter(note => note.id !== noteId));
//                   }}
//                 />
//               </div>
//             </Tab.Panel>
//           </Tab.Panels>
//         </Tab.Group>
//       </Card>
//     </div>
//   );
// }

// // // Types for reference (should be in a separate types file)
// // interface UserProfile {
// //   uid: string;
// //   name: string;
// //   email: string;
// //   photoURL?: string;
// //   bio?: string;
// //   college?: string;
// //   course?: string;
// //   semester?: string;
// //   enrollment?: string;
// //   socialLinks?: {
// //     linkedin?: string;
// //     github?: string;
// //     twitter?: string;
// //   };
// //   following?: string[];
// //   followers?: string[];
// //   createdAt: number;
// //   updatedAt: number;
// // }

// // interface Post {
// //   id: string;
// //   userId: string;
// //   content: string;
// //   imageUrl?: string;
// //   likes: number;
// //   comments: Comment[];
// //   createdAt: number;
// //   updatedAt: number;
// // }

// // interface Project {
// //   id: string;
// //   userId: string;
// //   title: string;
// //   description: string;
// //   projectUrl?: string;
// //   imageUrl?: string;
// //   tags: string[];
// //   createdAt: number;
// //   updatedAt: number;
// // }

// // interface Note {
// //   id: string;
// //   userId: string;
// //   title: string;
// //   content: string;
// //   isPublic: boolean;
// //   tags: string[];
// //   createdAt: number;
// //   updatedAt: number;
// // }

// // interface Comment {
// //   id: string;
// //   userId: string;
// //   content: string;
// //   createdAt: number;
// // }


// import React from 'react'

const page = () => {
  return (
    <div>
      <ProfilePage />
    </div>
  )
}

export default page
