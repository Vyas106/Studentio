// // "use client";

// // import React, { useEffect, useState } from 'react'
// // import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // import { Button } from '@/components/ui/button';
// // import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
// // import { db } from '@/lib/firebase';
// // import { Avatar } from '@radix-ui/react-avatar';
// // import { ScrollArea } from '@radix-ui/react-scroll-area';
// // import { collection, getDocs, limit, query } from 'firebase/firestore';
// // import { ChevronRight, Plus } from 'lucide-react';

// // interface UserInfo {
// //     name: string;
// //     college: string;
// //     course?: string;
// //     email: string;
// //     enrollment?: string;
// //     semester?: string;
// //     skills?: string[];
// //     photoURL?: string;
// //   }
  
// //   const UsersList = () => {
// //     const [users, setUsers] = useState<UserInfo[]>([]);
// //     const [loading, setLoading] = useState(true);
  
// //     useEffect(() => {
// //       const fetchUsers = async () => {
// //         try {
// //           const usersQuery = query(collection(db, "users"), limit(10));
// //           const usersSnapshot = await getDocs(usersQuery);
// //           const usersData: UserInfo[] = usersSnapshot.docs.map(doc => ({
// //             id: doc.id,
// //             ...(doc.data() as UserInfo)  // Explicitly assert the type
// //           }));
          
// //           setUsers(usersData);
// //         } catch (error) {
// //           console.error("Error fetching users:", error);
// //         } finally {
// //           setLoading(false);
// //         }
// //       };
// //       fetchUsers();
// //     }, []);
  
// //     if (loading) {
// //       return <div className="p-4">Loading users...</div>;
// //     }
  
// //     return (
// //       <ScrollArea className="h-[calc(100vh-80px)]">
// //         <div className="space-y-4 p-4">
// //           {users.map((user, index) => (
// //             <div
// //               key={index}
// //               className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
// //             >
// //               <Avatar className="h-10 w-10 border">
// //                 {user.photoURL ? (
// //                   <AvatarImage src={user.photoURL} alt={user.name} />
// //                 ) : (
// //                   <AvatarFallback className="bg-primary/10">
// //                     {user.name?.charAt(0)?.toUpperCase()}
// //                   </AvatarFallback>
// //                 )}
// //               </Avatar>
// //               <div className="flex-1 min-w-0">
// //                 <p className="font-medium truncate">{user.name}</p>
// //                 <p className="text-sm text-gray-500 truncate">{user.college}</p>
// //               </div>
// //               <Button variant="ghost" size="icon">
// //                 <ChevronRight className="h-4 w-4 text-gray-400" />
// //               </Button>
// //             </div>
// //           ))}
// //         </div>
// //       </ScrollArea>
// //     );
// //   };
  

// // // const page = () => {
// // //   return (
// // //     <div>
// // //        <Sheet>
// // //                 <SheetTrigger asChild>
// // //                   <Button variant="outline" size="icon">
// // //                     <Plus className="h-4 w-4" />
// // //                   </Button>
// // //                 </SheetTrigger>
// // //                 <SheetContent side="right" className="w-full sm:w-[400px] p-0">
// // //                   <SheetHeader className="p-4 border-b">
// // //                     <SheetTitle>Students</SheetTitle>
// // //                   </SheetHeader>
// // //                   <UsersList />
// // //                 </SheetContent>
// // //               </Sheet>
// // //     </div>
// // //   )
// // // }

// // // export default page

// "use client";

// import React, { useEffect, useState } from 'react';
// import { auth, db } from '@/lib/firebase';
// import { collection, getDocs, query, limit } from 'firebase/firestore';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
// import { Search, ChevronRight } from 'lucide-react';
// import Link from 'next/link';

// interface UserInfo {
//   id: string;
//   name: string;
//   college: string;
//   course?: string;
//   email: string;
//   enrollment?: string;
//   semester?: string;
//   skills?: string[];
//   photoURL?: string;
// }

// const UsersList = () => {
//   const [users, setUsers] = useState<UserInfo[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentUser, setCurrentUser] = useState<string | null>(null);

//   // Get current user's email
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user?.email) {
//         setCurrentUser(user.email);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   // Fetch users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersQuery = query(collection(db, "users"), limit(20));
//         const snapshot = await getDocs(usersQuery);
//         // const usersData = snapshot.docs.map(doc => ({
//         //   id: doc.id,
//         //   ...doc.data() as UserInfo
//         // }));

//         const usersData = snapshot.docs.map(doc => {
//             const { id, ...data } = doc.data() as UserInfo; // Destructure to remove `id`
//             return {
//               id: doc.id,
//               ...data
//             };
//           });
          

//         setUsers(usersData);
//         setFilteredUsers(usersData);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);


//   interface Experience {
//     company: string;
//     position: string;
//     startDate: string;
//     endDate?: string;
//     description: string;
//     skills: string[];
//   }
  
//   interface Education {
//     institution: string;
//     degree: string;
//     field: string;
//     startYear: string;
//     endYear?: string;
//     description?: string;
//   }
  
//   interface Project {
//     title: string;
//     description: string;
//     url?: string;
//     technologies: string[];
//     image?: string;
//   }
  
//   interface UserProfile {
//     uid: string;
//     name: string;
//     email: string;
//     bio?: string;
//     photoURL?: string;
//     college?: string;
//     currentPosition?: string;
//     location?: string;
//     website?: string;
//     skills: string[];
//     experience: Experience[];
//     education: Education[];
//     projects: Project[];
//     certifications: string[];
//     socialLinks: {
//       linkedin?: string;
//       github?: string;
//       twitter?: string;
//     };
//     followers: string[];
//     following: string[];
//     endorsements: Record<string, string[]>;
//   }  


//   const handleStartChat = async () => {
//     if (!currentUser || !profile) return;

//     try {
//       // Check for existing chat room
//       const chatRoomsRef = collection(db, 'chatRooms');
//       const q = query(
//         chatRoomsRef,
//         where('participants', 'array-contains', currentUser.uid)
//       );
      
//       const querySnapshot = await getDocs(q);
//       let existingChatRoom = null;

//       querySnapshot.forEach((doc) => {
//         const roomData = doc.data();
//         if (roomData.participants.includes(profile.uid)) {
//           existingChatRoom = { id: doc.id, ...roomData };
//         }
//       });

//       if (existingChatRoom) {
//         router.push(`/chatroom/${existingChatRoom.id}`);
//       } else {
//         // Create new chat room
//         const newChatRoomRef = doc(collection(db, 'chatRooms'));
//         const chatRoomData = {
//           id: newChatRoomRef.id,
//           participants: [currentUser.uid, profile.uid],
//           participantsInfo: [
//             {
//               id: currentUser.uid,
//               name: currentUser.displayName,
//               photoURL: currentUser.photoURL
//             },
//             {
//               id: profile.uid,
//               name: profile.name,
//               photoURL: profile.photoURL
//             }
//           ],
//           createdAt: Date.now(),
//           updatedAt: Date.now(),
//           lastMessage: null,
//           unreadCount: 0
//         };

//         await setDoc(newChatRoomRef, chatRoomData);
//         router.push(`/chatroom/${newChatRoomRef.id}`);
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to start chat",
//         variant: "destructive",
//       });
//     }
//   };


//   // Handle search
//   useEffect(() => {
//     const filtered = users.filter(user => 
//       user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.college?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   }, [searchQuery, users]);

//   if (loading) {
//     return (
//       <div className="p-4 flex items-center justify-center min-h-screen">
//         <div className="text-gray-500">Loading users...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-3xl mx-auto">
//       {/* Search Bar */}
//       <div className="sticky top-0 bg-white p-4 border-b">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <Input
//             placeholder="Search users..."
//             className="w-full pl-9"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Users List */}
//       <div className="divide-y">
//         {filteredUsers.map((user) => (
//           <Sheet key={user.id}>
//             <SheetTrigger className="w-full">
//               <div className="flex items-center gap-3 p-4 hover:bg-gray-50 w-full text-left">
//                 <Avatar className="h-10 w-10 flex-shrink-0">
//                   {user.photoURL ? (
//                     <AvatarImage src={user.photoURL} alt={user.name} />
//                   ) : (
//                     <AvatarFallback className="bg-primary/10">
//                       {user.name?.charAt(0)?.toUpperCase()}
//                     </AvatarFallback>
//                   )}
//                 </Avatar>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2">
//                     <p className="font-medium truncate">{user.name}</p>
//                     {user.email === currentUser && (
//                       <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
//                         You
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-500 truncate">{user.college}</p>
//                 </div>
//                 <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
//               </div>
//             </SheetTrigger>
            
//             <SheetContent side="bottom" className="h-[80vh] sm:h-full sm:max-w-md">
//               <SheetHeader>
//                 <SheetTitle>User Profile</SheetTitle>
//               </SheetHeader>
              
//               <div className="mt-6 space-y-6">
//                 {/* Profile Header */}
//                 <div className="flex items-center gap-4">
//                   <Avatar className="h-16 w-16">
//                     {user.photoURL ? (
//                       <AvatarImage src={user.photoURL} alt={user.name} />
//                     ) : (
//                       <AvatarFallback className="bg-primary/10 text-xl">
//                         {user.name?.charAt(0)?.toUpperCase()}
//                       </AvatarFallback>
//                     )}
//                   </Avatar>
//                   <div>
//                     <h3 className="font-semibold text-lg">{user.name}</h3>
//                     <p className="text-gray-500">{user.email}</p>
//                   </div>
//                 </div>

//                 {/* Profile Details */}
//                 <div className="space-y-4">
//                   <div>
//                     <label className="text-sm font-medium text-gray-500">College</label>
//                     <p className="mt-1">{user.college}</p>
//                   </div>
                  
//                   {user.course && (
//                     <div>
//                       <label className="text-sm font-medium text-gray-500">Course</label>
//                       <p className="mt-1">{user.course}</p>
//                     </div>
//                   )}
                  
//                   {user.semester && (
//                     <div>
//                       <label className="text-sm font-medium text-gray-500">Semester</label>
//                       <p className="mt-1">{user.semester}</p>
//                     </div>
//                   )}
                  
//                   {user.enrollment && (
//                     <div>
//                       <label className="text-sm font-medium text-gray-500">Enrollment</label>
//                       <p className="mt-1">{user.enrollment}</p>
//                     </div>
//                   )}
                  
//                   {user.skills && user.skills.length > 0 && (
//                     <div>
//                       <label className="text-sm font-medium text-gray-500">Skills</label>
//                       <div className="mt-2 flex flex-wrap gap-2">
//                         {user.skills.map((skill, index) => (
//                           <span
//                             key={index}
//                             className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="flex justify-end mt-5  ">

//                   <Link href={`/profile/${user.id}`}>Open Profile</Link>
//                   <Button onClick={handleStartChat}>Start Chat</Button>
//                   </div>


                 

//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UsersList;






"use client";

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, query, limit, where, doc, setDoc } from 'firebase/firestore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Search, ChevronRight, Filter, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { useRouter as useNavigationRouter } from 'next/navigation';
import Link from 'next/link';

interface UserInfo {
  id: string;
  name: string;
  college: string;
  course?: string;
  email: string;
  enrollment?: string;
  semester?: string;
  skills?: string[];
  photoURL?: string;
  yearOfStudy?: string;
  department?: string;
}

interface FilterOptions {
  college: string;
  course: string;
  yearOfStudy: string;
  department: string;
}

interface CurrentUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

const UsersList = () => {
  const router = useNavigationRouter();
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    college: '',
    course: '',
    yearOfStudy: '',
    department: ''
  });

  // Get unique filter options from users
  const filterOptions = {
    colleges: Array.from(new Set(users.map(user => user.college))),
    courses: Array.from(new Set(users.map(user => user.course).filter(Boolean))),
    yearOfStudy: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    departments: Array.from(new Set(users.map(user => user.department).filter(Boolean)))
  };

  // Get current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          displayName: user.displayName || "Unknown User",
          email: user.email || "No Email",
          photoURL: user.photoURL || "default-avatar-url",
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersQuery = query(collection(db, "users"), limit(50));
        const snapshot = await getDocs(usersQuery);
        const usersData = snapshot.docs.map(doc => {
          const { id, ...data } = doc.data() as UserInfo; // Remove `id` if it exists
          return {
            id: doc.id, // Always use Firestore's document ID
            ...data
          };
        });
        
        
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = users;

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.college?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply filters
    if (filters.college) {
      filtered = filtered.filter(user => user.college === filters.college);
    }
    if (filters.course) {
      filtered = filtered.filter(user => user.course === filters.course);
    }
    if (filters.yearOfStudy) {
      filtered = filtered.filter(user => user.yearOfStudy === filters.yearOfStudy);
    }
    if (filters.department) {
      filtered = filtered.filter(user => user.department === filters.department);
    }

    setFilteredUsers(filtered);
  }, [searchQuery, filters, users]);

  // const handleStartChat = async (targetUser: UserInfo) => {
  //   if (!currentUser || !targetUser) return;

  //   try {
  //     // Check for existing chat room
  //     const chatRoomsRef = collection(db, 'chatRooms');
  //     const q = query(
  //       chatRoomsRef,
  //       where('participants', 'array-contains', currentUser.uid)
  //     );
      
  //     const querySnapshot = await getDocs(q);
  //     let existingChatRoom = null;

  //     querySnapshot.forEach((doc) => {
  //       const roomData = doc.data();
  //       if (roomData.participants.includes(targetUser.id)) {
  //         existingChatRoom = { id: doc.id, ...roomData };
  //       }
  //     });

  //     if (existingChatRoom) {
  //       // router.push(`/chatroom/${existingChatRoom.id}`);
  //       router.push(`/chatroom/${(existingChatRoom as { id: string }).id}`);

  //     } else {
  //       // Create new chat room
  //       const newChatRoomRef = doc(collection(db, 'chatRooms'));
  //       const chatRoomData = {
  //         id: newChatRoomRef.id,
  //         participants: [currentUser.uid, targetUser.id],
  //         participantsInfo: [
  //           {
  //             id: currentUser.uid,
  //             name: currentUser.displayName,
  //             photoURL: currentUser.photoURL
  //           },
  //           {
  //             id: targetUser.id,
  //             name: targetUser.name,
  //             photoURL: targetUser.photoURL
  //           }
  //         ],
  //         createdAt: Date.now(),
  //         updatedAt: Date.now(),
  //         lastMessage: null,
  //         unreadCount: 0
  //       };

  //       await setDoc(newChatRoomRef, chatRoomData);
  //       router.push(`/chatroom/${newChatRoomRef.id}`);
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to start chat",
  //       variant: "destructive",
  //     });
  //   }
  // };

  const clearFilters = () => {
    setFilters({
      college: '',
      course: '',
      yearOfStudy: '',
      department: ''
    });
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
   <div className="w-full max-w-3xl mx-auto">
  {/* Search and Filter Bar */}
  <div className="sticky top-0 bg-white border shadow-sm rounded-lg p-4 space-y-4 z-10">
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search users..."
          className="w-full pl-9 bg-slate-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowFilters(!showFilters)}
        className={showFilters ? 'bg-primary/10' : ''}
      >
        <Filter className="h-4 w-4" />
      </Button>
    </div>

    {/* Filters */}
    {showFilters && (
      <div className="space-y-4 p-4 bg-slate-50 rounded-lg border">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Filters</h3>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            value={filters.college}
            onValueChange={(value) => setFilters(prev => ({ ...prev, college: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select College" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.colleges.map((college) => (
                <SelectItem key={college} value={college}>
                  {college}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.course}
            onValueChange={(value) => setFilters(prev => ({ ...prev, course: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.courses.map((course) => (
                <SelectItem key={course ?? "default"} value={course ?? "default"}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.yearOfStudy}
            onValueChange={(value) => setFilters(prev => ({ ...prev, yearOfStudy: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Year of Study" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.yearOfStudy.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.department}
            onValueChange={(value) => setFilters(prev => ({ ...prev, department: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.departments.map((dept) => (
                <SelectItem key={dept ?? "default"} value={dept ?? "default"}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active filters */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => 
            value ? (
              <Badge key={key} variant="secondary" className="px-2 py-1">
                {value}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer hover:text-red-500 transition-colors"
                  onClick={() => setFilters(prev => ({ ...prev, [key]: '' }))}
                />
              </Badge>
            ) : null
          )}
        </div>
      </div>
    )}
  </div>

  {/* Users List */}
  <ScrollArea className="h-[calc(100vh-180px)]">
    <div className="divide-y">
      {filteredUsers.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No users found matching your criteria
        </div>
      ) : (
        filteredUsers.map((user) => (
          <Link key={user.id} href={`/profile/${user.id}`}>
            <Sheet>
              <SheetTrigger className="w-full border-none">
                <div className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors w-full text-left">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    {user.photoURL ? (
                      <AvatarImage src={user.photoURL} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-primary/10">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{user.name}</p>
                      {user.email === currentUser?.email && (
                        <Badge variant="secondary">You</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{user.college}</p>
                    {user.course && (
                      <p className="text-xs text-gray-400 truncate">{user.course}</p>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>
              </SheetTrigger>
            </Sheet>
          </Link>
        ))
      )}
    </div>
  </ScrollArea>
</div>
  );
};

export default UsersList;