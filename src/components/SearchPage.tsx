
// // // components/SearchPage.tsx
// // "use client";

// // import { useState, useEffect } from "react";
// // import { db, collection, query, where, getDocs } from "@/lib/firebase";
// // import { Input } from "@/components/ui/input";
// // import { Card } from "@/components/ui/card";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import { MessageButton } from "./MessageButton";
// // import { LoadingSpinner } from "./LoadingSpinner";
// // import type { UserProfile } from "../../types/user";
// // import { Button } from "./ui/button";
// // import { toast } from "@/hooks/use-toast";
// // import { useRouter } from "next/navigation";
// // // import { useRouter } from "next/router";


// // export default function SearchPage() {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [users, setUsers] = useState<UserProfile[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const router = useRouter();
// //   useEffect(() => {
// //     const searchUsers = async () => {
// //       if (!searchTerm.trim()) {
// //         setUsers([]);
// //         return;
// //       }

// //       setLoading(true);
// //       try {
// //         const usersRef = collection(db, "users");
// //         const q = query(
// //           usersRef,
// //           where("name", ">=", searchTerm),
// //           where("name", "<=", searchTerm + "\uf8ff")
// //         );
        
// //         const querySnapshot = await getDocs(q);
// //         const results: UserProfile[] = [];
        
// //         querySnapshot.forEach((doc) => {
// //           results.push({ ...doc.data(), uid: doc.id } as UserProfile);
// //         });
        
// //         setUsers(results);
// //       } catch (error) {
// //         toast({
// //           title: "Error",
// //           description: "Failed to search users",
// //           variant: "destructive",
// //         });
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     const debounceTimeout = setTimeout(searchUsers, 300);
// //     return () => clearTimeout(debounceTimeout);
// //   }, [searchTerm]);

// //   return (
// //     <div className="max-w-4xl mx-auto mt-8 px-4">
// //       <Input
// //         placeholder="Search users..."
// //         value={searchTerm}
// //         onChange={(e) => setSearchTerm(e.target.value)}
// //         className="mb-6"
// //       />

// //       {loading ? (
// //         <div className="flex justify-center py-8">
// //           <LoadingSpinner />
// //         </div>
// //       ) : (
// //         <div className="space-y-4">
// //           {users.map((user) => (
// //             <Card key={user.uid} className="p-4">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center space-x-4">
// //                   <Avatar>
// //                     <AvatarImage src={user.photoURL} />
// //                     <AvatarFallback>{user.name[0]}</AvatarFallback>
// //                   </Avatar>
// //                   <div>
// //                     <h3 className="font-medium">{user.name}</h3>
// //                     <p className="text-sm text-gray-500">{user.college}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <Button
// //                     onClick={() => router.push(`/profile/${user.uid}`)}
// //                     variant="outline"
// //                   >
// //                     View Profile
// //                   </Button>
// //                   <MessageButton userId={user.uid} userName={user.name} />
// //                 </div>
// //               </div>
// //             </Card>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// "use client";
// // Updated SearchPage.tsx with new features
// import { useState, useEffect } from "react";
// import { collection, db, getDocs, query, where } from "@/lib/firebase";
// import { Input } from "@/components/ui/input";
// import { LoadingSpinner } from "./LoadingSpinner";
// import { UserCard } from "./UserCard";
// import { useRouter } from "next/navigation";
// import { useDebounce } from "@/hooks/useDebounce";
// import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
// // import { SkillsFilter } from "./SkillsFilter";
// import { UserStats } from "./UserStats";
// import { Button } from "@/components/ui/button";
// import { FiSearch, FiFilter, FiRefreshCw } from "react-icons/fi";
// import { UserProfile } from "../../types/user";
// import { SelectTrigger } from "@radix-ui/react-select";
// import { SkillsFilter } from "./SkillsFilter";

// export default function SearchPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState<UserProfile[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState("name");
//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
//   const [availableSkills, setAvailableSkills] = useState<string[]>([]);
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const router = useRouter();
//   const debouncedSearch = useDebounce(searchTerm, 300);

//   // Fetch available skills on mount
//   useEffect(() => {
//     const fetchSkills = async () => {
//       // In a real app, you'd fetch this from your database
//       setAvailableSkills([
//         "React", "TypeScript", "Node.js", "Python", "Java",
//         "UI/UX", "DevOps", "Cloud", "Mobile", "Data Science"
//       ]);
//     };
//     fetchSkills();
//   }, []);

//   const handleSkillToggle = (skill: string) => {
//     setSelectedSkills(prev =>
//       prev.includes(skill)
//         ? prev.filter(s => s !== skill)
//         : [...prev, skill]
//     );
//   };

//   const handleSort = () => {
//     setSortOrder(prev => prev === "asc" ? "desc" : "asc");
//     setUsers(prev => [...prev].sort((a, b) => {
//       return sortOrder === "asc"
//         ? a.name.localeCompare(b.name)
//         : b.name.localeCompare(a.name);
//     }));
//   };

//   useEffect(() => {
//     const searchUsers = async () => {
//       if (!debouncedSearch.trim() && selectedSkills.length === 0) {
//         setUsers([]);
//         return;
//       }

//       setLoading(true);
//       try {
//         const usersRef = collection(db, "users");
//         let q = query(usersRef);

//         if (debouncedSearch.trim()) {
//           q = query(
//             usersRef,
//             where(filter, ">=", debouncedSearch),
//             where(filter, "<=", debouncedSearch + "\uf8ff")
//           );
//         }

//         const querySnapshot = await getDocs(q);
//         let results: UserProfile[] = [];

//         querySnapshot.forEach((doc) => {
//           const userData = { ...doc.data(), uid: doc.id } as UserProfile;
          
//           // Filter by selected skills
//           if (selectedSkills.length === 0 || 
//               selectedSkills.every(skill => userData.skills?.includes(skill))) {
//             results.push(userData);
//           }
//         });

//         // Sort results
//         results.sort((a, b) => {
//           return sortOrder === "asc"
//             ? a.name.localeCompare(b.name)
//             : b.name.localeCompare(a.name);
//         });

//         setUsers(results);
//       } catch (error) {
//         console.error("Search error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     searchUsers();
//   }, [debouncedSearch, filter, selectedSkills, sortOrder]);

//   return (
//     <div className="max-w-4xl mx-auto mt-8 px-4 space-y-6">
//       <div className="space-y-4">
//         <h1 className="text-2xl font-bold">Search Users</h1>
        
//         {/* Search and Filter Controls */}
//         <div className="flex gap-4">
//           <div className="relative flex-1">
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <Input
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <Select value={filter} onValueChange={setFilter}>
//             <SelectTrigger className="w-40">
//               <FiFilter className="mr-2" />
//               <SelectValue placeholder="Filter by" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="name">Name</SelectItem>
//               <SelectItem value="college">College</SelectItem>
//               <SelectItem value="skills">Skills</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button
//             variant="outline"
//             onClick={handleSort}
//             className="w-40"
//           >
//             <FiRefreshCw className="mr-2" />
//             Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
//           </Button>
//         </div>

//         {/* Skills Filter */}
//         <SkillsFilter
//           selectedSkills={selectedSkills}
//           onSkillToggle={handleSkillToggle}
//           availableSkills={availableSkills}
//         />

//         {/* Results Stats */}
//         {users.length > 0 && (
//           <p className="text-sm text-gray-500">
//             Found {users.length} user{users.length !== 1 ? 's' : ''}
//           </p>
//         )}
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-8">
//           <LoadingSpinner />
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {users.length === 0 && (searchTerm || selectedSkills.length > 0) && !loading ? (
//             <div className="text-center py-8 text-gray-500">
//               No users found matching your criteria
//             </div>
//           ) : (
//             users.map((user) => (
//               <div key={user.uid} className="space-y-4">
//                 <UserCard
//                   user={user}
//                   onProfileClick={(userId) => router.push(`/profile/${userId}`)}
//                 />
//                 <UserStats userId={user.uid} />
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };


"use client";

import { useState, useEffect } from "react";
import { collection, db, getDocs, query, where } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "./LoadingSpinner";
import { UserCard } from "./UserCard";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { UserStats } from "./UserStats";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiSearch, FiFilter, FiRefreshCw, FiSliders, FiX } from "react-icons/fi";
import { UserProfile } from "../../types/user";
import { cn } from "@/lib/utils"; 

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("name");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchSkills = async () => {
      setAvailableSkills([
        "React", "TypeScript", "Node.js", "Python", "Java",
        "UI/UX", "DevOps", "Cloud", "Mobile", "Data Science"
      ]);
    };
    fetchSkills();
  }, []);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSort = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    setUsers(prev => [...prev].sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }));
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setFilter("name");
    setSortOrder("asc");
  };

  useEffect(() => {
    const searchUsers = async () => {
      if (!debouncedSearch.trim() && selectedSkills.length === 0) {
        setUsers([]);
        return;
      }

      setLoading(true);
      try {
        const usersRef = collection(db, "users");
        let q = query(usersRef);

        if (debouncedSearch.trim()) {
          q = query(
            usersRef,
            where(filter, ">=", debouncedSearch),
            where(filter, "<=", debouncedSearch + "\uf8ff")
          );
        }

        const querySnapshot = await getDocs(q);
        let results: UserProfile[] = [];

        querySnapshot.forEach((doc) => {
          const userData = { ...doc.data(), uid: doc.id } as UserProfile;
          if (selectedSkills.length === 0 || 
              selectedSkills.every(skill => userData.skills?.includes(skill))) {
            results.push(userData);
          }
        });

        results.sort((a, b) => {
          return sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        });

        setUsers(results);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    searchUsers();
  }, [debouncedSearch, filter, selectedSkills, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold md:text-2xl">Search Users</h1>
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                >
                  <FiSliders className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search by</label>
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="college">College</SelectItem>
                        <SelectItem value="skills">Skills</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Skills</label>
                    <ScrollArea className="h-[200px] rounded-md border p-2">
                      <div className="space-y-2">
                        {availableSkills.map((skill) => (
                          <Button
                            key={skill}
                            variant={selectedSkills.includes(skill) ? "default" : "outline"}
                            size="sm"
                            className="mr-2 mb-2"
                            onClick={() => handleSkillToggle(skill)}
                          >
                            {skill}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-2 md:gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="hidden md:flex gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40">
                  <FiFilter className="mr-2" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="skills">Skills</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={handleSort}
                className="w-40"
              >
                <FiRefreshCw className={cn(
                  "mr-2 transition-transform",
                  sortOrder === "desc" && "rotate-180"
                )} />
                Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
              </Button>
            </div>
          </div>

          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-2 py-1"
                >
                  {skill}
                  <button
                    onClick={() => handleSkillToggle(skill)}
                    className="ml-1 hover:text-red-500"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner  />
            <p className="mt-4 text-sm text-gray-500">Searching for users...</p>
          </div>
        ) : (
          <>
            {users.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Found {users.length} user{users.length !== 1 ? 's' : ''}
                </p>
                {users.map((user) => (
                  <div key={user.uid}>
                    <UserCard
                      user={user}
                      onProfileClick={(userId) => router.push(`/profile/${userId}`)}
                    />
                    <UserStats userId={user.uid} />
                  </div>
                ))}
              </div>
            ) : (
              searchTerm || selectedSkills.length > 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FiSearch className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No users found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="mt-4"
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FiSearch className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Start searching</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter a search term or select skills to find users
                  </p>
                </div>
              )
            )}
          </>
        )}
      </main>
    </div>
  );
}