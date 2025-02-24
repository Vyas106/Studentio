// // "use client";
// // // pages/explore.tsx
// // import { useState, useEffect } from 'react';
// // import { Tab } from '@headlessui/react';
// // import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// // import { Input } from '@/components/ui/input';
// // import { Button } from '@/components/ui/button';
// // import { LoadingSpinner } from '@/components/LoadingSpinner';
// // import { collection, query, where, orderBy, limit, getDocs } from '@/lib/firebase';
// // import type { Post, Project, Note } from '../../../types/user';
// // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// // export default function Page() {
// //   const [posts, setPosts] = useState<Post[]>([]);
// //   const [projects, setProjects] = useState<Project[]>([]);
// //   const [notes, setNotes] = useState<Note[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [selectedTags, setSelectedTags] = useState<string[]>([]);

// //   useEffect(() => {
// //     fetchContent();
// //   }, []);

// //   const fetchContent = async () => {
// //     setLoading(true);
// //     try {
// //       // Fetch public posts
// //       const postsQuery = query(
// //         collection(db, 'posts'),
// //         orderBy('createdAt', 'desc'),
// //         limit(20)
// //       );
// //       const postsSnap = await getDocs(postsQuery);
// //       const postsData = postsSnap.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data()
// //       })) as Post[];
// //       setPosts(postsData);

// //       // Fetch public projects
// //       const projectsQuery = query(
// //         collection(db, 'projects'),
// //         orderBy('createdAt', 'desc'),
// //         limit(20)
// //       );
// //       const projectsSnap = await getDocs(projectsQuery);
// //       const projectsData = projectsSnap.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data()
// //       })) as Project[];
// //       setProjects(projectsData);

// //       // Fetch public notes
// //       const notesQuery = query(
// //         collection(db, 'notes'),
// //         where('isPublic', '==', true),
// //         orderBy('createdAt', 'desc'),
// //         limit(20)
// //       );
// //       const notesSnap = await getDocs(notesQuery);
// //       const notesData = notesSnap.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data()
// //       })) as Note[];
// //       setNotes(notesData);
// //     } catch (error) {
// //       console.error('Error fetching content:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filterContent = (content: any[]) => {
// //     return content.filter(item => {
// //       const matchesSearch = searchQuery === '' || 
// //         item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.description?.toLowerCase().includes(searchQuery.toLowerCase());

// //         const matchesTags = selectedTags.length === 0 ||
// //           (item.tags && selectedTags.some(tag => item.tags.includes(tag)));
  
// //         return matchesSearch && matchesTags;
// //       });
// //     };
  
// //     const getAllTags = () => {
// //       const tagsSet = new Set<string>();
// //       [...projects, ...notes].forEach(item => {
// //         item.tags?.forEach(tag => tagsSet.add(tag));
// //       });
// //       return Array.from(tagsSet);
// //     };
  
// //     return (
// //       <div className="max-w-6xl mx-auto p-4 space-y-6">
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Explore</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-4">
// //               <Input
// //                 placeholder="Search content..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //               />
// //               <div className="flex flex-wrap gap-2">
// //                 {getAllTags().map(tag => (
// //                   <Button
// //                     key={tag}
// //                     variant={selectedTags.includes(tag) ? "default" : "outline"}
// //                     size="sm"
// //                     onClick={() => {
// //                       setSelectedTags(prev =>
// //                         prev.includes(tag)
// //                           ? prev.filter(t => t !== tag)
// //                           : [...prev, tag]
// //                       );
// //                     }}
// //                   >
// //                     #{tag}
// //                   </Button>
// //                 ))}
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
  
// //         {loading ? (
// //           <div className="flex justify-center p-12">
// //             <LoadingSpinner />
// //           </div>
// //         ) : (
// //           <Tab.Group>
// //             <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
// //               <Tab className={({ selected }) =>
// //                 `w-full rounded-lg py-2.5 text-sm font-medium leading-5
// //                 ${selected
// //                   ? 'bg-white text-blue-700 shadow'
// //                   : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
// //                 }`
// //               }>
// //                 Posts
// //               </Tab>
// //               <Tab className={({ selected }) =>
// //                 `w-full rounded-lg py-2.5 text-sm font-medium leading-5
// //                 ${selected
// //                   ? 'bg-white text-blue-700 shadow'
// //                   : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
// //                 }`
// //               }>
// //                 Projects
// //               </Tab>
// //               <Tab className={({ selected }) =>
// //                 `w-full rounded-lg py-2.5 text-sm font-medium leading-5
// //                 ${selected
// //                   ? 'bg-white text-blue-700 shadow'
// //                   : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
// //                 }`
// //               }>
// //                 Notes
// //               </Tab>
// //             </Tab.List>
  
// //             <Tab.Panels className="mt-4">
// //               <Tab.Panel>
// //                 <div className="space-y-4">
// //                   {filterContent(posts).map((post) => (
// //                     <PostCard
// //                       key={post.id}
// //                       post={post}
// //                       onLike={handleLikePost}
// //                       onComment={handleAddComment}
// //                     />
// //                   ))}
// //                 </div>
// //               </Tab.Panel>
  
// //               <Tab.Panel>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                   {filterContent(projects).map((project) => (
// //                     <ProjectCard
// //                       key={project.id}
// //                       project={project}
// //                     />
// //                   ))}
// //                 </div>
// //               </Tab.Panel>
  
// //               <Tab.Panel>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   {filterContent(notes).map((note) => (
// //                     <NoteCard
// //                       key={note.id}
// //                       note={note}
// //                     />
// //                   ))}
// //                 </div>
// //               </Tab.Panel>
// //             </Tab.Panels>
// //           </Tab.Group>
// //         )}
// //       </div>
// //     );
// //   }
  
// //   // Card components for each content type
// //   interface PostCardProps {
// //     post: Post;
// //     onLike: (postId: string) => Promise<void>;
// //     onComment: (postId: string, comment: string) => Promise<void>;
// //   }
  
// //   function PostCard({ post, onLike, onComment }: PostCardProps) {
// //     const [comment, setComment] = useState('');
  
// //     return (
// //       <Card>
// //         <CardContent className="p-4 space-y-4">
// //           <div className="flex items-center gap-2">
// //             <Avatar>
// //               <AvatarImage src={post.userPhotoURL} />
// //               <AvatarFallback>{post.userName?.[0]}</AvatarFallback>
// //             </Avatar>
// //             <div>
// //               <p className="font-medium">{post.userName}</p>
// //               <p className="text-sm text-gray-500">
// //                 {new Date(post.createdAt).toLocaleDateString()}
// //               </p>
// //             </div>
// //           </div>
  
// //           <p className="whitespace-pre-wrap">{post.content}</p>
// //           {post.imageUrl && (
// //             <img
// //               src={post.imageUrl}
// //               alt="Post attachment"
// //               className="rounded-lg max-h-96 w-full object-cover"
// //             />
// //           )}
  
// //           <div className="flex items-center gap-4">
// //             <Button
// //               variant="ghost"
// //               size="sm"
// //               onClick={() => onLike(post.id)}
// //             >
// //               👍 {post.likes}
// //             </Button>
// //             <Button
// //               variant="ghost"
// //               size="sm"
// //             >
// //               💬 {post.comments?.length || 0}
// //             </Button>
// //           </div>
  
// //           <div className="space-y-2">
// //             {post.comments?.map(({comment}:any) => (
// //               <div key={comment.id} className="bg-gray-50 p-2 rounded">
// //                 <p className="text-sm font-medium">{comment.userName}</p>
// //                 <p className="text-sm">{comment.content}</p>
// //               </div>
// //             ))}
// //           </div>
  
// //           <div className="flex gap-2">
// //             <Input
// //               placeholder="Add a comment..."
// //               value={comment}
// //               onChange={(e) => setComment(e.target.value)}
// //             />
// //             <Button
// //               onClick={() => {
// //                 onComment(post.id, comment);
// //                 setComment('');
// //               }}
// //               disabled={!comment.trim()}
// //             >
// //               Post
// //             </Button>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     );
// //   }
  
// //   function ProjectCard({ project }: { project: Project }) {
// //     return (
// //       <Card>
// //         <CardContent className="p-4 space-y-4">
// //           {project.imageUrl && (
// //             <img
// //               src={project.imageUrl}
// //               alt={project.title}
// //               className="rounded-lg h-48 w-full object-cover"
// //             />
// //           )}
// //           <h3 className="text-xl font-semibold">{project.title}</h3>
// //           <p className="text-gray-600">{project.description}</p>
// //           <div className="flex flex-wrap gap-2">
// //             {project.tags?.map((tag) => (
// //               <span
// //                 key={tag}
// //                 className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
// //               >
// //                 #{tag}
// //               </span>
// //             ))}
// //           </div>
// //           {project.projectUrl && (
// //             <Button
// //               variant="outline"
// //               onClick={() => window.open(project.projectUrl, '_blank')}
// //             >
// //               View Project
// //             </Button>
// //           )}
// //         </CardContent>
// //       </Card>
// //     );
// //   }
  
// //   function NoteCard({ note }: { note: Note }) {
// //     return (
// //       <Card>
// //         <CardContent className="p-4 space-y-4">
// //           <h3 className="text-xl font-semibold">{note.title}</h3>
// //           <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
// //           <div className="flex flex-wrap gap-2">
// //             {note.tags?.map((tag) => (
// //               <span
// //                 key={tag}
// //                 className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
// //               >
// //                 #{tag}
// //               </span>
// //             ))}
// //           </div>
// //         </CardContent>
// //       </Card>
// //     );
// //   }
  
// //   // export default ExplorePage;


// // "use client";



// // import React, { useState, useEffect, useRef } from 'react';
// // import { useInView } from 'react-intersection-observer';
// // import { FiHeart, FiMessageSquare, FiShare2, FiBookmark, FiSend, FiX } from 'react-icons/fi';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { Input } from '@/components/ui/input';
// // import { Button } from '@/components/ui/button';
// // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // import { Skeleton } from '@/components/ui/skeleton';
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import { useToast } from '@/hooks/use-toast';
// // import { useRouter } from 'next/navigation';
// // import {
// //   collection,
// //   query,
// //   where,
// //   orderBy,
// //   limit,
// //   startAfter,
// //   getDocs,
// //   updateDoc,
// //   arrayUnion,
// //   arrayRemove,
// //   doc,
// //   serverTimestamp,
// //   addDoc
// // } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import Navbar from '@/components/Navbar';
// // import Space from '@/components/space';

// // interface Post {
// //   id: string;
// //   userId: string;
// //   imageUrl: string;
// //   caption: string;
// //   likes: string[];
// //   saves: string[];
// //   comments: Comment[];
// //   tags: string[];
// //   createdAt: any;
// // }

// // interface Comment {
// //   id: string;
// //   userId: string;
// //   text: string;
// //   createdAt: any;
// // }

// // interface UserProfile {
// //   uid: string;
// //   name: string;
// //   photoURL: string;
// //   username: string;
// // }

// // const ITEMS_PER_PAGE = 12;
// // export default function Page() {
// //   const [posts, setPosts] = useState<Post[]>([]);
// //   const [users, setUsers] = useState<Record<string, UserProfile>>({});
// //   const [loading, setLoading] = useState(true);
// //   const [loadingMore, setLoadingMore] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [selectedTags, setSelectedTags] = useState<string[]>([]);
// //   const lastPostRef = useRef<any>(null);
// //   const [selectedPost, setSelectedPost] = useState<Post | null>(null);
// //   const [commentText, setCommentText] = useState('');
// //   const [currentUserId, setCurrentUserId] = useState<string>(''); // Get from your auth context
// //   const { toast } = useToast();
// //   const router = useRouter();
// //   const { ref: loadMoreRef, inView } = useInView();

// //   const fetchUsers = async (userIds: string[]) => {
// //     const uniqueIds = [...new Set(userIds)];
// //     const newUsers: Record<string, UserProfile> = {};
    
// //     for (const id of uniqueIds) {
// //       if (!users[id]) {
// //         const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', id)));
// //         if (!userDoc.empty) {
// //           newUsers[id] = userDoc.docs[0].data() as UserProfile;
// //         }
// //       }
// //     }
    
// //     setUsers(prev => ({ ...prev, ...newUsers }));
// //   };

// //   const fetchPosts = async (isInitial = false) => {
// //     try {
// //       const postsRef = collection(db, 'posts');
// //       let q = query(
// //         postsRef,
// //         orderBy('createdAt', 'desc'),
// //         limit(ITEMS_PER_PAGE)
// //       );

// //       if (!isInitial && lastPostRef.current) {
// //         q = query(q, startAfter(lastPostRef.current));
// //       }

// //       const snapshot = await getDocs(q);
// //       lastPostRef.current = snapshot.docs[snapshot.docs.length - 1];
      
// //       const newPosts = snapshot.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data()
// //       })) as Post[];

// //       // Fetch user data for new posts
// //       const userIds = newPosts.map(post => post.userId);
// //       await fetchUsers(userIds);

// //       return newPosts;
// //     } catch (error) {
// //       console.error('Error fetching posts:', error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to fetch posts. Please try again later.",
// //         variant: "destructive"
// //       });
// //       return [];
// //     }
// //   };

// //   const handleLike = async (postId: string) => {
// //     try {
// //       const postRef = doc(db, 'posts', postId);
// //       const post = posts.find(p => p.id === postId);
      
// //       if (!post) return;

// //       const isLiked = post.likes.includes(currentUserId);
// //       await updateDoc(postRef, {
// //         likes: isLiked ? arrayRemove(currentUserId) : arrayUnion(currentUserId)
// //       });

// //       setPosts(prev => prev.map(p => 
// //         p.id === postId 
// //           ? { 
// //               ...p, 
// //               likes: isLiked 
// //                 ? p.likes.filter(id => id !== currentUserId)
// //                 : [...p.likes, currentUserId]
// //             }
// //           : p
// //       ));

// //       toast({
// //         title: isLiked ? "Post unliked" : "Post liked",
// //         duration: 1500
// //       });
// //     } catch (error) {
// //       console.error('Error updating like:', error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to update like. Please try again.",
// //         variant: "destructive"
// //       });
// //     }
// //   };

// //   const handleSave = async (postId: string) => {
// //     try {
// //       const postRef = doc(db, 'posts', postId);
// //       const post = posts.find(p => p.id === postId);
      
// //       if (!post) return;

// //       const isSaved = post.saves.includes(currentUserId);
// //       await updateDoc(postRef, {
// //         saves: isSaved ? arrayRemove(currentUserId) : arrayUnion(currentUserId)
// //       });

// //       setPosts(prev => prev.map(p => 
// //         p.id === postId 
// //           ? { 
// //               ...p, 
// //               saves: isSaved 
// //                 ? p.saves.filter(id => id !== currentUserId)
// //                 : [...p.saves, currentUserId]
// //             }
// //           : p
// //       ));

// //       toast({
// //         title: isSaved ? "Post removed from saved" : "Post saved",
// //         duration: 1500
// //       });
// //     } catch (error) {
// //       console.error('Error updating save:', error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to save post. Please try again.",
// //         variant: "destructive"
// //       });
// //     }
// //   };

// //   const handleShare = async (postId: string) => {
// //     try {
// //       const shareUrl = `${window.location.origin}/post/${postId}`;
// //       await navigator.clipboard.writeText(shareUrl);
// //       toast({
// //         title: "Link copied to clipboard",
// //         duration: 1500
// //       });
// //     } catch (error) {
// //       console.error('Error sharing post:', error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to share post. Please try again.",
// //         variant: "destructive"
// //       });
// //     }
// //   };

// //   const handleComment = async (postId: string) => {
// //     if (!commentText.trim()) return;

// //     try {
// //       const postRef = doc(db, 'posts', postId);
// //       const newComment = {
// //         id: Math.random().toString(36).substr(2, 9),
// //         userId: currentUserId,
// //         text: commentText,
// //         createdAt: serverTimestamp()
// //       };

// //       await updateDoc(postRef, {
// //         comments: arrayUnion(newComment)
// //       });

// //       setPosts(prev => prev.map(p => 
// //         p.id === postId 
// //           ? { ...p, comments: [...p.comments, newComment] }
// //           : p
// //       ));

// //       setCommentText('');
// //       toast({
// //         title: "Comment added",
// //         duration: 1500
// //       });
// //     } catch (error) {
// //       console.error('Error adding comment:', error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to add comment. Please try again.",
// //         variant: "destructive"
// //       });
// //     }
// //   };

// //   const navigateToProfile = (userId: string) => {
// //     router.push(`/profile/${userId}`);
// //   };

// //   useEffect(() => {
// //     const initializePosts = async () => {
// //       setLoading(true);
// //       const postsData = await fetchPosts(true);
// //       setPosts(postsData);
// //       setLoading(false);
// //     };

// //     initializePosts();
// //   }, []);

// //   useEffect(() => {
// //     if (inView && !loading && !loadingMore) {
// //       loadMorePosts();
// //     }
// //   }, [inView]);

// //   const loadMorePosts = async () => {
// //     if (loadingMore) return;
    
// //     setLoadingMore(true);
// //     const newPosts = await fetchPosts();
// //     setPosts(prev => [...prev, ...newPosts]);
// //     setLoadingMore(false);
// //   };

// //   const filterPosts = (posts: Post[]) => {
// //     return posts.filter(post => {
// //       const matchesSearch = !searchQuery || 
// //         post.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         (users[post.userId]?.name || '').toLowerCase().includes(searchQuery.toLowerCase());

// //       const matchesTags = selectedTags.length === 0 ||
// //         selectedTags.some(tag => post.tags?.includes(tag));

// //       return matchesSearch && matchesTags;
// //     });
// //   };

// //   const getAllTags = () => {
// //     const tagsSet = new Set<string>();
// //     posts.forEach(post => {
// //       post.tags?.forEach(tag => tagsSet.add(tag));
// //     });
// //     return Array.from(tagsSet);
// //   };

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //       <div className="mb-8">
// //         <h1 className="text-3xl font-bold mb-6">Explore</h1>
        
// //         <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
// //           <Input
// //             placeholder="Search posts..."
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="w-full"
// //           />
          
// //           <div className="flex flex-wrap gap-2">
// //             {getAllTags().map(tag => (
// //               <Button
// //                 key={tag}
// //                 variant={selectedTags.includes(tag) ? "default" : "outline"}
// //                 size="sm"
// //                 onClick={() => {
// //                   setSelectedTags(prev =>
// //                     prev.includes(tag)
// //                       ? prev.filter(t => t !== tag)
// //                       : [...prev, tag]
// //                   );
// //                 }}
// //               >
// //                 #{tag}
// //               </Button>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       <div className="grid gap-6 md:grid-cols-3">
// //         {loading ? (
// //           Array(9).fill(0).map((_, i) => (
// //             <Skeleton key={i} className="aspect-square rounded-xl" />
// //           ))
// //         ) : (
// //           filterPosts(posts).map((post) => (
// //             <Card 
// //               key={post.id} 
// //               className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
// //               onClick={() => setSelectedPost(post)}
// //             >
// //               <div className="aspect-square relative">
// //                 <img
// //                   src={post.imageUrl}
// //                   alt=""
// //                   className="absolute inset-0 w-full h-full object-cover"
// //                 />
// //                 <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
// //                   <div className="flex gap-6 text-white">
// //                     <div className="flex items-center gap-2">
// //                       <FiHeart />
// //                       {post.likes.length}
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                       <FiMessageSquare />
// //                       {post.comments.length}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </Card>
// //           ))
// //         )}
// //       </div>

// //       <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
// //         <DialogContent className="max-w-4xl h-[80vh]">
// //           <DialogHeader>
// //             <DialogTitle className="flex items-center gap-3">
// //               <Avatar 
// //                 className="h-10 w-10 cursor-pointer"
// //                 onClick={() => selectedPost && navigateToProfile(selectedPost.userId)}
// //               >
// //                 <AvatarImage src={users[selectedPost?.userId || '']?.photoURL} />
// //                 <AvatarFallback>{users[selectedPost?.userId || '']?.name?.[0]}</AvatarFallback>
// //               </Avatar>
// //               <span 
// //                 className="cursor-pointer"
// //                 onClick={() => selectedPost && navigateToProfile(selectedPost.userId)}
// //               >
// //                 {users[selectedPost?.userId || '']?.name}
// //               </span>
// //             </DialogTitle>
// //           </DialogHeader>

// //           <div className="grid md:grid-cols-[3fr,2fr] gap-4 h-full">
// //             <div className="relative aspect-square">
// //               <img
// //                 src={selectedPost?.imageUrl}
// //                 alt=""
// //                 className="absolute inset-0 w-full h-full object-cover rounded-lg"
// //               />
// //             </div>

// //             <div className="flex flex-col h-full">
// //               <div className="flex-grow overflow-y-auto">
// //                 <p className="text-gray-700 mb-4">{selectedPost?.caption}</p>

// //                 <div className="flex flex-wrap gap-2 mb-4">
// //                   {selectedPost?.tags.map(tag => (
// //                     <span
// //                       key={tag}
// //                       className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm"
// //                     >
// //                       #{tag}
// //                     </span>
// //                   ))}
// //                 </div>

// //                 <div className="space-y-4">
// //                   {selectedPost?.comments.map(comment => (
// //                     <div key={comment.id} className="flex gap-3">
// //                       <Avatar className="h-8 w-8">
// //                         <AvatarImage src={users[comment.userId]?.photoURL} />
// //                         <AvatarFallback>{users[comment.userId]?.name?.[0]}</AvatarFallback>
// //                       </Avatar>
// //                       <div>
// //                         <p className="font-semibold">{users[comment.userId]?.name}</p>
// //                         <p className="text-gray-600">{comment.text}</p>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div className="border-t pt-4 mt-4">
// //                 <div className="flex items-center justify-between mb-4">
// //                   <div className="flex gap-4">
// //                   <Button
// //                       variant="ghost"
// //                       size="sm"
// //                       onClick={() => selectedPost && handleLike(selectedPost.id)}
// //                       className={`hover:text-red-500 ${
// //                         selectedPost?.likes.includes(currentUserId) ? 'text-red-500' : ''
// //                       }`}
// //                     >
// //                       <FiHeart className="mr-2" />
// //                       {selectedPost?.likes.length || 0}
// //                     </Button>
                    
// //                     <Button variant="ghost" size="sm">
// //                       <FiMessageSquare className="mr-2" />
// //                       {selectedPost?.comments.length || 0}
// //                     </Button>
// //                   </div>

// //                   <div className="flex gap-2">
// //                     <Button
// //                       variant="ghost"
// //                       size="sm"
// //                       onClick={() => selectedPost && handleShare(selectedPost.id)}
// //                     >
// //                       <FiShare2 />
// //                     </Button>
// //                     <Button
// //                       variant="ghost"
// //                       size="sm"
// //                       onClick={() => selectedPost && handleSave(selectedPost.id)}
// //                       className={`hover:text-blue-500 ${
// //                         selectedPost?.saves.includes(currentUserId) ? 'text-blue-500' : ''
// //                       }`}
// //                     >
// //                       <FiBookmark />
// //                     </Button>
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-2">
// //                   <Input
// //                     placeholder="Add a comment..."
// //                     value={commentText}
// //                     onChange={(e) => setCommentText(e.target.value)}
// //                     onKeyPress={(e) => {
// //                       if (e.key === 'Enter' && selectedPost) {
// //                         handleComment(selectedPost.id);
// //                       }
// //                     }}
// //                   />
// //                   <Button
// //                     size="sm"
// //                     onClick={() => selectedPost && handleComment(selectedPost.id)}
// //                     disabled={!commentText.trim()}
// //                   >
// //                     <FiSend />
// //                   </Button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </DialogContent>
// //       </Dialog>

// //       {!loading && (
// //         <div ref={loadMoreRef} className="py-8 text-center">
// //           {loadingMore ? (
// //             <div className="flex justify-center">
// //               <Skeleton className="h-10 w-40" />
// //             </div>
// //           ) : (
// //             <div className="flex items-center justify-center gap-2 text-gray-500">
// //               <div className="animate-spin h-4 w-4 border-2 border-gray-500 rounded-full border-t-transparent" />
// //               Loading more posts...
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       <Space />
// //       <Navbar />
// //     </div>
// //   );
// // }

// // // export default ExplorePage;













// "use client";

// import React, { useState, useEffect, useCallback } from 'react';
// import { Tab } from '@headlessui/react';
// import { useInView } from 'react-intersection-observer';
// import { FiHeart, FiMessageSquare, FiShare2, FiBookmark, FiGithub, FiLink, FiDownload } from 'react-icons/fi';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Skeleton } from '@/components/ui/skeleton';
// import { toast } from '@/hooks/use-toast';
// import { collection, query, where, orderBy, limit, startAfter, getDocs } from '@/lib/firebase';
// import type { Post, Note, UserProfile } from '../../../types/user';
// import { db } from '@/lib/firebase';
// import Navbar from '@/components/Navbar';
// import Space from '@/components/space';

// const ITEMS_PER_PAGE = 12;

// export default function Page() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [posts, setPosts] = useState<Post[]>([]);
  
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [users, setUsers] = useState<Record<string, UserProfile>>({});
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);
//   const [lastDoc, setLastDoc] = useState<Record<string, any>>({});

//   const { ref: loadMoreRef, inView } = useInView();

//   const fetchUsers = async (userIds: string[]) => {
//     const uniqueIds = [...new Set(userIds)];
//     const newUsers: Record<string, UserProfile> = {};
    
//     for (const id of uniqueIds) {
//       if (!users[id]) {
//         const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', id)));
//         if (!userDoc.empty) {
//           newUsers[id] = userDoc.docs[0].data() as UserProfile;
//         }
//       }
//     }
    
//     setUsers(prev => ({ ...prev, ...newUsers }));
//   };

//   const fetchContent = async (type: 'posts'  | 'notes', isInitial = false) => {
//     try {
//       const collectionRef = collection(db, type);
//       let q = query(
//         collectionRef,
//         orderBy('createdAt', 'desc'),
//         limit(ITEMS_PER_PAGE)
//       );

//       if (!isInitial && lastDoc[type]) {
//         q = query(q, startAfter(lastDoc[type]));
//       }

//       const snapshot = await getDocs(q);
//       const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      
//       const items = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));

//       // Fetch user data for new items
//       const userIds = items.map(item => item.userId);
//       await fetchUsers(userIds);

//       setLastDoc(prev => ({ ...prev, [type]: lastVisible }));

//       return items;
//     } catch (error) {
//       console.error(`Error fetching ${type}:`, error);
//       toast({
//         title: "Error",
//         description: `Failed to fetch ${type}. Please try again later.`,
//         variant: "destructive"
//       });
//       return [];
//     }
//   };

//   const loadMoreContent = async () => {
//     if (loadingMore) return;
    
//     setLoadingMore(true);
//     const type = ['posts', 'notes'][activeTab];
//     const newItems = await fetchContent(type as 'posts' |  'notes');
    
//     switch (activeTab) {
//       case 0:
//         setPosts(prev => [...prev, ...newItems as Post[]]);
//         break;
      
//       case 2:
//         setNotes(prev => [...prev, ...newItems as Note[]]);
//         break;
//     }
    
//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     const initializeContent = async () => {
//       setLoading(true);
//       const [postsData, notesData] = await Promise.all([
//         fetchContent('posts', true),
//         fetchContent('projects', true),
//         fetchContent('notes', true)
//       ]);
      
//       setPosts(postsData as Post[]);
    
//       setNotes(notesData as Note[]);
//       setLoading(false);
//     };

//     initializeContent();
//   }, []);

//   useEffect(() => {
//     if (inView && !loading && !loadingMore) {
//       loadMoreContent();
//     }
//   }, [inView]);

//   const handleLike = async (itemId: string, type: 'posts'  | 'notes') => {
//     // Implement like functionality
//   };

//   const handleSave = async (itemId: string, type: 'posts'  | 'notes') => {
//     // Implement save functionality
//   };

//   const handleShare = async (itemId: string, type: 'posts' | 'notes') => {
//     // Implement share functionality
//   };

//   const filterContent = (content: any[]) => {
//     return content.filter(item => {
//       const matchesSearch = !searchQuery || 
//         item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.description?.toLowerCase().includes(searchQuery.toLowerCase());

//       const matchesTags = selectedTags.length === 0 ||
//         (item.tags && selectedTags.some(tag => item.tags.includes(tag)));

//       return matchesSearch && matchesTags;
//     });
//   };

//   const getAllTags = () => {
//     const tagsSet = new Set<string>();
//     [...posts,  ...notes].forEach(item => {
//       item.tags?.forEach(tag => tagsSet.add(tag));
//     });
//     return Array.from(tagsSet);
//   };

//   const ContentCard = ({ item, type }: { item: Post | Note; type: string }) => {
//     const user = users[item.userId];
//     const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });

//     return (
//       <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        
//         <CardContent className="p-4">
//           <div className="flex items-center gap-3 mb-4">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src={user?.photoURL} />
//               <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-semibold">{user?.name}</p>
//               <p className="text-sm text-gray-500">{formattedDate}</p>
//             </div>
//           </div>

//           {'imageUrl' in item && item.imageUrl && (
//             <div className="relative h-48 mb-4">
//               <img
//                 src={item.imageUrl}
//                 alt=""
//                 className="absolute inset-0 w-full h-full object-cover rounded-lg"
//               />
//             </div>
//           )}

//           {'title' in item && (
//             <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//           )}

//           <p className="text-gray-700 mb-4">
//             {'content' in item ? item.content : item.description}
//           </p>

//           {item.tags && (
//             <div className="flex flex-wrap gap-2 mb-4">
//               {item.tags.map(tag => (
//                 <span
//                   key={tag}
//                   className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           )}

//           <div className="flex items-center justify-between pt-4 border-t">
//             <div className="flex gap-4">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => handleLike(item.id, type as any)}
//               >
//                 <FiHeart className="mr-2" />
//                 {('likes' in item) && item.likes?.length || 0}
//               </Button>
              
//               {'content' in item && (
//                 <Button variant="ghost" size="sm">
//                   <FiMessageSquare className="mr-2" />
//                   {item.comments?.length || 0}
//                 </Button>
//               )}
//             </div>

//             <div className="flex gap-2">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => handleShare(item.id, type as any)}
//               >
//                 <FiShare2 />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => handleSave(item.id, type as any)}
//               >
//                 <FiBookmark />
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-6">Explore</h1>
        
//         <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
//           <Input
//             placeholder="Search content..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full"
//           />
          
//           <div className="flex flex-wrap gap-2">
//             {getAllTags().map(tag => (
//               <Button
//                 key={tag}
//                 variant={selectedTags.includes(tag) ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => {
//                   setSelectedTags(prev =>
//                     prev.includes(tag)
//                       ? prev.filter(t => t !== tag)
//                       : [...prev, tag]
//                   );
//                 }}
//               >
//                 #{tag}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <Tab.Group onChange={setActiveTab}>
//         <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
//           {['Posts', 'Notes'].map((category) => (
//             <Tab
//               key={category}
//               className={({ selected }) =>
//                 `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
//                 ${selected
//                   ? 'bg-white text-blue-600 shadow'
//                   : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
//                 }`
//               }
//             >
//               {category}
//             </Tab>
//           ))}
//         </Tab.List>

//         <Tab.Panels>
//           <Tab.Panel>
//             <div className="grid gap-6 md:grid-cols-2">
//               {loading ? (
//                 Array(4).fill(0).map((_, i) => (
//                   <Skeleton key={i} className="h-[400px] rounded-xl" />
//                 ))
//               ) : (
//                 filterContent(posts).map((post) => (
//                   <ContentCard key={post.id} item={post} type="posts" />
//                 ))
//               )}
//             </div>
//           </Tab.Panel>

//           <Tab.Panel>
            
//           </Tab.Panel>

//           <Tab.Panel>
//             <div className="grid gap-6 md:grid-cols-2">
//               {loading ? (
//                 Array(4).fill(0).map((_, i) => (
//                   <Skeleton key={i} className="h-[250px] rounded-xl" />
//                 ))
//               ) : (
//                 filterContent(notes).map((note) => (
//                   <ContentCard key={note.id} item={note} type="notes" />
//                 ))
//               )}
//             </div>
//           </Tab.Panel>
//         </Tab.Panels>
//       </Tab.Group>

//       {!loading && (
//         <div ref={loadMoreRef} className="py-8 text-center">
//           {loadingMore ? (
//             <div className="flex justify-center">
//               <Skeleton className="h-10 w-40" />
//             </div>
//           ) : (
//             <Button variant="outline" onClick={loadMoreContent}>
//               Load More
//             </Button>
//           )}
//         </div>
//       )}


// <Space />
// <Navbar  />

//     </div>
//   );
// }

// // export default ExplorePage;  








"use client";

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { FiHeart, FiMessageSquare, FiShare2, FiBookmark } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  startAfter, 
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  where,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { useAuth } from '../../../utils/hooks/useAuth';
import type { Post, UserProfile } from './../../../types/user';
import Space from '@/components/space';
import Navbar from '@/components/Navbar';
import Image from "next/image";

const POSTS_PER_PAGE = 9;
const PREDEFINED_TAGS = ['vishal', 'vyas', 'xhhxs', 'webdev', 'me', 'ij', 'fd'];

export default function ExplorePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<string, UserProfile>>({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  // Fetch user data for posts
  const fetchUserData = async (userIds: string[]) => {
    try {
      const uniqueIds = [...new Set(userIds)];
      const usersData: Record<string, UserProfile> = {};

      const usersCollection = collection(db, 'users');
      const userSnapshots = await Promise.all(
        uniqueIds.map(async (userId) => {
          const q = query(usersCollection, where('uid', '==', userId));
          return getDocs(q);
        })
      );

      userSnapshots.forEach((snapshot) => {
        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data() as UserProfile;
          usersData[userData.uid] = userData;
        }
      });

      setUsers(prev => ({ ...prev, ...usersData }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch posts with pagination
  const fetchPosts = async (isInitial = false) => {
    try {
      setLoadingMore(!isInitial);
      
      const postsCollection = collection(db, 'posts');
      let postsQuery = query(
        postsCollection,
        orderBy('createdAt', 'desc'),
        limit(POSTS_PER_PAGE)
      );

      if (!isInitial && lastVisible) {
        postsQuery = query(
          postsCollection,
          orderBy('createdAt', 'desc'),
          startAfter(lastVisible),
          limit(POSTS_PER_PAGE)
        );
      }

      const snapshot = await getDocs(postsQuery);
      
      if (snapshot.empty) {
        setHasMore(false);
        setLoadingMore(false);
        if (isInitial) setLoading(false);
        return;
      }

      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];

      // Fetch user data for new posts
      const userIds = newPosts.map(post => post.userId);
      await fetchUserData(userIds);

      setPosts(prev => isInitial ? newPosts : [...prev, ...newPosts]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === POSTS_PER_PAGE);
      
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPosts(true);
  }, []);

  // Infinite scroll
  useEffect(() => {
    if (inView && hasMore && !loading && !loadingMore) {
      fetchPosts();
    }
  }, [inView]);

  // Handle post interactions
  const handleLike = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
        variant: "default"
      });
      return;
    }

    try {
      const postRef = doc(db, 'posts', postId);
      const currentPost = posts.find(p => p.id === postId);
      
      if (!currentPost) return;

      const isLiked = currentPost.likes.includes(user.uid);
      
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
      });

      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: isLiked 
              ? post.likes.filter(id => id !== user.uid)
              : [...post.likes, user.uid]
          };
        }
        return post;
      }));

    } catch (error) {
      console.error('Error updating like:', error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive"
      });
    }
  };

  // const handleSave = async (postId: string) => {
  //   if (!user) {
  //     toast({
  //       title: "Authentication required",
  //       description: "Please sign in to save posts",
  //       variant: "default"
  //     });
  //     return;
  //   }

  //   try {
  //     // Implement save functionality
  //     toast({
  //       title: "Coming soon",
  //       description: "Save functionality will be available soon!",
  //       variant: "default"
  //     });
  //   } catch (error) {
  //     console.error('Error saving post:', error);
  //   }
  // };



  const handleSave = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save posts",
        variant: "default"
      });
      return;
    }
  
    try {
      const postRef = doc(db, 'posts', postId);
      const userRef = doc(db, 'users', user.uid);
      const currentPost = posts.find(p => p.id === postId);
  
      if (!currentPost) return;
  
      const isSaved = currentPost.savedBy?.includes(user.uid);
  
      // Update post document with user's ID in savedBy array
      await updateDoc(postRef, {
        savedBy: isSaved ? arrayRemove(user.uid) : arrayUnion(user.uid)
      });
  
      // Update user's saved posts array
      await updateDoc(userRef, {
        savedPosts: isSaved ? arrayRemove(postId) : arrayUnion(postId)
      });
  
      // Update local state
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          const savedBy = post.savedBy || [];
          return {
            ...post,
            savedBy: isSaved 
              ? savedBy.filter(id => id !== user.uid)
              : [...savedBy, user.uid]
          };
        }
        return post;
      }));
  
      toast({
        title: isSaved ? "Post unsaved" : "Post saved",
        description: isSaved ? "Post removed from your saved items" : "Post added to your saved items",
        variant: "default"
      });
  
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save post. Please try again.",
        variant: "destructive"
      });
    }
  };


  const handleShare = async (postId: string) => {
    try {
      const shareUrl = `${window.location.origin}/post/${postId}`;
      await navigator.clipboard.writeText(shareUrl);
      
      toast({
        title: "Link copied",
        description: "Post link  copied to clipboard",
        variant: "default"
      });
    } catch (error) {
      console.error('Error sharing post:', error);
      toast({
        title: "Error",
        description: "Failed to share post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.content?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags = selectedTags.length === 0 ||
      selectedTags.some(tag => post.tags?.includes(tag));

    return matchesSearch && matchesTags;
  });

  const PostCard = ({ post }: { post: Post }) => {
    const postUser = users[post.userId];
    const formattedDate = new Date(post.createdAt as number).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return (
      <Card className="overflow-hidden shadow-none border-none">
        <Link href={`/post/${post.id}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={postUser?.photoURL} />
                <AvatarFallback>{postUser?.name?.[0] || '?'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{postUser?.name || 'Anonymous'}</p>
                <p className="text-sm text-gray-500">{formattedDate}</p>
              </div>
            </div>

            {post.imageUrl && (
  <div className="relative h-48 mb-4">
    <Image
      src={post.imageUrl}
      alt="Post Image"
      layout="fill"
      objectFit="cover"
      className="rounded-lg"
    />
  </div>
)}

            <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Link>

        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                handleLike(post.id);
              }}
              className={`${post.likes?.includes(user?.uid || '') ? 'text-red-500' : ''}`}
            >
              <FiHeart className="mr-2" />
              {post.likes?.length || 0}
            </Button>
            
            <Button variant="ghost" size="sm">
              <FiMessageSquare className="mr-2" />
              {post.comments?.length || 0}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                handleShare(post.id);
              }}
            >
              <FiShare2 />
            </Button>
            <Button
  variant="ghost"
  size="sm"
  onClick={(e) => {
    e.preventDefault();
    handleSave(post.id);
  }}
  className={`${post.savedBy?.includes(user?.uid || '') ? 'text-blue-500' : ''}`}
>
  <FiBookmark />
</Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Explore Posts</h1>
        
        <div className="mb-8">
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          
          <div className="flex flex-wrap gap-2">
            {PREDEFINED_TAGS.map(tag => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
              >
                #{tag}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl" />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No posts found</h2>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {!loading && hasMore && (
          <div ref={ref} className="py-8 text-center">
            {loadingMore && (
              <div className="flex justify-center">
                <Skeleton className="h-10 w-40" />
              </div>
            )}
          </div>
        )}
      </div>



      <Space />
      <Navbar />
    </div>
  );
}