//   "use client";
  
//   // components/UsersList.tsx
//   import { useEffect, useState, useCallback, useRef } from 'react';
//   import { useInView } from 'react-intersection-observer';
//   import debounce from 'lodash/debounce';
//   import { auth, collection, db, doc, getDocs, setDoc, where } from '@/lib/firebase';
//   import { searchUsers, USERS_PER_PAGE } from '@/firebase/users';
//   import  UserCard  from '../Alluser/UserCard';
//   import { useRouter } from 'next/navigation';
//   import { toast } from '@/hooks/use-toast';
// import { query } from 'firebase/database';
// import { Filter, Search, UserIcon } from 'lucide-react';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { FaSpinner } from 'react-icons/fa';
  
//   export default function UsersList() {
//     const router = useRouter();
//     const [users, setUsers] = useState<UserInfo[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [currentUser, setCurrentUser] = useState<any>(null);
//     const [showFilters, setShowFilters] = useState(false);
//     const [filters, setFilters] = useState<FilterOptions>({
//       college: '',
//       course: '',
//       yearOfStudy: '',
//       department: ''
//     });
//     const [hasMore, setHasMore] = useState(true);
//     const lastDocRef = useRef<any>(null);
    
//     // Infinite scroll detection
//     const { ref: loadMoreRef, inView } = useInView();
  
//     // Get current user
//     useEffect(() => {
//       const unsubscribe = auth.onAuthStateChanged((user) => {
//         if (user) {
//           setCurrentUser(user);
//         }
//       });
//       return () => unsubscribe();
//     }, []);
  
//     // Debounced search function
//     const debouncedSearch = useCallback(
//       debounce(async (query: string, filterOptions: FilterOptions) => {
//         try {
//           setLoading(true);
//           const { users: newUsers, lastDoc } = await searchUsers(query, filterOptions);
//           setUsers(newUsers);
//           lastDocRef.current = lastDoc;
//           setHasMore(newUsers.length === USERS_PER_PAGE);
//         } catch (error) {
//           toast({
//             title: "Error",
//             description: "Failed to search users",
//             variant: "destructive",
//           });
//         } finally {
//           setLoading(false);
//         }
//       }, 300),
//       []
//     );
  
//     // Load more users when scrolling
//     const loadMore = useCallback(async () => {
//       if (!hasMore || loading) return;
  
//       try {
//         const { users: newUsers, lastDoc } = await searchUsers(
//           searchQuery,
//           filters,
//           lastDocRef.current
//         );
        
//         setUsers(prev => [...prev, ...newUsers]);
//         lastDocRef.current = lastDoc;
//         setHasMore(newUsers.length === USERS_PER_PAGE);
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to load more users",
//           variant: "destructive",
//         });
//       }
//     }, [searchQuery, filters, hasMore, loading]);
  
//     // Trigger search on filters or query change
//     useEffect(() => {
//       debouncedSearch(searchQuery, filters);
//       return () => {
//         debouncedSearch.cancel();
//       };
//     }, [searchQuery, filters, debouncedSearch]);
  
//     // Load more when scrolling to bottom
//     useEffect(() => {
//       if (inView) {
//         loadMore();
//       }
//     }, [inView, loadMore]);
  
//     const handleStartChat = async (targetUser: UserInfo) => {
//       if (!currentUser || !targetUser) return;
  
//       try {
//         const chatRoomsRef = collection(db, 'chatRooms');
//         const q = query(
//           chatRoomsRef,
//           where('participants', 'array-contains', currentUser.uid)
//         );
        
//         const querySnapshot = await getDocs(q);
//         let existingChatRoom = null;
  
//         querySnapshot.forEach((doc) => {
//           const roomData = doc.data();
//           if (roomData.participants.includes(targetUser.id)) {
//             existingChatRoom = { id: doc.id, ...roomData };
//           }
//         });
  
//         if (existingChatRoom) {
//           router.push(`/chatroom/${existingChatRoom.id}`);
//         } else {
//           const newChatRoomRef = doc(collection(db, 'chatRooms'));
//           await setDoc(newChatRoomRef, {
//             id: newChatRoomRef.id,
//             participants: [currentUser.uid, targetUser.id],
//             participantsInfo: [
//               {
//                 id: currentUser.uid,
//                 name: currentUser.displayName,
//                 photoURL: currentUser.photoURL
//               },
//               {
//                 id: targetUser.id,
//                 name: targetUser.name,
//                 photoURL: targetUser.photoURL
//               }
//             ],
//             createdAt: Date.now(),
//             updatedAt: Date.now(),
//             lastMessage: null,
//             unreadCount: 0
//           });
          
//           router.push(`/chatroom/${newChatRoomRef.id}`);
//         }
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to start chat",
//           variant: "destructive",
//         });
//       }
//     };
  
//     return (
//       <div className="w-full max-w-4xl mx-auto">
//         {/* Current User Card */}
//         {currentUser && (
//           <div className="mb-6 p-4 bg-primary/5 rounded-lg">
//             <UserCard
//               user={users.find(u => u.email === currentUser.email) || {
//                 id: currentUser.uid,
//                 name: currentUser.displayName,
//                 email: currentUser.email,
//                 photoURL: currentUser.photoURL,
//                 college: 'Loading...'
//               }}
//               isCurrentUser={true}
//               onStartChat={() => {}}
//             />
//           </div>
//         )}
  
//         {/* Search and Filters */}
//         <div className="sticky top-0 bg-white/80 backdrop-blur-sm p-4 space-y-4 z-10 rounded-lg shadow-sm">
//           <div className="flex gap-2">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search by name, college, or skills..."
//                 className="w-full pl-9"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setShowFilters(!showFilters)}
//               className={showFilters ? 'bg-primary/10' : ''}
//             >
//               <Filter className="h-4 w-4" />
//             </Button>
//           </div>
  
//           <FilterPanel
//             show={showFilters}
//             filters={filters}
//             setFilters={setFilters}
//             users={users}
//           />
//         </div>
  
//         {/* Users Grid */}
//         <div className="p-4">
//           {loading && users.length === 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {[...Array(6)].map((_, i) => (
//                 <UserCardSkeleton key={i} />
//               ))}
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {users.map((user) => (
//                   <UserCard
//                     key={user.id}
//                     user={user}
//                     isCurrentUser={user.email === currentUser?.email}
//                     onStartChat={handleStartChat}
//                   />
//                 ))}
//               </div>
              
//               {/* Load More Trigger */}
//               {hasMore && (
//                 <div ref={loadMoreRef} className="py-4">
//                   <div className="flex justify-center">
//                     <FaSpinner className="h-6 w-6 text-primary" />
//                   </div>
//                 </div>
//               )}
  
//               {/* Empty State */}
//               {users.length === 0 && !loading && (
//                 <div className="text-center py-12">
//                   <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
//                   <h3 className="mt-4 text-lg font-medium text-gray-900">No users found</h3>
//                   <p className="mt-2 text-sm text-gray-500">
//                     Try adjusting your search or filters
//                   </p>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     );
//   }
//   // components/UserCardSkeleton.tsx (continued)
// const UserCardSkeleton = () => (
//     <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
//       <div className="flex items-start gap-4">
//         <div className="h-12 w-12 rounded-full bg-gray-200" />
//         <div className="flex-1">
//           <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
//           <div className="h-3 w-1/2 bg-gray-200 rounded mb-2" />
//           <div className="h-3 w-1/4 bg-gray-200 rounded" />
//           <div className="flex gap-2 mt-3">
//             <div className="h-5 w-16 bg-gray-200 rounded-full" />
//             <div className="h-5 w-16 bg-gray-200 rounded-full" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  