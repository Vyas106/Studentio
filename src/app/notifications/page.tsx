"use client"

import { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/hooks/useAuth';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  onSnapshot, 
  doc, 
  updateDoc, 
  getDoc, 
  addDoc,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  UserCircle, 
  Check, 
  X, 
  Bell,
  AlertCircle,
  MessageSquare,
  UserPlus,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Notification, NotificationType } from '../../../types/user';


const NOTIFICATION_ICONS: Record<NotificationType, React.ReactNode> = {
  join_request: <UserPlus className="h-5 w-5 text-blue-500" />,
  application_accepted: <Check className="h-5 w-5 text-green-500" />,
  application_rejected: <X className="h-5 w-5 text-red-500" />,
  message: <MessageSquare className="h-5 w-5 text-purple-500" />,
  alert: <AlertCircle className="h-5 w-5 text-yellow-500" />
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    if (!user?.uid) return;

    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const notifs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Notification));
        setNotifications(notifs);
        setLoading(false);
      },
      (error) => {
        console.error("Error in notifications subscription:", error);
        toast({
          title: "Error",
          description: "Failed to load notifications. Please refresh the page.",
          variant: "destructive"
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid, toast]);


  const handleJoinRequest = async (notification: Notification, accept: boolean) => {
    if (!user?.uid || processingIds.has(notification.id)) return;

    // Validate required fields before proceeding
    if (!notification.from?.id || !notification.projectId) {
      toast({
        title: "Error",
        description: "Missing required information to process this request",
        variant: "destructive"
      });
      return;
    }

    setProcessingIds(prev => new Set(prev).add(notification.id));

    try {
      const batch = writeBatch(db);

      // 1. Find the application
      const applicationsRef = collection(db, 'applications');
      const applicationQuery = query(
        applicationsRef,
        where('projectId', '==', notification.projectId),
        where('userId', '==', notification.from.id)
        // Removed the status check as it might be causing issues
      );

      const applicationSnapshot = await getDocs(applicationQuery);

      if (applicationSnapshot.empty) {
        throw new Error('No application found for this user and project');
      }

      const applicationDoc = applicationSnapshot.docs[0];
      const applicationRef = doc(db, 'applications', applicationDoc.id);

      // 2. Update application status
      batch.update(applicationRef, {
        status: accept ? 'accepted' : 'rejected',
        updatedAt: serverTimestamp()
      });

      // 3. Update project members if accepting
      if (accept) {
        const projectRef = doc(db, 'projects', notification.projectId);
        const projectSnap = await getDoc(projectRef);

        if (!projectSnap.exists()) {
          throw new Error('Project not found');
        }

        const projectData = projectSnap.data();
        const currentMembers = projectData.members || [];

        // Check if not already a member
        if (!currentMembers.some((member: any) => member.userId === notification.from.id)) {
          const newMember = {
            userId: notification.from.id,
            role: 'member',
            joinedAt: serverTimestamp()
          };

          batch.update(projectRef, {
            members: [...currentMembers, newMember],
            memberCount: (projectData.memberCount || 0) + 1,
            updatedAt: serverTimestamp()
          });
        }
      }

      // 4. Create notification for applicant
      const notificationData = {
        type: accept ? 'application_accepted' : 'application_rejected',
        userId: notification.from.id,
        projectId: notification.projectId,
        projectTitle: notification.projectTitle || 'Project', // Fallback if projectTitle is missing
        from: {
          id: user.uid,
          name: user.displayName || 'Unknown User',
          email: user.email,
          photoURL: user.photoURL
        },
        message: `Your application to join "${notification.projectTitle || 'the project'}" has been ${
          accept ? 'accepted' : 'rejected'
        }.`,
        createdAt: Date.now(),
        read: false
      };

      const newNotificationRef = doc(collection(db, 'notifications'));
      batch.set(newNotificationRef, notificationData);

      // 5. Mark current notification as read
      const currentNotificationRef = doc(db, 'notifications', notification.id);
      batch.update(currentNotificationRef, {
        read: true,
        updatedAt: serverTimestamp()
      });

      // Commit all changes
      await batch.commit();

      toast({
        title: "Success",
        description: `Application ${accept ? 'accepted' : 'rejected'} successfully`,
      });
    } catch (error) {
      console.error("Error processing application:", error);
      toast({
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "Failed to process application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(notification.id);
        return newSet;
      });
    }
  };

  const groupNotificationsByDate = (notifications: Notification[]) => {
    return notifications.reduce((groups, notification) => {
      const date = new Date(notification.createdAt).toLocaleDateString();
      return {
        ...groups,
        [date]: [...(groups[date] || []), notification],
      };
    }, {} as Record<string, Notification[]>);
  };

  const renderNotification = (notification: Notification) => {
    const isProcessing = processingIds.has(notification.id);

    return (
      <Card 
        key={notification.id}
        className={`mb-4 ${notification.read ? 'bg-gray-50' : 'bg-white border-l-4 border-l-primary'}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src={notification.from?.photoURL} />
                <AvatarFallback>
                  <UserCircle className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">{notification.from?.name || 'Unknown'}</span>
                <Badge variant="outline" className="text-xs">
                  {NOTIFICATION_ICONS[notification.type as NotificationType] || <Bell className="h-5 w-5" />}
                  <span className="ml-1">{(notification.type || '').replace('_', ' ')}</span>
                </Badge>
                <span className="text-sm text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>

              {notification.projectId && (
                <Link 
                  href={`/projects/${notification.projectId}`}
                  className="text-sm font-medium text-primary hover:underline block mt-1"
                >
                  {notification.projectTitle || 'View Project'}
                </Link>
              )}

              <p className="text-sm text-gray-600 mt-1">
                {notification.message}
              </p>

              {notification.type === 'join_request' && !notification.read && (
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={() => handleJoinRequest(notification, true)}
                    disabled={isProcessing}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    {isProcessing ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleJoinRequest(notification, false)}
                    disabled={isProcessing}
                    className="text-red-500 border-red-500 hover:bg-red-50"
                  >
                    {isProcessing ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500" />
                    ) : (
                      <>
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const groupedNotifications = groupNotificationsByDate(notifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="secondary">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="flex gap-2">
            <Bell className="h-4 w-4" />
            All
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex gap-2">
            <Users className="h-4 w-4" />
            Join Requests
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex gap-2">
            <AlertCircle className="h-4 w-4" />
            Unread
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {Object.keys(groupedNotifications).length > 0 ? (
            Object.entries(groupedNotifications).map(([date, notifs]) => (
              <div key={date}>
                <h2 className="text-sm font-medium text-gray-500 mb-3">{date}</h2>
                <div className="space-y-4">
                  {notifs.map(renderNotification)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No notifications to display
            </div>
          )}
        </TabsContent>

        <TabsContent value="requests">
          {notifications.filter(n => n.type === 'join_request').length > 0 ? (
            notifications
              .filter(n => n.type === 'join_request')
              .map(renderNotification)
          ) : (
            <div className="text-center py-8 text-gray-500">
              No join requests to display
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread">
          {notifications.filter(n => !n.read).length > 0 ? (
            notifications
              .filter(n => !n.read)
              .map(renderNotification)
          ) : (
            <div className="text-center py-8 text-gray-500">
              No unread notifications
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}