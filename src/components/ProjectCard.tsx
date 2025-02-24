
// // // components/ProjectCard.tsx
// // import { useState } from 'react';
// // import { User } from 'firebase/auth';
// // import Link from 'next/link';
// // import { BookmarkPlus, BookmarkCheck, UserPlus, FolderIcon, Loader2 } from 'lucide-react';
// // import { Badge } from '@/components/ui/badge';
// // import { Button } from '@/components/ui/button';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { Textarea } from '@/components/ui/textarea';
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogDescription,
// //   DialogFooter,
// // } from '@/components/ui/dialog';
// // import { useToast } from '@/hooks/use-toast';
// // import { doc, addDoc, deleteDoc, setDoc, collection } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import { EnhancedProject } from './../../types/user';

// // interface ProjectCardProps {
// //   project: EnhancedProject;
// //   currentUser?: User | null;
// // }

// // export function ProjectCard({ project, currentUser }: ProjectCardProps) {
// //   const [isSaved, setIsSaved] = useState(false);
// //   const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
// //   const [applicationMessage, setApplicationMessage] = useState('');
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const { toast } = useToast();

// //   const handleSaveProject = async () => {
// //     if (!currentUser) {
// //       toast({
// //         title: "Error",
// //         description: "Please login to save projects",
// //         variant: "destructive"
// //       });
// //       return;
// //     }

// //     try {
// //       const savedProjectRef = doc(db, 'users', currentUser.uid, 'savedProjects', project.id);
// //       if (isSaved) {
// //         await deleteDoc(savedProjectRef);
// //       } else {
// //         await setDoc(savedProjectRef, {
// //           projectId: project.id,
// //           savedAt: Date.now()
// //         });
// //       }
// //       setIsSaved(!isSaved);
// //       toast({
// //         title: isSaved ? "Project removed" : "Project saved",
// //         description: isSaved ? "Project removed from saved items" : "Project added to saved items"
// //       });
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "Failed to save project",
// //         variant: "destructive"
// //       });
// //     }
// //   };

// //   const handleJoinRequest = async () => {
// //     if (!currentUser) {
// //       toast({
// //         title: "Error",
// //         description: "Please login to join projects",
// //         variant: "destructive"
// //       });
// //       return;
// //     }

// //     setIsSubmitting(true);
// //     try {
// //       const applicationData = {
// //         userId: currentUser.uid,
// //         projectId: project.id,
// //         status: 'pending',
// //         message: applicationMessage,
// //         appliedAt: Date.now()
// //       };

// //       await addDoc(collection(db, 'applications'), applicationData);

// //       await addDoc(collection(db, 'notifications'), {
// //         userId: project.userId,
// //         type: 'join_request',
// //         projectId: project.id,
// //         from: currentUser.uid,
// //         message: `${currentUser.displayName} wants to join your project "${project.title}"`,
// //         createdAt: Date.now(),
// //         read: false
// //       });

// //       setIsJoinDialogOpen(false);
// //       toast({
// //         title: "Success",
// //         description: "Join request sent successfully"
// //       });
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "Failed to send join request",
// //         variant: "destructive"
// //       });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <Card className="w-full">
// //       <Link href={`/project/${project.id}`}>
// //         <div className="relative h-48 w-full">
// //           {project.imageUrl ? (
// //             <img
// //               src={project.imageUrl}
// //               alt={project.title}
// //               className="h-full w-full object-cover rounded-t-lg"
// //             />
// //           ) : (
// //             <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded-t-lg">
// //               <FolderIcon className="h-12 w-12 text-gray-400" />
// //             </div>
// //           )}
// //         </div>
// //       </Link>

// //       <CardContent className="p-4">
// //         <div className="flex justify-between items-start mb-2">
// //           <Link href={`/project/${project.id}`}>
// //             <h3 className="text-lg font-semibold hover:text-primary">{project.title}</h3>
// //           </Link>
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             onClick={handleSaveProject}
// //           >
// //             {isSaved ? (
// //               <BookmarkCheck className="h-5 w-5 text-primary" />
// //             ) : (
// //               <BookmarkPlus className="h-5 w-5" />
// //             )}
// //           </Button>
// //         </div>

// //         <p className="text-sm text-gray-600 line-clamp-2 mb-3">
// //           {project.description}
// //         </p>

// //         <div className="flex flex-wrap gap-2 mb-3">
// //           <Badge variant="secondary">{project.category}</Badge>
// //           <Badge variant="outline">{project.difficulty}</Badge>
// //           {project.compensation && project.compensation.type !== 'Unpaid' && (
// //             <Badge variant="secondary">
// //               {project.compensation.type === 'Paid' && project.compensation.amount 
// //                 ? project.compensation.amount 
// //                 : 'Negotiable'}
// //             </Badge>
// //           )}
// //         </div>

// //         <div className="flex justify-between items-center mt-4">
// //           <div className="text-sm text-gray-500">
// //             {project.currentMembers}/{project.teamSize} members
// //           </div>
// //           <Button
// //             onClick={() => setIsJoinDialogOpen(true)}
// //             disabled={currentUser?.uid === project.userId}
// //           >
// //             <UserPlus className="h-4 w-4 mr-2" />
// //             Join Project
// //           </Button>
// //         </div>
// //       </CardContent>

// //       <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogTitle>Join Project</DialogTitle>
// //             <DialogDescription>
// //               Send a message to the project owner explaining why you'd like to join.
// //             </DialogDescription>
// //           </DialogHeader>
// //           <div className="py-4">
// //             <Textarea
// //               value={applicationMessage}
// //               onChange={(e) => setApplicationMessage(e.target.value)}
// //               placeholder="Tell us why you'd like to join this project..."
// //               className="min-h-[100px]"
// //             />
// //           </div>
// //           <DialogFooter>
// //             <Button
// //               variant="outline"
// //               onClick={() => setIsJoinDialogOpen(false)}
// //             >
// //               Cancel
// //             </Button>
// //             <Button
// //               onClick={handleJoinRequest}
// //               disabled={isSubmitting || !applicationMessage.trim()}
// //             >
// //               {isSubmitting ? (
// //                 <>
// //                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //                   Sending Request...
// //                 </>
// //               ) : (
// //                 'Send Request'
// //               )}
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </Card>
// //   );
// // }













// "use client"

// // components/ProjectCard.tsx
// import { useState } from 'react';
// import { User } from 'firebase/auth';
// import Link from 'next/link';
// import { BookmarkPlus, BookmarkCheck, UserPlus, FolderIcon, Loader2 } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import { useToast } from '@/hooks/use-toast';
// import { doc, addDoc, deleteDoc, setDoc, collection } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { EnhancedProject } from './../../types/user';

// interface ProjectCardProps {
//   project: EnhancedProject;
//   currentUser?: User | null;
// }

// export function ProjectCard({ project, currentUser }: ProjectCardProps) {
//   const [isSaved, setIsSaved] = useState(false);
//   const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
//   const [applicationMessage, setApplicationMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const handleSaveProject = async () => {
//     if (!currentUser) {
//       toast({
//         title: "Error",
//         description: "Please login to save projects",
//         variant: "destructive"
//       });
//       return;
//     }

//     try {
//       const savedProjectRef = doc(db, 'users', currentUser.uid, 'savedProjects', project.id);
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
//     if (!currentUser) {
//       toast({
//         title: "Error",
//         description: "Please login to join projects",
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const applicationData = {
//         userId: currentUser.uid,
        
//         projectId: project.id,
//         status: 'pending',
//         message: applicationMessage,
//         appliedAt: Date.now()
//       };

//       await addDoc(collection(db, 'applications'), applicationData);

//       await addDoc(collection(db, 'notifications'), {
//         userId: project.userId,
//         type: 'join_request',
//         projectId: project.id,
//         from: currentUser.uid,
//         message: `${currentUser.displayName} wants to join your project "${project.title}"`,
//         createdAt: Date.now(),
//         read: false
//       });

//       setIsJoinDialogOpen(false);
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

//   return (
//     <div className='relative'>

//     <Card
//     className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white"
//     >

// <Link href={`/project/${project.id}`}>
//         <div className="relative h-40 w-full">
            

//            {project.imageUrl ? (
//             <img
//               src={project.imageUrl}
//               alt={project.title}
//               className="h-full w-full object-cover rounded-t-lg"
//             />
//           ) : (
//             <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded-t-lg">
//               <FolderIcon className="h-12 w-12 text-gray-400" />
//             </div>
//           )} 
//         </div>
//       </Link>
     

//       <CardContent className="p-4">
//         <div className="flex justify-between items-start mb-2">
//           <Link href={`/project/${project.id}`}>
//             <h3 className="text-lg font-semibold hover:text-primary">{project.title}</h3>
//           </Link>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={handleSaveProject}
//           >
//             {isSaved ? (
//               <BookmarkCheck className="h-5 w-5 text-primary" />
//             ) : (
//               <BookmarkPlus className="h-5 w-5" />
//             )}
//           </Button>
//         </div>

//         <p className="text-sm text-white-800 line-clamp-2 mb-3">
//           {project.description}
//         </p>

//         <div className="flex flex-wrap gap-2 mb-3">
//           <Badge variant="secondary">{project.category}</Badge>
//           <Badge variant="secondary" className='capitalize'>{project.difficulty}</Badge>
//           {project.compensation && project.compensation.type !== 'Unpaid' && (
//             <Badge variant="secondary">
//               {project.compensation.type === 'Paid' && project.compensation.amount 
//                 ? project.compensation.amount 
//                 : 'Negotiable'}
//             </Badge>
//           )}
//         </div>

//         <div className="flex justify-between items-center mt-4">
//           <div className="text-sm text-gray-500">
//             {project.currentMembers}/{project.teamSize} members
//           </div>
//           <Button
//             onClick={() => setIsJoinDialogOpen(true)}
//             disabled={currentUser?.uid === project.userId}
//           >
//             <UserPlus className="h-4 w-4 mr-2" />
//             Join Project
//           </Button>
//         </div>
//       </CardContent>

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
//               >
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
//     </Card>
//               </div>
//   );
// }




"use client"

// types/user.ts
export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
  bio?: string;
  skills?: string[];
  role?: string;
}

export interface EnhancedProject {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  difficulty: string;
  teamSize: number;
  currentMembers: number;
  userId: string;
  compensation?: {
    type: 'Paid' | 'Unpaid' | 'Negotiable';
    amount?: string;
  };
  savedBy?: string[];
  members?: {
    userId: string;
    role: string;
    joinedAt: number;
  }[];
}

// components/ProjectCard.tsx

import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { BookmarkPlus, BookmarkCheck, UserPlus, FolderIcon, Loader2, UserCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { doc, addDoc, deleteDoc, setDoc, collection, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
// import { EnhancedProject, UserProfile } from './../../types/user';

interface ProjectCardProps {
  project: EnhancedProject;
  currentUser?: User | null;
}

export function ProjectCard({ project, currentUser }: ProjectCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectOwner, setProjectOwner] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjectOwner = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', project.userId));
        if (userDoc.exists()) {
          setProjectOwner(userDoc.data() as UserProfile);
        }
      } catch (error) {
        console.error('Error fetching project owner:', error);
      }
    };

    fetchProjectOwner();
  }, [project.userId]);

  const handleSaveProject = async () => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "Please login to save projects",
        variant: "destructive"
      });
      return;
    }

    try {
      const savedProjectRef = doc(db, 'users', currentUser.uid, 'savedProjects', project.id);
      const projectRef = doc(db, 'projects', project.id);

      if (isSaved) {
        await deleteDoc(savedProjectRef);
        await updateDoc(projectRef, {
          savedBy: project.savedBy?.filter(id => id !== currentUser.uid) || []
        });
      } else {
        await setDoc(savedProjectRef, {
          projectId: project.id,
          savedAt: Date.now()
        });
        await updateDoc(projectRef, {
          savedBy: [...(project.savedBy || []), currentUser.uid]
        });
      }
      setIsSaved(!isSaved);
      toast({
        title: isSaved ? "Project removed" : "Project saved",
        description: isSaved ? "Project removed from saved items" : "Project added to saved items"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive"
      });
    }
  };

 
const handleJoinRequest = async () => {
  if (!currentUser) {
    toast({
      title: "Error",
      description: "Please login to join projects",
      variant: "destructive"
    });
    return;
  }

  setIsSubmitting(true);
  try {
    // Get project owner information
    const ownerDoc = await getDoc(doc(db, 'users', project.userId));
    const ownerData = ownerDoc.data();

    const applicationData = {
      userId: currentUser.uid,
      userName: currentUser.displayName,
      userEmail: currentUser.email,
      userPhotoURL: currentUser.photoURL,
      projectId: project.id,
      projectTitle: project.title,
      projectOwnerId: project.userId,
      projectOwnerName: ownerData?.displayName || 'Unknown',
      status: 'pending',
      message: applicationMessage,
      appliedAt: Date.now()
    };

    await addDoc(collection(db, 'applications'), applicationData);

    // Create notification with enhanced data
    await addDoc(collection(db, 'notifications'), {
      userId: project.userId,
      type: 'join_request',
      projectId: project.id,
      projectTitle: project.title,
      from: {
        id: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL
      },
      to: {
        id: project.userId,
        name: ownerData?.displayName || 'Unknown',
        email: ownerData?.email
      },
      message: `${currentUser.displayName} wants to join your project "${project.title}"`,
      createdAt: Date.now(),
      read: false
    });

    setIsJoinDialogOpen(false);
    toast({
      title: "Success",
      description: "Join request sent successfully"
    });
  } catch (error) {
    console.error('Error sending join request:', error);
    toast({
      title: "Error",
      description: "Failed to send join request",
      variant: "destructive"
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Card className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white hover:shadow-lg transition-shadow duration-300">
      <Link href={`/project/${project.id}`}>
        <div className="relative h-40 w-full">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover rounded-t-lg"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded-t-lg">
              <FolderIcon className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Link href={`/profile/${project.userId}`}>
            <Avatar className="h-10 w-10">
              <AvatarImage src={projectOwner?.photoURL} />
              <AvatarFallback>
                <UserCircle className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link href={`/profile/${project.userId}`} className="text-sm font-medium hover:text-primary">
              {projectOwner?.displayName || 'Loading...'}
            </Link>
            <p className="text-xs text-gray-400">Project Owner</p>
          </div>
        </div>

        <div className="flex justify-between items-start mb-2">
          <Link href={`/project/${project.id}`}>
            <h3 className="text-lg font-semibold hover:text-primary">{project.title}</h3>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSaveProject}
          >
            {isSaved ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <BookmarkPlus className="h-5 w-5" />
            )}
          </Button>
        </div>

        <p className="text-sm text-gray-200 line-clamp-2 mb-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary">{project.category}</Badge>
          <Badge variant="secondary" className="capitalize">{project.difficulty}</Badge>
          {project.compensation && project.compensation.type !== 'Unpaid' && (
            <Badge variant="secondary">
              {project.compensation.type === 'Paid' && project.compensation.amount 
                ? project.compensation.amount 
                : 'Negotiable'}
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-300">
            {project.currentMembers}/{project.teamSize} members
          </div>
          <Button
            onClick={() => setIsJoinDialogOpen(true)}
            disabled={currentUser?.uid === project.userId}
            className="bg-primary hover:bg-primary/90"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Join Project
          </Button>
        </div>
      </CardContent>

      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent>
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
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsJoinDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleJoinRequest}
              disabled={isSubmitting || !applicationMessage.trim()}
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
    </Card>
  );
}
