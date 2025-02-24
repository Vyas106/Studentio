// // app/project/[id]/page.tsx
// "use client";

// // app/project/[id]/page.tsx
// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { doc, getDoc, updateDoc, arrayUnion, collection, addDoc, query, where, getDocs, increment } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { Loader2, UserIcon, UserPlus } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { useAuth } from '../../../../utils/hooks/useAuth';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Textarea } from '@/components/ui/textarea';
// import type { EnhancedProject, Project, ProjectApplication } from './../../../../types/user';
// import Navbar from '@/components/Navbar';
// import Space from '@/components/space';
// import { ApplicationsList } from '@/components/ApplicationsList';

// export default function ProjectPage() {
//   const { id } = useParams();
//   const [project, setProject] = useState<EnhancedProject | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
//   const [applicationMessage, setApplicationMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (id) {
//       const loadData = async () => {
//         await fetchProject();
//         await fetchApplications();
//       };
//       loadData();
//     }
//   }, [id]);

//   const fetchProject = async () => {
//     if (!id || typeof id !== 'string') return;
    
//     try {
//       const projectDoc = await getDoc(doc(db, 'projects', id));
//       if (projectDoc.exists()) {
//         setProject({
//           id: projectDoc.id,
//           ...projectDoc.data()
//         } as EnhancedProject);
//       }
//     } catch (error) {
//       console.error('Error fetching project:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleJoinRequest = async () => {
//     if (!project || !user || !applicationMessage.trim()) return;
  
//     setIsSubmitting(true);
//     try {
//       const newApplication: ProjectApplication = {
//         userId: user.uid,
//         userName: user.displayName || 'Anonymous',
//         message: applicationMessage.trim(),
//         status: 'pending',
//         appliedAt: Date.now(),
//         projectId: project.id,
//         projectTitle: project.title, // Ensure this property exists in `project`
//         projectOwnerId: project.projectOwnerId // Ensure this property exists in `project`
//       };
    
  
//       // Add to applications collection instead of project document
//       await addDoc(collection(db, 'applications'), newApplication);
  
//       setIsJoinDialogOpen(false);
//       setApplicationMessage('');
//       await fetchProject();
//     } catch (error) {
//       console.error('Error submitting application:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  

//   // Add this function to fetch applications
// const fetchApplications = async () => {
//   if (!project?.id) return;
  
//   try {
//     const applicationsQuery = query(
//       collection(db, 'applications'),
//       where('projectId', '==', project.id)
//     );
    
//     const applicationsSnapshot = await getDocs(applicationsQuery);
//     const applications = applicationsSnapshot.docs.map(doc => ({
//       ...doc.data(),
//       id: doc.id
//     })) as ProjectApplication[];
    
//     setProject(prev => prev ? {
//       ...prev,
//       applications: applications
//     } : null);
//   } catch (error) {
//     console.error('Error fetching applications:', error);
//   }
// };


// const handleApplicationResponse = async (applicantId: string, status: 'accepted' | 'rejected') => {
//   if (!project || !user) return;

//   try {
//     // Find the application document
//     const applicationsQuery = query(
//       collection(db, 'applications'),
//       where('projectId', '==', project.id),
//       where('userId', '==', applicantId)
//     );
    
//     const applicationsSnapshot = await getDocs(applicationsQuery);
//     const applicationDoc = applicationsSnapshot.docs[0];

//     if (applicationDoc) {
//       // Update application status
//       await updateDoc(doc(db, 'applications', applicationDoc.id), {
//         status
//       });

//       // If accepted, update project members
//       if (status === 'accepted') {
//         const application = applicationDoc.data() as ProjectApplication;
//         await updateDoc(doc(db, 'projects', project.id), {
//           currentMembers: increment(1),
//           members: arrayUnion({
//             userId: applicantId,
//             name: application.userName,
//             role: 'Member'
//           })
//         });
//       }

//       // Refresh data
//       await fetchProject();
//       await fetchApplications();
//     }
//   } catch (error) {
//     console.error('Error updating application:', error);
//   }
// };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   if (!project) {
//     return (
//       <div className="container mx-auto py-8">
//         <h1 className="text-2xl font-bold">Project not found</h1>
//       </div>
//     );
//   }

//   const isOwner = user?.uid === project.userId;
//   const isMember = project.members.some(member => member.userId === user?.uid);
//   const canJoin = user && !isOwner && !isMember;

//   return (
//     <div className="container mx-auto py-8">
//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* Project Header */}
//         <div className="space-y-6">
//           {project.imageUrl && (
//             <img
//               src={project.imageUrl}
//               alt={project.title}
//               className="w-full h-64 object-cover rounded-lg"
//             />
//           )}

//           <div>
//             <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
//             <div className="flex flex-wrap gap-2">
//               <Badge variant="secondary">{project.category}</Badge>
//               <Badge variant="outline">{project.difficulty}</Badge>
//               <Badge>{project.status}</Badge>
//               {project?.compensation?.type !== 'Unpaid' && (
//   <Badge variant="secondary">
//     {project?.compensation?.type === 'Paid' 
//       ? project?.compensation?.amount 
//       : 'Negotiable'}
//   </Badge>
// )}


//             </div>
//           </div>
//         </div>

//         {/* Project Details */}
//         <div className="bg-card rounded-lg p-6 space-y-6">
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Project Description</h2>
//             <p className="text-gray-600">{project.description}</p>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">Project Details</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <h3 className="font-medium">Team Size</h3>
//                 <p className="text-gray-600">{project.currentMembers}/{project.teamSize} members</p>
//               </div>
//               <div>
//                 <h3 className="font-medium">Duration</h3>
//                 <p className="text-gray-600">{project.estimatedDuration}</p>
//               </div>
//               <div>
//                 <h3 className="font-medium">Created</h3>
//                 {/* <p className="text-gray-600">{new Date(project.createdAt).toLocaleDateString()}</p> */}
//                 <p className="text-gray-600">
//   {project?.createdAt
//     ? new Date(
//         typeof project.createdAt === "string" || typeof project.createdAt === "number"
//           ? project.createdAt
//           : project.createdAt.toDate?.() || project.createdAt
//       ).toLocaleDateString()
//     : "Date not available"}
// </p>


                

//               </div>
//               <div>
//                 <h3 className="font-medium">Last Updated</h3>
//                 <p className="text-gray-600">{new Date(project.lastUpdated).toLocaleDateString()}</p>
//               </div>
//             </div>
//           </div>

//           {project.tags.length > 0 && (
//             <div>
//               <h2 className="text-xl font-semibold mb-2">Tags</h2>
//               <div className="flex flex-wrap gap-2">
//                 {project.tags.map((tag) => (
//                   <Badge key={tag} variant="outline">{tag}</Badge>
//                 ))}
//               </div>
//             </div>
//           )}

// {(project?.links || []).length > 0 && (
//   <div>
//     <h2 className="text-xl font-semibold mb-2">Project Links</h2>
//     <div className="space-y-2">
//       {(project.links || []).map((link, index) => (
//         <a
//           key={index}
//           href={link.url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-primary hover:underline"
//         >
//           {link.title}
//         </a>
//       ))}
//     </div>
//   </div>
// )}

//         </div>

//         {/* Team Members */}
//         <div className="bg-card rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Team Members</h2>
//           <div className="space-y-4">
//             {project.members.map((member) => (
//               <div key={member.userId} className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                   {member.avatar ? (
//                     <img
//                       src={member.avatar}
//                       alt={member.name}
//                       className="w-full h-full rounded-full"
//                     />
//                   ) : (
//                     <UserIcon className="h-6 w-6 text-primary" />
//                   )}
//                 </div>
//                 <div>
//                   <p className="font-medium">{member.name}</p>
//                   <p className="text-sm text-gray-600">{member.role}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Applications Section (Only visible to project owner) */}
//         {/* {isOwner && (
//           <div className="bg-card rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">Join Requests</h2>
//             {project.applications?.length > 0 ? (
//               <div className="space-y-4">
//                 {project.applications.map((application) => (
//                   <div key={application.userId} className="border rounded-lg p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <p className="font-medium">{application.userName}</p>
//                         <p className="text-sm text-gray-600">
//                           Applied {new Date(application.appliedAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <Badge variant={
//                         application.status === 'pending' ? 'outline' :
//                         application.status === 'accepted' ? 'success' : 'destructive'
//                       }>
//                         {application.status}
//                       </Badge>
//                     </div>
//                     <p className="text-gray-600 mb-4">{application.message}</p>
//                     {application.status === 'pending' && (
//                       <div className="flex gap-2">
//                         <Button
//                           onClick={() => handleApplicationResponse(application.userId, 'accepted')}
//                         >
//                           Accept
//                         </Button>
//                         <Button
//                           variant="outline"
//                           onClick={() => handleApplicationResponse(application.userId, 'rejected')}
//                         >
//                           Reject
//                         </Button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">No pending join requests</p>
//             )}
//           </div>
//         )} */}

// {isOwner && (
//   <div className="bg-card rounded-lg p-6">
//     <h2 className="text-xl font-semibold mb-4">Join Requests</h2>
//     <ApplicationsList
//       applications={project.applications || []}
//       projectId={project.id}
//       onApplicationUpdate={fetchApplications}
//     />
//   </div>
// )}
//         {/* Join Project Button */}
//         {canJoin && (
//           <div className="fixed bottom-6 right-6">
//             <Button
//               size="lg"
//               onClick={() => setIsJoinDialogOpen(true)}
//             >
//               <UserPlus className="h-5 w-5 mr-2" />
//               Join Project
//             </Button>
//           </div>
//         )}

//         {/* Join Dialog */}
//         <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Join {project.title}</DialogTitle>
//               <DialogDescription>
//                 Send a message to the project owner explaining why you'd like to join.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="py-4">
//               <Textarea
//                 value={applicationMessage}
//                 onChange={(e) => setApplicationMessage(e.target.value)}
//                 placeholder="Tell us why you'd like to join this project..."
//                 className="min-h-[100px]"
//               />
//             </div>
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsJoinDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleJoinRequest}
//                 disabled={isSubmitting || !applicationMessage.trim()}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Sending Request...
//                   </>
//                 ) : (
//                   'Send Request'
//                 )}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

      
//       <Space />
//           <Navbar />
//     </div>
//   );
// }


// // // app/project/[id]/page.tsx
// // "use client";
// // import { useState, useEffect } from 'react';
// // import { useParams } from 'next/navigation';
// // import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import { Loader2, UserIcon, UserPlus, Link as LinkIcon, Calendar, Users, Clock } from 'lucide-react';
// // import { Badge } from '@/components/ui/badge';
// // import { useAuth } from '../../../../utils/hooks/useAuth';
// // import { Button } from '@/components/ui/button';
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// // } from '@/components/ui/dialog';
// // import { Textarea } from '@/components/ui/textarea';
// // import {
// //   Card,
// //   CardHeader,
// //   CardTitle,
// //   CardContent,
// //   CardFooter,
// // } from '@/components/ui/card';
// // import { Alert, AlertDescription } from '@/components/ui/alert';
// // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // import type { Project, ProjectApplication } from './../../../../types/user';
// // import Navbar from '@/components/Navbar';
// // import Space from '@/components/space';

// // // Components
// // const ProjectHeader = ({ project }: { project: Project }) => (
// //   <div className="space-y-6">
// //     {project.imageUrl && (
// //       <div className="relative h-80 w-full overflow-hidden rounded-xl">
// //         <img
// //           src={project.imageUrl}
// //           alt={project.title}
// //           className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
// //         />
// //       </div>
// //     )}
// //     <div className="space-y-4">
// //       <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
// //       <div className="flex flex-wrap gap-2">
// //         <Badge variant="secondary" className="text-sm">{project.category}</Badge>
// //         <Badge variant="outline" className="text-sm">{project.difficulty}</Badge>
// //         <Badge className="text-sm">{project.status}</Badge>
// //         {project?.compensation?.type !== 'Unpaid' && (
// //           <Badge variant="secondary" className="text-sm">
// //             {project?.compensation?.type === 'Paid' 
// //               ? project?.compensation?.amount 
// //               : 'Negotiable'}
// //           </Badge>
// //         )}
// //       </div>
// //     </div>
// //   </div>
// // );

// // // const ProjectStats = ({ project }: { project: Project }) => (
// // //   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // //     <div className="flex items-center gap-2">
// // //       <Users className="h-5 w-5 text-muted-foreground" />
// // //       <div>
// // //         <p className="text-sm font-medium">Team Size</p>
// // //         <p className="text-2xl font-bold">{project.currentMembers}/{project.teamSize}</p>
// // //       </div>
// // //     </div>
// // //     <div className="flex items-center gap-2">
// // //       <Clock className="h-5 w-5 text-muted-foreground" />
// // //       <div>
// // //         <p className="text-sm font-medium">Duration</p>
// // //         <p className="text-2xl font-bold">{project.estimatedDuration}</p>
// // //       </div>
// // //     </div>
// // //     <div className="flex items-center gap-2">
// // //       <Calendar className="h-5 w-5 text-muted-foreground" />
// // //       <div>
// // //         <p className="text-sm font-medium">Created</p>
// // //         <p className="text-lg">
// // //           {project?.createdAt
// // //             ? new Date(
// // //                 typeof project.createdAt === "string" || typeof project.createdAt === "number"
// // //                   ? project.createdAt
// // //                   : project.createdAt.toDate?.() || project.createdAt
// // //               ).toLocaleDateString()
// // //             : "Date not available"}
// // //         </p>
// // //       </div>
// // //     </div>
// // //     <div className="flex items-center gap-2">
// // //       <Calendar className="h-5 w-5 text-muted-foreground" />
// // //       <div>
// // //         <p className="text-sm font-medium">Last Updated</p>
// // //         <p className="text-lg">{new Date(project.lastUpdated).toLocaleDateString()}</p>
// // //       </div>
// // //     </div>
// // //   </div>
// // // );

// // const TeamMember = ({ member }) => (
// //   <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
// //     <Avatar className="h-12 w-12">
// //       <AvatarImage src={member.avatar} />
// //       <AvatarFallback>
// //         <UserIcon className="h-6 w-6" />
// //       </AvatarFallback>
// //     </Avatar>
// //     <div>
// //       <p className="font-medium">{member.name}</p>
// //       <p className="text-sm text-muted-foreground">{member.role}</p>
// //     </div>
// //   </div>
// // );

// // const ApplicationCard = ({ 
// //   application, 
// //   onAccept, 
// //   onReject 
// // }: { 
// //   application: ProjectApplication;
// //   onAccept: () => void;
// //   onReject: () => void;
// // }) => (
// //   <Card>
// //     <CardHeader>
// //       <div className="flex justify-between items-center">
// //         <div>
// //           <CardTitle className="text-lg">{application.userName}</CardTitle>
// //           <p className="text-sm text-muted-foreground">
// //             Applied {new Date(application.appliedAt).toLocaleDateString()}
// //           </p>
// //         </div>
// //         <Badge variant={
// //           application.status === 'pending' ? 'outline' :
// //           application.status === 'accepted' ? 'success' : 'destructive'
// //         }>
// //           {application.status}
// //         </Badge>
// //       </div>
// //     </CardHeader>
// //     <CardContent>
// //       <p className="text-muted-foreground">{application.message}</p>
// //     </CardContent>
// //     {application.status === 'pending' && (
// //       <CardFooter className="flex gap-2">
// //         <Button onClick={onAccept}>Accept</Button>
// //         <Button variant="outline" onClick={onReject}>Reject</Button>
// //       </CardFooter>
// //     )}
// //   </Card>
// // );

// // // Main Component
// // export default function ProjectPage() {
// //   const { id } = useParams();
// //   const [project, setProject] = useState<Project | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
// //   const [applicationMessage, setApplicationMessage] = useState('');
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const { user } = useAuth();

// //   useEffect(() => {
// //     if (id) {
// //       fetchProject();
// //     }
// //   }, [id]);

// //   const fetchProject = async () => {
// //     if (!id || typeof id !== 'string') return;
    
// //     try {
// //       const projectDoc = await getDoc(doc(db, 'projects', id));
// //       if (projectDoc.exists()) {
// //         setProject({
// //           id: projectDoc.id,
// //           ...projectDoc.data()
// //         } as Project);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching project:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleJoinRequest = async () => {
// //     if (!project || !user || !applicationMessage.trim()) return;

// //     setIsSubmitting(true);
// //     try {
// //       const newApplication: ProjectApplication = {
// //         userId: user.uid,
// //         userName: user.displayName || 'Anonymous',
// //         message: applicationMessage.trim(),
// //         status: 'pending',
// //         appliedAt: Date.now()
// //       };

// //       await updateDoc(doc(db, 'projects', project.id), {
// //         applications: arrayUnion(newApplication)
// //       });

// //       setIsJoinDialogOpen(false);
// //       setApplicationMessage('');
// //       await fetchProject();
// //     } catch (error) {
// //       console.error('Error submitting application:', error);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handleApplicationResponse = async (applicantId: string, status: 'accepted' | 'rejected') => {
// //     if (!project || !user) return;

// //     try {
// //       const updatedApplications = project.applications.map(app => 
// //         app.userId === applicantId ? { ...app, status } : app
// //       );

// //       await updateDoc(doc(db, 'projects', project.id), {
// //         applications: updatedApplications,
// //         ...(status === 'accepted' && {
// //           currentMembers: project.currentMembers + 1,
// //           members: arrayUnion({
// //             userId: applicantId,
// //             name: project.applications.find(app => app.userId === applicantId)?.userName || 'Anonymous',
// //             role: 'Member'
// //           })
// //         })
// //       });

// //       await fetchProject();
// //     } catch (error) {
// //       console.error('Error updating application:', error);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <Loader2 className="h-8 w-8 animate-spin" />
// //       </div>
// //     );
// //   }

// //   if (!project) {
// //     return (
// //       <div className="container mx-auto py-8">
// //         <Alert variant="destructive">
// //           <AlertDescription>Project not found</AlertDescription>
// //         </Alert>
// //       </div>
// //     );
// //   }

// //   const isOwner = user?.uid === project.userId;
// //   const isMember = project.members.some(member => member.userId === user?.uid);
// //   const canJoin = user && !isOwner && !isMember;

// //   return (
// //     <div className="container mx-auto py-8 px-4">
// //       <div className="max-w-4xl mx-auto space-y-8">
// //         <ProjectHeader project={project} />

// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Project Overview</CardTitle>
// //           </CardHeader>
// //           <CardContent className="space-y-6">
// //             <ProjectStats project={project} />
            
// //             <div>
// //               <h2 className="text-xl font-semibold mb-4">Description</h2>
// //               <p className="text-muted-foreground leading-relaxed">{project.description}</p>
// //             </div>

// //             {project.tags.length > 0 && (
// //               <div>
// //                 <h2 className="text-xl font-semibold mb-4">Technologies & Skills</h2>
// //                 <div className="flex flex-wrap gap-2">
// //                   {project.tags.map((tag) => (
// //                     <Badge key={tag} variant="outline">{tag}</Badge>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {(project?.links || []).length > 0 && (
// //               <div>
// //                 <h2 className="text-xl font-semibold mb-4">Resources & Links</h2>
// //                 <div className="grid gap-3">
// //                   {(project.links || []).map((link, index) => (
// //                     <a
// //                       key={index}
// //                       href={link.url}
// //                       target="_blank"
// //                       rel="noopener noreferrer"
// //                       className="flex items-center gap-2 text-primary hover:underline"
// //                     >
// //                       <LinkIcon className="h-4 w-4" />
// //                       {link.title}
// //                     </a>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Team Members</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="grid gap-4 md:grid-cols-2">
// //               {project.members.map((member) => (
// //                 <TeamMember key={member.userId} member={member} />
// //               ))}
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {isOwner && (
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Join Requests</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 {project.applications?.length > 0 ? (
// //                   project.applications.map((application) => (
// //                     <ApplicationCard
// //                       key={application.userId}
// //                       application={application}
// //                       onAccept={() => handleApplicationResponse(application.userId, 'accepted')}
// //                       onReject={() => handleApplicationResponse(application.userId, 'rejected')}
// //                     />
// //                   ))
// //                 ) : (
// //                   <p className="text-muted-foreground">No pending join requests</p>
// //                 )}
// //               </div>
// //             </CardContent>
// //           </Card>
// //         )}

// //         {canJoin && (
// //           <div className="fixed bottom-6 right-6">
// //             <Button
// //               size="lg"
// //               className="shadow-lg hover:shadow-xl transition-shadow"
// //               onClick={() => setIsJoinDialogOpen(true)}
// //             >
// //               <UserPlus className="h-5 w-5 mr-2" />
// //               Join Project
// //             </Button>
// //           </div>
// //         )}

// //         <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
// //           <DialogContent>
// //             <DialogHeader>
// //               <DialogTitle>Join {project.title}</DialogTitle>
// //               <DialogDescription>
// //                 Send a message to the project owner explaining why you'd like to join.
// //               </DialogDescription>
// //             </DialogHeader>
// //             <div className="py-4">
// //               <Textarea
// //                 value={applicationMessage}
// //                 onChange={(e) => setApplicationMessage(e.target.value)}
// //                 placeholder="Tell us why you'd like to join this project..."
// //                 className="min-h-[100px]"
// //               />
// //             </div>
// //             <DialogFooter>
// //               <Button
// //                 variant="outline"
// //                 onClick={() => setIsJoinDialogOpen(false)}
// //               >
// //                 Cancel
// //               </Button>
// //               <Button
// //                 onClick={handleJoinRequest}
// //                 disabled={isSubmitting || !applicationMessage.trim()}
// //               >
// //                 {isSubmitting ? (
// //                   <>
// //                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //                     Sending Request...
// //                   </>
// //                 ) : (
// //                   'Send Request'
// //                 )}
// //               </Button>
// //             </DialogFooter>
// //           </DialogContent>
// //         </Dialog>
// //       </div>

// //       <Space />
// //       <Navbar />
// //     </div>
// //   );
// // }


// // app/project/[id]/page.tsx
// "use client";
// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { doc, getDoc, updateDoc, collection, query, where, getDocs, addDoc, deleteDoc, setDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useAuth } from '../../../../utils/hooks/useAuth';
// import { EnhancedProject, ProjectApplication } from '../../../../types/user';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Separator } from '@/components/ui/separator';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from '@/hooks/use-toast';
// import {
//   Clock,
//   Users,
//   Link as LinkIcon,
//   Calendar,
//   Loader2,
//   UserPlus,
//   Edit,
//   Share2,
//   BookmarkPlus,
//   BookmarkCheck,
//   FolderIcon
// } from 'lucide-react';
// import { ApplicationsList } from '@/components/ApplicationsList';
// import { applicationService } from '@/app/utils/applications';

// export default function ProjectDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { user } = useAuth();
//   const [project, setProject] = useState<EnhancedProject | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
//   const [applicationMessage, setApplicationMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);
//   const [userApplication, setUserApplication] = useState<ProjectApplication | null>(null);
//   const [projectApplications, setProjectApplications] = useState<ProjectApplication[]>([]);
//   const [userProjects, setUserProjects] = useState<EnhancedProject[]>([]);

//   useEffect(() => {
//     const fetchUserProjects = async () => {
//       if (user) {
//         const projectsQuery = query(
//           collection(db, 'projects'),
//           where('projectOwnerId', '==', user.uid)
//         );
//         const projectsSnapshot = await getDocs(projectsQuery);
//         const projects = projectsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         })) as EnhancedProject[];
//         setUserProjects(projects);
//       }
//     };
  
//     fetchUserProjects();
//   }, [user]);
  
//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (userProjects.length > 0) {
//         const allApplications = await Promise.all(
//           userProjects.map(project => 
//             applicationService.getProjectApplications(project.id)
//           )
//         );
//         setProjectApplications(allApplications.flat());
//       }
//     };
  
//     fetchApplications();
//   }, [userProjects]);



//   useEffect(() => {
//     if (!id) return;
    
//     const fetchProject = async () => {
//       try {
//         const projectDoc = await getDoc(doc(db, 'projects', id as string));
//         if (!projectDoc.exists()) {
//           toast({
//             title: "Error",
//             description: "Project not found",
//             variant: "destructive"
//           });
//           router.push('/explore');
//           return;
//         }

//         const projectData = {
//           ...projectDoc.data(),
//           id: projectDoc.id,
//         } as EnhancedProject;

//         setProject(projectData);

//         // Check if user has saved this project
//         if (user) {
//           const savedProjectDoc = await getDoc(doc(db, 'users', user.uid, 'savedProjects', id as string));
//           setIsSaved(savedProjectDoc.exists());

//           // Check if user has already applied
//           const applicationsQuery = query(
//             collection(db, 'applications'),
//             where('userId', '==', user.uid),
//             where('projectId', '==', id)
//           );
//           const applicationsSnapshot = await getDocs(applicationsQuery);
//           if (!applicationsSnapshot.empty) {
//             setUserApplication(applicationsSnapshot.docs[0].data() as ProjectApplication);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching project:', error);
//         toast({
//           title: "Error",
//           description: "Failed to load project details",
//           variant: "destructive"
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProject();
//   }, [id, user]);

//   const handleSaveProject = async () => {
//     if (!user || !project) return;

//     try {
//       const savedProjectRef = doc(db, 'users', user.uid, 'savedProjects', project.id);
//       if (isSaved) {
//         await deleteDoc(savedProjectRef);
//       } else {
//         await setDoc(savedProjectRef, {
//           projectId: project.id,
//           savedAt: Date.now()
//         });
//       }
//       setIsSaved(!isSaved);
//       toast({
//         title: isSaved ? "Project removed" : "Project saved",
//         description: isSaved ? "Project removed from saved items" : "Project added to saved items"
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to save project",
//         variant: "destructive"
//       });
//     }
//   };

//   const handleJoinRequest = async () => {
//     if (!user || !project) return;
    
//     setIsSubmitting(true);
//     try {
//       const applicationData: ProjectApplication = {
//         userId: user.uid,
//         userName: user.displayName || 'Anonymous',
//         projectId: project.id,
//         projectTitle: project.title,
//         message: applicationMessage,
//         status: 'pending',
//         appliedAt: Date.now(),
//         projectOwnerId: project.projectOwnerId
//       };

//       const applicationRef = await addDoc(collection(db, 'applications'), applicationData);

//       // Create notification for project owner
//       await addDoc(collection(db, 'notifications'), {
//         userId: project.projectOwnerId,
//         type: 'join_request',
//         projectId: project.id,
//         projectTitle: project.title,
//         from: user.uid,
//         fromUserName: user.displayName || 'Anonymous',
//         message: `${user.displayName || 'Anonymous'} wants to join your project "${project.title}"`,
//         createdAt: Date.now(),
//         read: false,
//         applicationId: applicationRef.id
//       });

//       setIsJoinDialogOpen(false);
//       setApplicationMessage('');
//       setUserApplication(applicationData);
      
//       toast({
//         title: "Success",
//         description: "Join request sent successfully"
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to send join request",
//         variant: "destructive"
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   if (!project) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <h1 className="text-2xl font-bold">Project not found</h1>
//         <Button onClick={() => router.push('/explore')} className="mt-4">
//           Back to Explore
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container max-w-7xl mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Main Content */}
//         <div className="md:col-span-2">
//           <div className="relative h-64 w-full mb-6">
//             {project.imageUrl ? (
//               <img
//                 src={project.imageUrl}
//                 alt={project.title}
//                 className="h-full w-full object-cover rounded-lg"
//               />
//             ) : (
//               <div className="h-full w-full bg-gray-200 rounded-lg flex items-center justify-center">
//                 <FolderIcon className="h-16 w-16 text-gray-400" />
//               </div>
//             )}
//           </div>

//           <div className="flex justify-between items-start mb-6">
//             <h1 className="text-4xl font-bold">{project.title}</h1>
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={handleSaveProject}
//               >
//                 {isSaved ? (
//                   <BookmarkCheck className="h-5 w-5 text-primary" />
//                 ) : (
//                   <BookmarkPlus className="h-5 w-5" />
//                 )}
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => {
//                   navigator.clipboard.writeText(window.location.href);
//                   toast({
//                     title: "Link copied",
//                     description: "Project link copied to clipboard"
//                   });
//                 }}
//               >
//                 <Share2 className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2 mb-6">
//             <Badge variant="secondary">{project.category}</Badge>
//             <Badge variant="outline">{project.difficulty}</Badge>
//             <Badge>{project.status}</Badge>
//             {project.compensation && project.compensation.type !== 'Unpaid' && (
//               <Badge variant="secondary">
//                 {project.compensation.type === 'Paid' && project.compensation.amount 
//                   ? project.compensation.amount 
//                   : 'Negotiable'}
//               </Badge>
//             )}
//           </div>

//           <Card className="mb-8">
//             <CardHeader>
//               <CardTitle>About the Project</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="whitespace-pre-wrap">{project.description}</p>
//             </CardContent>
//           </Card>

//           {project.links && project.links.length > 0 && (
//             <Card className="mb-8">
//               <CardHeader>
//                 <CardTitle>Project Links</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col gap-2">
//                   {project.links.map((link, index) => (
//                     <a
//                       key={index}
//                       href={link.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 text-blue-600 hover:underline"
//                     >
//                       <LinkIcon className="h-4 w-4" />
//                       {link.title}
//                     </a>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           <Card>
//             <CardContent className="pt-6">
//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center gap-2">
//                   <Users className="h-5 w-5 text-gray-500" />
//                   <span>
//                     {project.currentMembers}/{project.teamSize} members
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock className="h-5 w-5 text-gray-500" />
//                   <span>{project.estimatedDuration}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Calendar className="h-5 w-5 text-gray-500" />
//                   <span>
//                     Last updated {new Date(project.lastUpdated).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>

//               <Separator className="my-4" />

//               {user?.uid !== project.projectOwnerId && (
//                 userApplication ? (
//                   <div className="bg-gray-100 p-4 rounded-lg">
//                     <p className="font-medium">
//                       Application Status: {userApplication.status}
//                     </p>
//                     <p className="text-sm text-gray-600 mt-2">
//                       Applied on {new Date(userApplication.appliedAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 ) : (
//                   <Button
//                     className="w-full"
//                     onClick={() => setIsJoinDialogOpen(true)}
//                   >
//                     <UserPlus className="h-4 w-4 mr-2" />
//                     Join Project
//                   </Button>
//                 )
//               )}
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Team Members</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col gap-4">
             
//               {Array.isArray(project.members) &&
//   project.members.map((member) => (
//     <div key={member.userId} className="flex items-center gap-3">
//       <Avatar>
//         <AvatarImage src={""} /> {/* No avatar available in the type */}
//         <AvatarFallback>{member.userId.charAt(0).toUpperCase()}</AvatarFallback>
//       </Avatar>
//       <div>
//         <p className="font-medium">{member.userId}</p>
//         <p className="font-medium">{member.name}</p> 

//         {member.userId === project.projectOwnerId && (
//           <Badge variant="secondary">Owner</Badge>
//         )}
//       </div>
//     </div>
//   ))}

//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

    




//       <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Join Project</DialogTitle>
//             <DialogDescription>
//               Send a message to the project owner explaining why you'd like to join.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="py-4">
//             <Textarea
//               value={applicationMessage}
//               onChange={(e) => setApplicationMessage(e.target.value)}
//               placeholder="Tell us why you'd like to join this project..."
//               className="min-h-[100px]"
//             />
//           </div>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setIsJoinDialogOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleJoinRequest}
//               disabled={isSubmitting || !applicationMessage.trim()}
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Sending Request...
//                 </>
//               ) : (
//                 'Send Request'
//               )}
//             </Button>
                
//           </DialogFooter>



//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// app/project/[id]/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, addDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '../../../../utils/hooks/useAuth';
import { EnhancedProject, ProjectApplication, TeamMember } from '../../../../types/user';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Clock,
  Users,
  Link as LinkIcon,
  Calendar,
  Loader2,
  UserPlus,
  Share2,
  BookmarkPlus,
  BookmarkCheck,
  FolderIcon,
  Info,
} from 'lucide-react';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [project, setProject] = useState<EnhancedProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [userApplication, setUserApplication] = useState<ProjectApplication | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch project and related data
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!id || !user) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch project details
        const projectDoc = await getDoc(doc(db, 'projects', id as string));
        if (!projectDoc.exists()) {
          throw new Error('Project not found');
        }

        const projectData = {
          ...projectDoc.data(),
          id: projectDoc.id,
        } as EnhancedProject;

        // Fetch team members details
        const memberPromises = (projectData.members || []).map(async (member) => {
          const userDoc = await getDoc(doc(db, 'users', member.userId));
          return {
            ...member,
            profile: userDoc.exists() ? userDoc.data() : null,
          };
        });

        const resolvedMembers = await Promise.all(memberPromises);
        setTeamMembers(resolvedMembers);
        setProject(projectData);

        // Check if user has saved this project
        const savedProjectDoc = await getDoc(doc(db, 'users', user.uid, 'savedProjects', id as string));
        setIsSaved(savedProjectDoc.exists());

        // Check existing application
        const applicationsQuery = query(
          collection(db, 'applications'),
          where('userId', '==', user.uid),
          where('projectId', '==', id)
        );
        const applicationsSnapshot = await getDocs(applicationsQuery);
        if (!applicationsSnapshot.empty) {
          setUserApplication(applicationsSnapshot.docs[0].data() as ProjectApplication);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setError(error instanceof Error ? error.message : 'Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id, user]);

  const handleSaveProject = async () => {
    if (!user || !project) return;

    try {
      const savedProjectRef = doc(db, 'users', user.uid, 'savedProjects', project.id);

      if (isSaved) {
        await deleteDoc(savedProjectRef);
        toast({
          title: 'Project removed',
          description: 'Project removed from saved items',
        });
      } else {
        await setDoc(savedProjectRef, {
          projectId: project.id,
          savedAt: Date.now(),
        });
        toast({
          title: 'Project saved',
          description: 'Project added to saved items',
        });
      }

      setIsSaved(!isSaved);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save project',
        variant: 'destructive',
      });
    }
  };

  const handleJoinRequest = async () => {
    if (!user || !project) return;

    try {
      setIsSubmitting(true);

      const applicationData: ProjectApplication = {
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        projectId: project.id,
        projectTitle: project.title,
        message: applicationMessage,
        status: 'pending',
        appliedAt: Date.now(),
        projectOwnerId: project.projectOwnerId,
      };

      // Create application
      const applicationRef = await addDoc(collection(db, 'applications'), applicationData);

      // Create notification
      await addDoc(collection(db, 'notifications'), {
        userId: project.projectOwnerId,
        type: 'join_request',
        projectId: project.id,
        projectTitle: project.title,
        from: user.uid,
        fromUserName: user.displayName || 'Anonymous',
        message: `${user.displayName || 'Anonymous'} wants to join your project "${project.title}"`,
        createdAt: Date.now(),
        read: false,
        applicationId: applicationRef.id,
      });

      setIsJoinDialogOpen(false);
      setApplicationMessage('');
      setUserApplication(applicationData);

      toast({
        title: 'Success',
        description: 'Join request sent successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send join request',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <Info className="h-12 w-12 text-gray-400 mb-4" />
        <h1 className="text-xl font-bold text-center mb-4">
          {error || 'Project not found'}
        </h1>
        <Button onClick={() => router.push('/explore')}>Back to Explore</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-4 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Image */}
          <div className="relative h-48 sm:h-64 w-full rounded-lg overflow-hidden">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                <FolderIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>

          {/* Project Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{project.title}</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSaveProject}
                className="h-10 w-10"
              >
                {isSaved ? (
                  <BookmarkCheck className="h-5 w-5 text-primary" />
                ) : (
                  <BookmarkPlus className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: 'Link copied',
                    description: 'Project link copied to clipboard',
                  });
                }}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Project Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{project.category}</Badge>
            <Badge variant="outline">{project.difficulty}</Badge>
            <Badge>{project.status}</Badge>
            {project.compensation && project.compensation.type !== 'Unpaid' && (
              <Badge variant="secondary">
                {project.compensation.type === 'Paid' && project.compensation.amount
                  ? project.compensation.amount
                  : 'Negotiable'}
              </Badge>
            )}
          </div>

          {/* Project Description */}
          <Card>
            <CardHeader>
              <CardTitle>About the Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-gray-700">{project.description}</p>
            </CardContent>
          </Card>

          {/* Project Links */}
          {project.links && project.links.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Project Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <LinkIcon className="h-4 w-4 text-blue-500" />
                      <span className="text-blue-600 hover:underline truncate">
                        {link.title}
                      </span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Stats */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">
                    {project.currentMembers}/{project.teamSize} members
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">{project.estimatedDuration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">
                    Updated {new Date(project.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              {user?.uid !== project.projectOwnerId &&
                (userApplication ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">
                      Application Status: {userApplication.status}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Applied {new Date(userApplication.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => setIsJoinDialogOpen(true)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Join Project
                  </Button>
                ))}
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
              {teamMembers.map((member) => (
  <div
    key={`${member.userId}-${member.role}`} // Combine userId and role for uniqueness
    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
    onClick={() => navigateToProfile(member.userId)}
  >
    <Avatar>
      <AvatarImage src={member.userId} />
      <AvatarFallback>
        {member.userId?.[0]?.toUpperCase() || member.userId[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
    <div>
      <p className="font-medium">
        {member.userId || 'Anonymous'}
      </p>
      <p className="text-sm text-gray-500">
        {member.role || 'Team Member'}
      </p>
      {member.userId === project.projectOwnerId && (
        <Badge variant="secondary" className="mt-1">
          Owner
        </Badge>
      )}
    </div>
  </div>
))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Join Dialog */}
      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join Project</DialogTitle>
            <DialogDescription>
              Send a message to the project owner explaining why you'd like to join.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={applicationMessage}
              onChange={(e) => setApplicationMessage(e.target.value)}
              placeholder="Tell us why you'd like to join this project..."
              className="min-h-[150px] resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              Be specific about your skills and how you can contribute to the project.
            </p>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsJoinDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleJoinRequest}
              disabled={isSubmitting || !applicationMessage.trim()}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Request...
                </>
              ) : (
                'Send Request'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}