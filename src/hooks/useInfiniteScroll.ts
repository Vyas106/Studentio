// // types/index.ts
// export interface UserProfile {
//     uid: string;
//     name: string;
//     photoURL: string;
//     email: string;
//   }
  
//   export interface BaseItem {
//     id: string;
//     userId: string;
//     createdAt: number;
//     tags?: string[];
//     likes: string[];
//     saved: string[];
//   }
  
//   export interface Post extends BaseItem {
//     title: string;
//     content: string;
//     imageUrl?: string;
//     comments: Comment[];
//   }
  
//   export interface Project extends BaseItem {
//     title: string;
//     description: string;
//     imageUrl?: string;
//     githubUrl?: string;
//     liveUrl?: string;
//   }
  
//   export interface Note extends BaseItem {
//     title: string;
//     content: string;
//   }
  
//   export interface Comment extends BaseItem {
//     content: string;
//     parentId?: string;
//     replies: Comment[];
//   }
  
//   // hooks/useInfiniteScroll.ts
//   import { useState, useEffect } from 'react';
//   import { useInView } from 'react-intersection-observer';
//   import { collection, query, where, orderBy, limit, startAfter, getDocs, db } from '@/lib/firebase';
  
//   export function useInfiniteScroll<T extends BaseItem>(
//     collectionName: string,
//     itemsPerPage: number = 12
//   ) {
//     const [items, setItems] = useState<T[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [loadingMore, setLoadingMore] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const [lastDoc, setLastDoc] = useState<any>(null);
//     const { ref, inView } = useInView();
  
//     const fetchItems = async (isInitial = false) => {
//       try {
//         setLoadingMore(!isInitial);
        
//         const collectionRef = collection(db, collectionName);
//         let q = query(
//           collectionRef,
//           orderBy('createdAt', 'desc'),
//           limit(itemsPerPage)
//         );
  
//         if (!isInitial && lastDoc) {
//           q = query(q, startAfter(lastDoc));
//         }
  
//         const snapshot = await getDocs(q);
//         const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        
//         const newItems = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         })) as T[];
  
//         setLastDoc(lastVisible);
//         setHasMore(newItems.length === itemsPerPage);
  
//         if (isInitial) {
//           setItems(newItems);
//         } else {
//           setItems(prev => [...prev, ...newItems]);
//         }
  
//         return newItems;
//       } catch (error) {
//         console.error(`Error fetching ${collectionName}:`, error);
//         toast({
//           title: "Error",
//           description: `Failed to fetch ${collectionName}. Please try again later.`,
//           variant: "destructive"
//         });
//         return [];
//       } finally {
//         setLoading(false);
//         setLoadingMore(false);
//       }
//     };
  
//     useEffect(() => {
//       fetchItems(true);
//     }, [collectionName]);
  
//     useEffect(() => {
//       if (inView && !loading && !loadingMore && hasMore) {
//         fetchItems();
//       }
//     }, [inView]);
  
//     return {
//       items,
//       loading,
//       loadingMore,
//       hasMore,
//       ref,
//       refreshItems: () => fetchItems(true),
//       setItems
//     };
//   }
  
//   // components/SearchBar.tsx
//   interface SearchBarProps {
//     searchQuery: string;
//     setSearchQuery: (query: string) => void;
//     selectedTags: string[];
//     setSelectedTags: (tags: string[]) => void;
//     availableTags: string[];
//   }
  
//   export function SearchBar({
//     searchQuery,
//     setSearchQuery,
//     selectedTags,
//     setSelectedTags,
//     availableTags
//   }: SearchBarProps) {
//     return (
//         <>

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
//             {availableTags.map(tag => (
//               <Button
//                 key={tag}
//                 variant={selectedTags.includes(tag) ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => {
//                   setSelectedTags(
//                     selectedTags.includes(tag)
//                       ? selectedTags.filter(t => t !== tag)
//                       : [...selectedTags, tag]
//                   );
//                 }}
//               >
//                 #{tag}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>
//       </>
//     );
//   }
  
//   // components/CommentSection.tsx
//   interface CommentSectionProps {
//     comments: Comment[];
//     postId: string;
//     onAddComment: (content: string, parentId?: string) => Promise<void>;
//   }
  
//   export function CommentSection({ comments, postId, onAddComment }: CommentSectionProps) {
//     const [replyTo, setReplyTo] = useState<string | null>(null);
//     const [content, setContent] = useState('');
  
//     const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
//       if (!content.trim()) return;
      
//       await onAddComment(content, replyTo || undefined);
//       setContent('');
//       setReplyTo(null);
//     };
  
//     const renderComment = (comment: Comment, depth = 0) => (
//       <div key={comment.id} className={`ml-${depth * 4}`}>
//         <div className="flex items-start gap-2 mb-2">
//           <Avatar className="h-8 w-8">
//             <AvatarImage src={comment.user?.photoURL} />
//             <AvatarFallback>{comment.user?.name?.[0]}</AvatarFallback>
//           </Avatar>
//           <div className="flex-1">
//             <p className="font-semibold">{comment.user?.name}</p>
//             <p className="text-sm text-gray-700">{comment.content}</p>
//             <div className="flex gap-4 mt-1">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setReplyTo(comment.id)}
//               >
//                 Reply
//               </Button>
//             </div>
//           </div>
//         </div>
        
//         {comment.replies?.map(reply => renderComment(reply, depth + 1))}
        
//         {replyTo === comment.id && (
//           <form onSubmit={handleSubmit} className="ml-8 mt-2">
//             <Input
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="Write a reply..."
//               className="mb-2"
//             />
//             <div className="flex gap-2">
//               <Button type="submit" size="sm">Reply</Button>
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setReplyTo(null)}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         )}
//       </div>
//     );
  
//     return (
//       <div className="mt-4">
//         <form onSubmit={handleSubmit} className="mb-4">
//           <Input
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="Write a comment..."
//             className="mb-2"
//           />
//           <Button type="submit">Comment</Button>
//         </form>
        
//         <div className="space-y-4">
//           {comments.map(comment => renderComment(comment))}
//         </div>
//       </div>
//     );
//   }
  
//   // page.tsx
//   export default function ExplorePage() {
//     const [activeTab, setActiveTab] = useState(0);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
//     const {
//       items: posts,
//       loading: postsLoading,
//       loadingMore: postsLoadingMore,
//       ref: postsRef,
//       refreshItems: refreshPosts,
//       setItems: setPosts
//     } = useInfiniteScroll<Post>('posts');
  
//     const {
//       items: projects,
//       loading: projectsLoading,
//       loadingMore: projectsLoadingMore,
//       ref: projectsRef,
//       refreshItems: refreshProjects,
//       setItems: setProjects
//     } = useInfiniteScroll<Project>('projects');
  
//     const {
//       items: notes,
//       loading: notesLoading,
//       loadingMore: notesLoadingMore,
//       ref: notesRef,
//       refreshItems: refreshNotes,
//       setItems: setNotes
//     } = useInfiniteScroll<Note>('notes');
  
//     const handleLike = async (itemId: string, type: 'posts' | 'projects' | 'notes') => {
//       try {
//         const docRef = doc(db, type, itemId);
//         const docSnap = await getDoc(docRef);
        
//         if (!docSnap.exists()) return;
        
//         const likes = docSnap.data().likes || [];
//         const userIndex = likes.indexOf(currentUser.uid);
        
//         if (userIndex > -1) {
//           likes.splice(userIndex, 1);
//         } else {
//           likes.push(currentUser.uid);
//         }
        
//         await updateDoc(docRef, { likes });
        
//         // Update local state
//         const updateItems = (items: any[]) =>
//           items.map(item =>
//             item.id === itemId
//               ? { ...item, likes }
//               : item
//           );
        
//         switch (type) {
//           case 'posts':
//             setPosts(updateItems);
//             break;
//           case 'projects':
//             setProjects(updateItems);
//             break;
//           case 'notes':
//             setNotes(updateItems);
//           break;
//       }
//     } catch (error) {
//       console.error('Error updating like:', error);
//       toast({
//         title: "Error",
//         description: "Failed to update like. Please try again.",
//         variant: "destructive"
//       });
//     }
//   };

//   const handleSave = async (itemId: string, type: 'posts' | 'projects' | 'notes') => {
//     try {
//       const docRef = doc(db, type, itemId);
//       const docSnap = await getDoc(docRef);
      
//       if (!docSnap.exists()) return;
      
//       const saved = docSnap.data().saved || [];
//       const userIndex = saved.indexOf(currentUser.uid);
      
//       if (userIndex > -1) {
//         saved.splice(userIndex, 1);
//       } else {
//         saved.push(currentUser.uid);
//       }
      
//       await updateDoc(docRef, { saved });
      
//       // Update local state
//       const updateItems = (items: any[]) =>
//         items.map(item =>
//           item.id === itemId
//             ? { ...item, saved }
//             : item
//         );
      
//       switch (type) {
//         case 'posts':
//           setPosts(updateItems);
//           break;
//         case 'projects':
//           setProjects(updateItems);
//           break;
//         case 'notes':
//           setNotes(updateItems);
//           break;
//       }

//       toast({
//         title: userIndex > -1 ? "Removed from saved" : "Saved successfully",
//         variant: "default"
//       });
//     } catch (error) {
//       console.error('Error updating save:', error);
//       toast({
//         title: "Error",
//         description: "Failed to save item. Please try again.",
//         variant: "destructive"
//       });
//     }
//   };

//   const handleShare = async (itemId: string, type: 'posts' | 'projects' | 'notes') => {
//     try {
//       const url = `${window.location.origin}/${type}/${itemId}`;
//       await navigator.clipboard.writeText(url);
//       toast({
//         title: "Link copied to clipboard",
//         variant: "default"
//       });
//     } catch (error) {
//       console.error('Error sharing:', error);
//       toast({
//         title: "Error",
//         description: "Failed to share. Please try again.",
//         variant: "destructive"
//       });
//     }
//   };

//   const handleComment = async (itemId: string, content: string, parentId?: string) => {
//     try {
//       const docRef = doc(db, 'posts', itemId);
//       const newComment: Comment = {
//         id: uuidv4(),
//         userId: currentUser.uid,
//         content,
//         createdAt: Date.now(),
//         likes: [],
//         saved: [],
//         replies: [],
//         ...(parentId && { parentId })
//       };

//       await runTransaction(db, async (transaction) => {
//         const docSnap = await transaction.get(docRef);
//         if (!docSnap.exists()) return;

//         const post = docSnap.data() as Post;
//         let comments = [...post.comments];

//         if (parentId) {
//           // Add reply to parent comment
//           comments = comments.map(comment => {
//             if (comment.id === parentId) {
//               return {
//                 ...comment,
//                 replies: [...comment.replies, newComment]
//               };
//             }
//             return comment;
//           });
//         } else {
//           // Add new top-level comment
//           comments.push(newComment);
//         }

//         transaction.update(docRef, { comments });
//       });

//       // Update local state
//       setPosts(posts.map(post =>
//         post.id === itemId
//           ? {
//               ...post,
//               comments: parentId
//                 ? post.comments.map(comment =>
//                     comment.id === parentId
//                       ? {
//                           ...comment,
//                           replies: [...comment.replies, newComment]
//                         }
//                       : comment
//                   )
//                 : [...post.comments, newComment]
//             }
//           : post
//       ));

//       toast({
//         title: "Comment added successfully",
//         variant: "default"
//       });
//     } catch (error) {
//       console.error('Error adding comment:', error);
//       toast({
//         title: "Error",
//         description: "Failed to add comment. Please try again.",
//         variant: "destructive"
//       });
//     }
//   };

//   const filterContent = <T extends BaseItem>(content: T[]) => {
//     return content.filter(item => {
//       const matchesSearch = !searchQuery || 
//         ('title' in item && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         ('content' in item && item.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         ('description' in item && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

//       const matchesTags = selectedTags.length === 0 ||
//         (item.tags && selectedTags.some(tag => item.tags.includes(tag)));

//       return matchesSearch && matchesTags;
//     });
//   };

//   const getAllTags = () => {
//     const tagsSet = new Set<string>();
//     [...posts, ...projects, ...notes].forEach(item => {
//       item.tags?.forEach(tag => tagsSet.add(tag));
//     });
//     return Array.from(tagsSet);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <SearchBar
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         selectedTags={selectedTags}
//         setSelectedTags={setSelectedTags}
//         availableTags={getAllTags()}
//       />

//       <Tab.Group onChange={setActiveTab}>
//         <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
//           {['Posts', 'Projects', 'Notes'].map((category) => (
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
//               {postsLoading ? (
//                 Array(4).fill(0).map((_, i) => (
//                   <Skeleton key={i} className="h-[400px] rounded-xl" />
//                 ))
//               ) : filterContent(posts).map((post) => (
//                 <ContentCard
//                   key={post.id}
//                   item={post}
//                   type="posts"
//                   onLike={() => handleLike(post.id, 'posts')}
//                   onSave={() => handleSave(post.id, 'posts')}
//                   onShare={() => handleShare(post.id, 'posts')}
//                   onComment={(content, parentId) => handleComment(post.id, content, parentId)}
//                 />
//               ))}
//             </div>
//             <div ref={postsRef} />
//           </Tab.Panel>

//           <Tab.Panel>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {projectsLoading ? (
//                 Array(6).fill(0).map((_, i) => (
//                   <Skeleton key={i} className="h-[300px] rounded-xl" />
//                 ))
//               ) : filterContent(projects).map((project) => (
//                 <ContentCard
//                   key={project.id}
//                   item={project}
//                   type="projects"
//                   onLike={() => handleLike(project.id, 'projects')}
//                   onSave={() => handleSave(project.id, 'projects')}
//                   onShare={() => handleShare(project.id, 'projects')}
//                 />
//               ))}
//             </div>
//             <div ref={projectsRef} />
//           </Tab.Panel>

//           <Tab.Panel>
//             <div className="grid gap-6 md:grid-cols-2">
//               {notesLoading ? (
//                 Array(4).fill(0).map((_, i) => (
//                   <Skeleton key={i} className="h-[250px] rounded-xl" />
//                 ))
//               ) : filterContent(notes).map((note) => (
//                 <ContentCard
//                   key={note.id}
//                   item={note}
//                   type="notes"
//                   onLike={() => handleLike(note.id, 'notes')}
//                   onSave={() => handleSave(note.id, 'notes')}
//                   onShare={() => handleShare(note.id, 'notes')}
//                 />
//               ))}
//             </div>
//             <div ref={notesRef} />
//           </Tab.Panel>
//         </Tab.Panels>
//       </Tab.Group>

//       {(postsLoadingMore || projectsLoadingMore || notesLoadingMore) && (
//         <div className="flex justify-center py-8">
//           <Skeleton className="h-10 w-40" />
//         </div>
//       )}
//     </div>
//   );
// }