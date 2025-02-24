import { addDoc, arrayUnion, collection, doc, increment, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ProjectApplication } from "../../types/user";
import { db } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

// components/ProjectRequests.tsx
interface ProjectRequestsProps {
    projectId: string;
  }

  export function ProjectRequests({ projectId }: ProjectRequestsProps) {
    const [applications, setApplications] = useState<ProjectApplication[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const applicationsQuery = query(
        collection(db, 'applications'),
        where('projectId', '==', projectId),
        where('status', '==', 'pending'),
        orderBy('appliedAt', 'desc')
      );
  
      const unsubscribe = onSnapshot(applicationsQuery, (snapshot) => {
        const applicationsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ProjectApplication[];
        setApplications(applicationsData);
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, [projectId]);
  
    const handleApplicationResponse = async (applicationId: string, status: 'accepted' | 'rejected') => {
      try {
        const applicationRef = doc(db, 'applications', applicationId);
        const application = applications.find(app => app.id === applicationId);
  
        if (!application) return;
  
        await updateDoc(applicationRef, { status });
  
        // If accepted, add user to project members
        if (status === 'accepted') {
          const projectRef = doc(db, 'projects', projectId);
          await updateDoc(projectRef, {
            members: arrayUnion({
              userId: application.userId,
              name: application.userName,
            }),
            currentMembers: increment(1)
          });
        }
  
        // Create notification for the applicant
        await addDoc(collection(db, 'notifications'), {
          userId: application.userId,
          type: 'application_response',
          projectId,
          projectTitle: application.projectTitle,
          message: `Your application to join "${application.projectTitle}" has been ${status}`,
          createdAt: Date.now(),
          read: false
        });
  
        toast({
          title: "Success",
          description: `Application ${status} successfully`
        });
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to ${status} application`,
          variant: "destructive"
        });
      }
    };
  
    if (loading) {
      return <Loader2 className="h-8 w-8 animate-spin mx-auto" />;
    }
  
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Pending Join Requests</h3>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <p className="text-center text-gray-500">No pending requests</p>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Link href={`/profile/${application.userId}`}>
                      <Avatar>
                        <AvatarFallback>
                          {application.userName[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div>
                      <Link 
                        href={`/profile/${application.userId}`}
                        className="font-medium hover:underline"
                      >
                        {application.userName}
                      </Link>
                      <p className="text-sm text-gray-500">
                        Applied {new Date(application.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleApplicationResponse(application.id!, 'rejected')}
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApplicationResponse(application.id!, 'accepted')}
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }