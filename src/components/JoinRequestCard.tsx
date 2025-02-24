
// // // components/JoinRequestCard.tsx
// // import { useState } from 'react';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
// // import { doc, updateDoc, increment, collection, addDoc } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import { useToast } from '@/hooks/use-toast';
// // import { Application } from '../../types/user';

// // interface JoinRequestCardProps {
// //   request: Application;
// //   onActionComplete: () => void;
// // }

// // export function JoinRequestCard({ request, onActionComplete }: JoinRequestCardProps) {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const { toast } = useToast();

// //   const handleAction = async (action: 'accept' | 'reject') => {
// //     if (!request.userData || !request.projectData) return;
    
// //     setIsLoading(true);
// //     try {
// //       // Update application status
// //       await updateDoc(doc(db, 'applications', request.id), {
// //         status: action
// //       });

// //       if (action === 'accept') {
// //         // Update project members count
// //         const projectRef = doc(db, 'projects', request.projectId);
// //         await updateDoc(projectRef, {
// //           currentMembers: increment(1)
// //         });

// //         // Add member to project
// //         await addDoc(collection(db, 'projects', request.projectId, 'members'), {
// //           userId: request.userId,
// //           role: 'member',
// //           joinedAt: Date.now()
// //         });
// //       }

// //       // Create notification for applicant
// //       await addDoc(collection(db, 'notifications'), {
// //         userId: request.userId,
// //         type: action === 'accept' ? 'application_accepted' : 'application_rejected',
// //         projectId: request.projectId,
// //         projectTitle: request.projectData.title,
// //         createdAt: Date.now(),
// //         read: false
// //       });

// //       toast({
// //         title: "Success",
// //         description: `Successfully ${action}ed the request`
// //       });

// //       onActionComplete();
// //     } catch (error) {
// //       console.error('Error handling request:', error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to process the request",
// //         variant: "destructive"
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   if (!request.userData || !request.projectData) {
// //     return null;
// //   }

// //   return (
// //     <Card className="mb-4">
// //       <CardContent className="p-6">
// //         <div className="flex items-start gap-4">
// //           <Avatar className="h-12 w-12">
// //             <AvatarImage src={request.userData.photoURL} />
// //             <AvatarFallback>{request.userData.displayName?.[0] || '?'}</AvatarFallback>
// //           </Avatar>
          
// //           <div className="flex-1">
// //             <div className="flex justify-between items-start">
// //               <div>
// //                 <h4 className="font-semibold">{request.userData.displayName}</h4>
// //                 <p className="text-sm text-muted-foreground">{request.userData.college}</p>
// //               </div>
// //               <p className="text-sm text-muted-foreground">
// //                 {new Date(request.appliedAt).toLocaleDateString()}
// //               </p>
// //             </div>
            
// //             <p className="mt-2 text-sm">
// //               Requested to join <span className="font-semibold">{request.projectData.title}</span>
// //             </p>
            
// //             <p className="mt-2 text-sm text-muted-foreground italic">
// //               "{request.message}"
// //             </p>

// //             <div className="mt-4 flex gap-2 justify-end">
// //               <Button
// //                 variant="outline"
// //                 onClick={() => handleAction('reject')}
// //                 disabled={isLoading}
// //               >
// //                 <XCircle className="h-4 w-4 mr-2" />
// //                 Reject
// //               </Button>
// //               <Button
// //                 onClick={() => handleAction('accept')}
// //                 disabled={isLoading}
// //               >
// //                 {isLoading ? (
// //                   <Loader2 className="h-4 w-4 animate-spin mr-2" />
// //                 ) : (
// //                   <CheckCircle className="h-4 w-4 mr-2" />
// //                 )}
// //                 Accept
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }


// "use client";


// // components/JoinRequestCard.tsx
// import { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
// import { doc, updateDoc, increment, collection, addDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useToast } from '@/hooks/use-toast';

// export function JoinRequestCard({ request, onActionComplete } : any) {
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();

//   const handleAction = async (action: 'accept' | 'reject') => {
//     setIsLoading(true);
//     try {
//       // Update application status
//       await updateDoc(doc(db, 'applications', request.id), {
//         status: action
//       });

//       if (action === 'accept') {
//         // Update project members count
//         await updateDoc(doc(db, 'projects', request.projectId), {
//           currentMembers: increment(1)
//         });

//         // Add to project members collection
//         await addDoc(collection(db, 'projects', request.projectId, 'members'), {
//           userId: request.userId,
//           role: 'member',
//           joinedAt: Date.now()
//         });
//       }

//       // Create notification for the applicant
//       await addDoc(collection(db, 'notifications'), {
//         userId: request.userId,
//         type: action === 'accept' ? 'application_accepted' : 'application_rejected',
//         projectId: request.projectId,
//         projectTitle: request.projectData?.title,
//         createdAt: Date.now(),
//         read: false
//       });

//       toast({
//         title: "Success",
//         description: `Successfully ${action}ed the request`
//       });

//       onActionComplete();
//     } catch (error) {
//       console.error('Error handling request:', error);
//       toast({
//         title: "Error",
//         description: "Failed to process the request",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="mb-4">
//       <CardContent className="p-6">
//         <div className="flex items-start gap-4">
//           <Avatar className="h-12 w-12">
//             <AvatarImage src={request.userData?.photoURL} />
//             <AvatarFallback>{request.userData?.displayName?.[0] || '?'}</AvatarFallback>
//           </Avatar>
          
//           <div className="flex-1">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h4 className="font-semibold">{request.userData?.displayName}</h4>
//                 <p className="text-sm text-muted-foreground">{request.userData?.college}</p>
//               </div>
//               <p className="text-sm text-muted-foreground">
//                 {new Date(request.appliedAt).toLocaleDateString()}
//               </p>
//             </div>
            
//             <p className="mt-2 text-sm">
//               Requested to join <span className="font-semibold">{request.projectData?.title}</span>
//             </p>
            
//             <p className="mt-2 text-sm text-muted-foreground italic">
//               "{request.message}"
//             </p>

//             <div className="mt-4 flex gap-2 justify-end">
//               <Button
//                 variant="outline"
//                 onClick={() => handleAction('reject')}
//                 disabled={isLoading}
//               >
//                 <XCircle className="h-4 w-4 mr-2" />
//                 Reject
//               </Button>
//               <Button
//                 onClick={() => handleAction('accept')}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                 ) : (
//                   <CheckCircle className="h-4 w-4 mr-2" />
//                 )}
//                 Accept
//               </Button>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }