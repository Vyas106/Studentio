// // components/NotificationBell.tsx
// import { useState, useEffect } from 'react';
// import { Bell } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { db } from '@/lib/firebase';
// import { collection, query, where, onSnapshot } from 'firebase/firestore';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';

// export function NotificationBell() {
//   const [unreadCount, setUnreadCount] = useState(0);
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) return;

//     const notificationsQuery = query(
//       collection(db, 'notifications'),
//       where('userId', '==', user.uid),
//       where('read', '==', false)
//     );

//     const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
//       setUnreadCount(snapshot.size);
//     });

//     return () => unsubscribe();
//   }, [user]);

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative">
//           <Bell className="h-5 w-5" />
//           {unreadCount > 0 && (
//             <Badge 
//               className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
//               variant="destructive"
//             >
//               {unreadCount}
//             </Badge>
//           )}
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="w-[300px]">
//         <DropdownMenuItem onClick={() => router.push('/notifications')}>
//           View all notifications
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }






// // // app/home/page.tsx
// // "use client";
// // import { useState, useEffect } from 'react';
// // import { useAuth } from '@/hooks/useAuth';
// // import { db } from '@/lib/firebase';
// // import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { ProjectCard } from '@/components/ProjectCard';
// // import { NotificationBell } from '@/components/NotificationBell';
// // import { ProjectRequests } from '@/components/ProjectRequests';
// // import { Button } from '@/components/ui/button';
// // import { Plus } from 'lucide-react';
// // import { useRouter } from 'next/navigation';
// // import { EnhancedProject } from '@/types/user';

// // export default function HomePage() {
// //   const [myProjects, setMyProjects] = useState<EnhancedProject[]>([]);
// //   const [savedProjects, setSavedProjects] = useState<EnhancedProject[]>([]);
// //   const { user } = useAuth();
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (!user) return;

// //     // Subscribe to user's projects
// //     const myProjectsQuery = query(
// //       collection(db, 'projects'),
// //       where('userId', '==', user.uid),
// //       orderBy('lastUpdated', 'desc')
// //     );

// //     const unsubscribeMyProjects = onSnapshot(myProjectsQuery, async (snapshot) => {
// //       const projectsData = snapshot.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data()
// //       })) as EnhancedProject[];
// //       setMyProjects(projectsData);
// //     });

// //     // Subscribe to saved projects
// //     const savedProjectsQuery = query(
// //       collection(db, 'users', user.uid, 'savedProjects'),
// //       orderBy('savedAt', 'desc'),
// //       limit(5)
// //     );

// //     const unsubscribeSavedProjects = onSnapshot(savedProjectsQuery, async (snapshot) => {
// //       const savedProjectIds = snapshot.docs.map(doc => doc.data().projectId);
      
// //       const projectPromises = savedProjectIds.map(async (projectId) => {
// //         const projectDoc = await getDoc(doc(db, 'projects', projectId));
// //         return { id: projectDoc.id, ...projectDoc.data() } as EnhancedProject;
// //       });

// //       const savedProjectsData = await Promise.all(projectPromises);
// //       setSavedProjects(savedProjectsData);
// //     });

// //     return () => {
// //       unsubscribeMyProjects();
// //       unsubscribeSavedProjects();
// //     };
// //   }, [user]);

// //   return (
// //     <div className="container max-w-7xl mx-auto px-4 py-8">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-4xl font-bold">Dashboard</h1>
// //         <div className="flex items-center gap-4">
// //           <NotificationBell />
// //           <Button onClick={() => router.push('/project/create')}>
// //             <Plus className="h-4 w-4 mr-2" />
// //             Create Project
// //           </Button>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //         <div className="md:col-span-2 space-y-8">
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>My Projects</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               {myProjects.length === 0 ? (
// //                 <div className="text-center py-8">
// //                   <p className="text-gray-500 mb-4">You haven't created any projects yet</p>
// //                   <Button onClick={() => router.push('/project/create')}>
// //                     Create Your First Project
// //                   </Button>
// //                 </div>
// //               ) : (
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   {myProjects.map((project) => (
// //                     <ProjectCard
// //                       key={project.id}
// //                       project={project}
// //                       currentUser={user}
// //                     />
// //                   ))}
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Saved Projects</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               {savedProjects.length === 0 ? (
// //                 <div className="text-center py-8">
// //                   <p className="text-gray-500 mb-4">No saved projects yet</p>
// //                   <Button onClick={() => router.push('/explore')}>
// //                     Explore Projects
// //                   </Button>
// //                 </div>
// //               ) : (
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   {savedProjects.map((project) => (
// //                     <ProjectCard
// //                       key={project.id}