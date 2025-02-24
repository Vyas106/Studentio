// "use client";

// // components/UsersList.tsx
// import { useEffect, useState, useCallback, useRef } from 'react';
// import { useInView } from 'react-intersection-observer';
// import debounce from 'lodash/debounce';
// import { auth } from '@/lib/firebase';
// import { searchUsers, USERS_PER_PAGE } from '@/firebase/users';
// import  UserCard  from '@/components/Alluser/UserCard';
// import { useRouter } from 'next/navigation';
// import { toast } from '@/hooks/use-toast';
// import { Search, Filter, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useSearchParams } from 'next/navigation';
// import FilterPanel from '@/components/Alluser/FilterPanel';

// export default function UsersList() {
//   // Use searchParams to handle SSR properly
//   const searchParams = useSearchParams();
//   const router = useRouter();
  
//   // Client-side state
//   const [mounted, setMounted] = useState(false);
//   const [users, setUsers] = useState<UserInfo[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const lastDocRef = useRef<any>(null);
  
//   // Initialize search and filters from URL params
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filters, setFilters] = useState<FilterOptions>({
//     college: '',
//     course: '',
//     yearOfStudy: '',
//     department: ''
//   });

//   // Handle hydration properly
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Initialize from URL params after mount
//   useEffect(() => {
//     if (mounted) {
//       const query = searchParams.get('q') || '';
//       setSearchQuery(query);
      
//       setFilters({
//         college: searchParams.get('college') || '',
//         course: searchParams.get('course') || '',
//         yearOfStudy: searchParams.get('year') || '',
//         department: searchParams.get('dept') || ''
//       });
//     }
//   }, [mounted, searchParams]);

//   // Infinite scroll setup
//   const { ref: loadMoreRef, inView } = useInView({
//     threshold: 0.5,
//     skip: !mounted
//   });

//   // Get current user
//   useEffect(() => {
//     if (!mounted) return;

//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setCurrentUser(user);
//       }
//     });
//     return () => unsubscribe();
//   }, [mounted]);

//   // Debounced search function
//   const debouncedSearch = useCallback(
//     debounce(async (query: string, filterOptions: FilterOptions) => {
//       if (!mounted) return;

//       try {
//         setLoading(true);
//         const { users: newUsers, lastDoc } = await searchUsers(query, filterOptions);
//         setUsers(newUsers);
//         lastDocRef.current = lastDoc;
//         setHasMore(newUsers.length === USERS_PER_PAGE);
//       } catch (error) {
//         console.error('Search error:', error);
//         toast({
//           title: "Error",
//           description: "Failed to search users",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     }, 300),
//     [mounted]
//   );

//   // Update URL with search params
//   const updateSearchParams = useCallback((query: string, filterOptions: FilterOptions) => {
//     if (!mounted) return;

//     const params = new URLSearchParams();
//     if (query) params.set('q', query);
//     if (filterOptions.college) params.set('college', filterOptions.college);
//     if (filterOptions.course) params.set('course', filterOptions.course);
//     if (filterOptions.yearOfStudy) params.set('year', filterOptions.yearOfStudy);
//     if (filterOptions.department) params.set('dept', filterOptions.department);

//     const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
//     router.push(newUrl, { scroll: false });
//   }, [mounted, router]);

//   // Handle search input change
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newQuery = e.target.value;
//     setSearchQuery(newQuery);
//     updateSearchParams(newQuery, filters);
//   };

//   // Handle filter changes
//   const handleFilterChange = (newFilters: FilterOptions) => {
//     setFilters(newFilters);
//     updateSearchParams(searchQuery, newFilters);
//   };

//   // Load more users when scrolling
//   const loadMore = useCallback(async () => {
//     if (!hasMore || loading || !mounted) return;

//     try {
//       const { users: newUsers, lastDoc } = await searchUsers(
//         searchQuery,
//         filters,
//         lastDocRef.current
//       );
      
//       setUsers(prev => [...prev, ...newUsers]);
//       lastDocRef.current = lastDoc;
//       setHasMore(newUsers.length === USERS_PER_PAGE);
//     } catch (error) {
//       console.error('Load more error:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load more users",
//         variant: "destructive",
//       });
//     }
//   }, [searchQuery, filters, hasMore, loading, mounted]);

//   // Trigger search on filters or query change
//   useEffect(() => {
//     if (!mounted) return;
//     debouncedSearch(searchQuery, filters);
//     return () => {
//       debouncedSearch.cancel();
//     };
//   }, [searchQuery, filters, debouncedSearch, mounted]);

//   // Load more when scrolling to bottom
//   useEffect(() => {
//     if (inView && mounted) {
//       loadMore();
//     }
//   }, [inView, loadMore, mounted]);

//   // Don't render anything until client-side hydration is complete
//   if (!mounted) {
//     return null;
//   }

//   return (
//     <div className="w-full max-w-4xl mx-auto">
//       {/* Search and Filters */}
//       <div className="sticky top-0 bg-white/80 backdrop-blur-sm p-4 space-y-4 z-10 rounded-lg shadow-sm">
//         <div className="flex gap-2">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search by name, college, or skills..."
//               className="w-full pl-9"
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//           </div>
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => setShowFilters(!showFilters)}
//             className={showFilters ? 'bg-primary/10' : ''}
//           >
//             <Filter className="h-4 w-4" />
//           </Button>
//         </div>

//         <FilterPanel
//           show={showFilters}
//           filters={filters}
//           setFilters={handleFilterChange}
//           users={users}
//         />
//       </div>

//       {/* Users List */}
//       <UserListContent
//         users={users}
//         loading={loading}
//         hasMore={hasMore}
//         loadMoreRef={loadMoreRef}
//         currentUser={currentUser}
//       />
//     </div>
//   );
// }

// // Separate the content component to better handle loading states
// const UserListContent = ({
//   users,
//   loading,
//   hasMore,
//   loadMoreRef,
//   currentUser
// } : any) => {
//   if (loading && users.length === 0) {
//     // return <LoadingIndicator />;
//   }

//   if (users.length === 0) {
//     // return <EmptyState />;
//   }

//   return (
//     <div className="p-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {users.map((user) => (
//           <UserCard
//             key={user.id}
//             user={user}
//             isCurrentUser={user.email === currentUser?.email}
//             onStartChat={handleStartChat}
//           />
//         ))}
//       </div>
      
//       {hasMore && (
//         <div ref={loadMoreRef} className="py-4">
//           {/* <LoadingIndicator /> */}
//         </div>
//       )}
//     </div>
//   );
// };

// // Add any missing component exports here...