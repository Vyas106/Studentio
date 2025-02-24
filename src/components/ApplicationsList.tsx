
  // // components/ApplicationsList.tsx
  // import { useState } from 'react';
  // import { applicationService } from './../../utils/applications';
  // import { Button } from '@/components/ui/button';
  // import { Badge } from '@/components/ui/badge';
  // import { Loader2 } from 'lucide-react';
  // import type { ProjectApplication } from './../../types/user';
  
  // interface ApplicationsListProps {
  //   applications: ProjectApplication[];
  //   projectId: string;
  //   onApplicationUpdate: () => void;
  // }
  
  // export function ApplicationsList({ applications, projectId, onApplicationUpdate }: ApplicationsListProps) {
  //   const [processingId, setProcessingId] = useState<string | null>(null);
  
  //   const handleResponse = async (application: ProjectApplication, status: 'accepted' | 'rejected') => {
  //     if (!application.id) return;
      
  //     setProcessingId(application.id);
  //     try {
  //       await applicationService.handleApplicationResponse(
  //         application.id,
  //         projectId,
  //         status,
  //         {
  //           userId: application.userId,
  //           userName: application.userName
  //         }
  //       );
  //       onApplicationUpdate();
  //     } catch (error) {
  //       console.error('Error handling application:', error);
  //     } finally {
  //       setProcessingId(null);
  //     }
  //   };
  
  //   return (
  //     <div className="space-y-4">
  //       {applications.map((application) => (
  //         <div key={application.id} className="border rounded-lg p-4">
  //           <div className="flex justify-between items-start mb-2">
  //             <div>
  //               <p className="font-medium">{application.userName}</p>
  //               <p className="text-sm text-gray-600">
  //                 Applied {new Date(application.appliedAt).toLocaleDateString()}
  //               </p>
  //             </div>
  //             <Badge variant={
  //               application.status === 'pending' ? 'outline' :
  //               application.status === 'accepted' ? 'success' : 'destructive'
  //             }>
  //               {application.status}
  //             </Badge>
  //           </div>
  //           <p className="text-gray-600 mb-4">{application.message}</p>
  //           {application.status === 'pending' && (
  //             <div className="flex gap-2">
  //               <Button
  //                 onClick={() => handleResponse(application, 'accepted')}
  //                 disabled={!!processingId}
  //               >
  //                 {processingId === application.id ? (
  //                   <Loader2 className="h-4 w-4 animate-spin mr-2" />
  //                 ) : null}
  //                 Accept
  //               </Button>
  //               <Button
  //                 variant="outline"
  //                 onClick={() => handleResponse(application, 'rejected')}
  //                 disabled={!!processingId}
  //               >
  //                 {processingId === application.id ? (
  //                   <Loader2 className="h-4 w-4 animate-spin mr-2" />
  //                 ) : null}
  //                 Reject
  //               </Button>
  //             </div>
  //           )}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }




  // types/user.ts
// export interface ProjectApplication {
//   id?: string;
//   userId: string;
//   userName: string;
//   projectId: string;
//   projectTitle: string;
//   projectOwnerId: string;
//   message: string;
//   status: 'pending' | 'accepted' | 'rejected';
//   appliedAt: number;
// }

// components/ApplicationsList.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ProjectApplication } from '../../types/user';
import { useToast } from '@/hooks/use-toast';
import { doc, updateDoc, collection, addDoc, increment, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ApplicationsListProps {
  applications: ProjectApplication[];
  onApplicationUpdate: () => void;
}

export function ApplicationsList({ applications, onApplicationUpdate }: ApplicationsListProps) {
  const [processingIds, setProcessingIds] = React.useState<string[]>([]);
  const { toast } = useToast();

  const handleResponse = async (application: ProjectApplication, status: 'accepted' | 'rejected') => {
    if (!application.id) return;
    
    setProcessingIds(prev => [...prev, application.id!]);
    
    try {
      // Update application status
      await updateDoc(doc(db, 'applications', application.id), {
        status
      });

      if (status === 'accepted') {
        // Update project members
        await updateDoc(doc(db, 'projects', application.projectId), {
          currentMembers: increment(1),
          members: arrayUnion({
            userId: application.userId,
            name: application.userName,
            role: 'Member'
          })
        });

        // Create notification for applicant
        await addDoc(collection(db, 'notifications'), {
          userId: application.userId,
          type: 'application_accepted',
          projectId: application.projectId,
          projectTitle: application.projectTitle,
          message: `Your application to join "${application.projectTitle}" has been accepted!`,
          createdAt: Date.now(),
          read: false
        });
      } else {
        // Create notification for rejected application
        await addDoc(collection(db, 'notifications'), {
          userId: application.userId,
          type: 'application_rejected',
          projectId: application.projectId,
          projectTitle: application.projectTitle,
          message: `Your application to join "${application.projectTitle}" was not accepted.`,
          createdAt: Date.now(),
          read: false
        });
      }

      toast({
        title: "Success",
        description: `Application ${status === 'accepted' ? 'accepted' : 'rejected'} successfully`
      });

      onApplicationUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process application",
        variant: "destructive"
      });
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== application.id));
    }
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No pending applications
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              {application.userName}
            </CardTitle>
            <Badge
              variant={
                application.status === 'pending' ? 'outline' :
                application.status === 'accepted' ? 'success' : 'destructive'
              }
            >
              {application.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-2">
              Applied {new Date(application.appliedAt).toLocaleDateString()}
            </p>
            <p className="text-sm mb-4">{application.message}</p>
            {application.status === 'pending' && (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleResponse(application, 'accepted')}
                  disabled={processingIds.includes(application.id!)}
                >
                  {processingIds.includes(application.id!) ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Accept'
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleResponse(application, 'rejected')}
                  disabled={processingIds.includes(application.id!)}
                >
                  {processingIds.includes(application.id!) ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Reject'
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
