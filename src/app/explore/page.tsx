// "use client";
// // pages/explore.tsx
// import { useState, useEffect } from 'react';
// import { Tab } from '@headlessui/react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { LoadingSpinner } from '@/components/LoadingSpinner';
// import { collection, query, where, orderBy, limit, getDocs } from '@/lib/firebase';
// import type { Post, Project, Note } from '../../../types/user';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// export default function Page() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);

//   useEffect(() => {
//     fetchContent();
//   }, []);

//   const fetchContent = async () => {
//     setLoading(true);
//     try {
//       // Fetch public posts
//       const postsQuery = query(
//         collection(db, 'posts'),
//         orderBy('createdAt', 'desc'),
//         limit(20)
//       );
//       const postsSnap = await getDocs(postsQuery);
//       const postsData = postsSnap.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Post[];
//       setPosts(postsData);

//       // Fetch public projects
//       const projectsQuery = query(
//         collection(db, 'projects'),
//         orderBy('createdAt', 'desc'),
//         limit(20)
//       );
//       const projectsSnap = await getDocs(projectsQuery);
//       const projectsData = projectsSnap.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Project[];
//       setProjects(projectsData);

//       // Fetch public notes
//       const notesQuery = query(
//         collection(db, 'notes'),
//         where('isPublic', '==', true),
//         orderBy('createdAt', 'desc'),
//         limit(20)
//       );
//       const notesSnap = await getDocs(notesQuery);
//       const notesData = notesSnap.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Note[];
//       setNotes(notesData);
//     } catch (error) {
//       console.error('Error fetching content:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterContent = (content: any[]) => {
//     return content.filter(item => {
//       const matchesSearch = searchQuery === '' || 
//         item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.description?.toLowerCase().includes(searchQuery.toLowerCase());

//         const matchesTags = selectedTags.length === 0 ||
//           (item.tags && selectedTags.some(tag => item.tags.includes(tag)));
  
//         return matchesSearch && matchesTags;
//       });
//     };
  
//     const getAllTags = () => {
//       const tagsSet = new Set<string>();
//       [...projects, ...notes].forEach(item => {
//         item.tags?.forEach(tag => tagsSet.add(tag));
//       });
//       return Array.from(tagsSet);
//     };
  
//     return (
//       <div className="max-w-6xl mx-auto p-4 space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Explore</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <Input
//                 placeholder="Search content..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <div className="flex flex-wrap gap-2">
//                 {getAllTags().map(tag => (
//                   <Button
//                     key={tag}
//                     variant={selectedTags.includes(tag) ? "default" : "outline"}
//                     size="sm"
//                     onClick={() => {
//                       setSelectedTags(prev =>
//                         prev.includes(tag)
//                           ? prev.filter(t => t !== tag)
//                           : [...prev, tag]
//                       );
//                     }}
//                   >
//                     #{tag}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
  
//         {loading ? (
//           <div className="flex justify-center p-12">
//             <LoadingSpinner />
//           </div>
//         ) : (
//           <Tab.Group>
//             <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
//               <Tab className={({ selected }) =>
//                 `w-full rounded-lg py-2.5 text-sm font-medium leading-5
//                 ${selected
//                   ? 'bg-white text-blue-700 shadow'
//                   : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
//                 }`
//               }>
//                 Posts
//               </Tab>
//               <Tab className={({ selected }) =>
//                 `w-full rounded-lg py-2.5 text-sm font-medium leading-5
//                 ${selected
//                   ? 'bg-white text-blue-700 shadow'
//                   : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
//                 }`
//               }>
//                 Projects
//               </Tab>
//               <Tab className={({ selected }) =>
//                 `w-full rounded-lg py-2.5 text-sm font-medium leading-5
//                 ${selected
//                   ? 'bg-white text-blue-700 shadow'
//                   : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
//                 }`
//               }>
//                 Notes
//               </Tab>
//             </Tab.List>
  
//             <Tab.Panels className="mt-4">
//               <Tab.Panel>
//                 <div className="space-y-4">
//                   {filterContent(posts).map((post) => (
//                     <PostCard
//                       key={post.id}
//                       post={post}
//                       onLike={handleLikePost}
//                       onComment={handleAddComment}
//                     />
//                   ))}
//                 </div>
//               </Tab.Panel>
  
//               <Tab.Panel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {filterContent(projects).map((project) => (
//                     <ProjectCard
//                       key={project.id}
//                       project={project}
//                     />
//                   ))}
//                 </div>
//               </Tab.Panel>
  
//               <Tab.Panel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {filterContent(notes).map((note) => (
//                     <NoteCard
//                       key={note.id}
//                       note={note}
//                     />
//                   ))}
//                 </div>
//               </Tab.Panel>
//             </Tab.Panels>
//           </Tab.Group>
//         )}
//       </div>
//     );
//   }
  
//   // Card components for each content type
//   interface PostCardProps {
//     post: Post;
//     onLike: (postId: string) => Promise<void>;
//     onComment: (postId: string, comment: string) => Promise<void>;
//   }
  
//   function PostCard({ post, onLike, onComment }: PostCardProps) {
//     const [comment, setComment] = useState('');
  
//     return (
//       <Card>
//         <CardContent className="p-4 space-y-4">
//           <div className="flex items-center gap-2">
//             <Avatar>
//               <AvatarImage src={post.userPhotoURL} />
//               <AvatarFallback>{post.userName?.[0]}</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-medium">{post.userName}</p>
//               <p className="text-sm text-gray-500">
//                 {new Date(post.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
  
//           <p className="whitespace-pre-wrap">{post.content}</p>
//           {post.imageUrl && (
//             <img
//               src={post.imageUrl}
//               alt="Post attachment"
//               className="rounded-lg max-h-96 w-full object-cover"
//             />
//           )}
  
//           <div className="flex items-center gap-4">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => onLike(post.id)}
//             >
//               👍 {post.likes}
//             </Button>
//             <Button
//               variant="ghost"
//               size="sm"
//             >
//               💬 {post.comments?.length || 0}
//             </Button>
//           </div>
  
//           <div className="space-y-2">
//             {post.comments?.map(({comment}:any) => (
//               <div key={comment.id} className="bg-gray-50 p-2 rounded">
//                 <p className="text-sm font-medium">{comment.userName}</p>
//                 <p className="text-sm">{comment.content}</p>
//               </div>
//             ))}
//           </div>
  
//           <div className="flex gap-2">
//             <Input
//               placeholder="Add a comment..."
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//             />
//             <Button
//               onClick={() => {
//                 onComment(post.id, comment);
//                 setComment('');
//               }}
//               disabled={!comment.trim()}
//             >
//               Post
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }
  
//   function ProjectCard({ project }: { project: Project }) {
//     return (
//       <Card>
//         <CardContent className="p-4 space-y-4">
//           {project.imageUrl && (
//             <img
//               src={project.imageUrl}
//               alt={project.title}
//               className="rounded-lg h-48 w-full object-cover"
//             />
//           )}
//           <h3 className="text-xl font-semibold">{project.title}</h3>
//           <p className="text-gray-600">{project.description}</p>
//           <div className="flex flex-wrap gap-2">
//             {project.tags?.map((tag) => (
//               <span
//                 key={tag}
//                 className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//           {project.projectUrl && (
//             <Button
//               variant="outline"
//               onClick={() => window.open(project.projectUrl, '_blank')}
//             >
//               View Project
//             </Button>
//           )}
//         </CardContent>
//       </Card>
//     );
//   }
  
//   function NoteCard({ note }: { note: Note }) {
//     return (
//       <Card>
//         <CardContent className="p-4 space-y-4">
//           <h3 className="text-xl font-semibold">{note.title}</h3>
//           <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
//           <div className="flex flex-wrap gap-2">
//             {note.tags?.map((tag) => (
//               <span
//                 key={tag}
//                 className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }
  
//   // export default ExplorePage;

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Tab } from '@headlessui/react';
import { useInView } from 'react-intersection-observer';
import { FiHeart, FiMessageSquare, FiShare2, FiBookmark, FiGithub, FiLink, FiDownload } from 'react-icons/fi';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { collection, query, where, orderBy, limit, startAfter, getDocs } from '@/lib/firebase';
import type { Post, Project, Note, UserProfile } from '../../../types/user';
import { db } from '@/lib/firebase';

const ITEMS_PER_PAGE = 12;

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [users, setUsers] = useState<Record<string, UserProfile>>({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [lastDoc, setLastDoc] = useState<Record<string, any>>({});

  const { ref: loadMoreRef, inView } = useInView();

  const fetchUsers = async (userIds: string[]) => {
    const uniqueIds = [...new Set(userIds)];
    const newUsers: Record<string, UserProfile> = {};
    
    for (const id of uniqueIds) {
      if (!users[id]) {
        const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', id)));
        if (!userDoc.empty) {
          newUsers[id] = userDoc.docs[0].data() as UserProfile;
        }
      }
    }
    
    setUsers(prev => ({ ...prev, ...newUsers }));
  };

  const fetchContent = async (type: 'posts' | 'projects' | 'notes', isInitial = false) => {
    try {
      const collectionRef = collection(db, type);
      let q = query(
        collectionRef,
        orderBy('createdAt', 'desc'),
        limit(ITEMS_PER_PAGE)
      );

      if (!isInitial && lastDoc[type]) {
        q = query(q, startAfter(lastDoc[type]));
      }

      const snapshot = await getDocs(q);
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fetch user data for new items
      const userIds = items.map(item => item.userId);
      await fetchUsers(userIds);

      setLastDoc(prev => ({ ...prev, [type]: lastVisible }));

      return items;
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      toast({
        title: "Error",
        description: `Failed to fetch ${type}. Please try again later.`,
        variant: "destructive"
      });
      return [];
    }
  };

  const loadMoreContent = async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    const type = ['posts', 'projects', 'notes'][activeTab];
    const newItems = await fetchContent(type as 'posts' | 'projects' | 'notes');
    
    switch (activeTab) {
      case 0:
        setPosts(prev => [...prev, ...newItems as Post[]]);
        break;
      case 1:
        setProjects(prev => [...prev, ...newItems as Project[]]);
        break;
      case 2:
        setNotes(prev => [...prev, ...newItems as Note[]]);
        break;
    }
    
    setLoadingMore(false);
  };

  useEffect(() => {
    const initializeContent = async () => {
      setLoading(true);
      const [postsData, projectsData, notesData] = await Promise.all([
        fetchContent('posts', true),
        fetchContent('projects', true),
        fetchContent('notes', true)
      ]);
      
      setPosts(postsData as Post[]);
      setProjects(projectsData as Project[]);
      setNotes(notesData as Note[]);
      setLoading(false);
    };

    initializeContent();
  }, []);

  useEffect(() => {
    if (inView && !loading && !loadingMore) {
      loadMoreContent();
    }
  }, [inView]);

  const handleLike = async (itemId: string, type: 'posts' | 'projects' | 'notes') => {
    // Implement like functionality
  };

  const handleSave = async (itemId: string, type: 'posts' | 'projects' | 'notes') => {
    // Implement save functionality
  };

  const handleShare = async (itemId: string, type: 'posts' | 'projects' | 'notes') => {
    // Implement share functionality
  };

  const filterContent = (content: any[]) => {
    return content.filter(item => {
      const matchesSearch = !searchQuery || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags = selectedTags.length === 0 ||
        (item.tags && selectedTags.some(tag => item.tags.includes(tag)));

      return matchesSearch && matchesTags;
    });
  };

  const getAllTags = () => {
    const tagsSet = new Set<string>();
    [...posts, ...projects, ...notes].forEach(item => {
      item.tags?.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  };

  const ContentCard = ({ item, type }: { item: Post | Project | Note; type: string }) => {
    const user = users[item.userId];
    const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.photoURL} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
          </div>

          {'imageUrl' in item && item.imageUrl && (
            <div className="relative h-48 mb-4">
              <img
                src={item.imageUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          )}

          {'title' in item && (
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          )}

          <p className="text-gray-700 mb-4">
            {'content' in item ? item.content : item.description}
          </p>

          {item.tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(item.id, type as any)}
              >
                <FiHeart className="mr-2" />
                {('likes' in item) && item.likes?.length || 0}
              </Button>
              
              {'content' in item && (
                <Button variant="ghost" size="sm">
                  <FiMessageSquare className="mr-2" />
                  {item.comments?.length || 0}
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare(item.id, type as any)}
              >
                <FiShare2 />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSave(item.id, type as any)}
              >
                <FiBookmark />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Explore</h1>
        
        <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
          <Input
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          
          <div className="flex flex-wrap gap-2">
            {getAllTags().map(tag => (
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
      </div>

      <Tab.Group onChange={setActiveTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
          {['Posts', 'Projects', 'Notes'].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
                ${selected
                  ? 'bg-white text-blue-600 shadow'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
                }`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <div className="grid gap-6 md:grid-cols-2">
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[400px] rounded-xl" />
                ))
              ) : (
                filterContent(posts).map((post) => (
                  <ContentCard key={post.id} item={post} type="posts" />
                ))
              )}
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[300px] rounded-xl" />
                ))
              ) : (
                filterContent(projects).map((project) => (
                  <ContentCard key={project.id} item={project} type="projects" />
                ))
              )}
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="grid gap-6 md:grid-cols-2">
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[250px] rounded-xl" />
                ))
              ) : (
                filterContent(notes).map((note) => (
                  <ContentCard key={note.id} item={note} type="notes" />
                ))
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {!loading && (
        <div ref={loadMoreRef} className="py-8 text-center">
          {loadingMore ? (
            <div className="flex justify-center">
              <Skeleton className="h-10 w-40" />
            </div>
          ) : (
            <Button variant="outline" onClick={loadMoreContent}>
              Load More
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// export default ExplorePage;  