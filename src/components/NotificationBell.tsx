// // types/notification.ts
// import { Timestamp } from 'firebase/firestore';

// export interface Notification {
//   id: string;
//   userId: string;
//   message: string;
//   createdAt: number;
//   read: boolean;
//   type?: 'join_request' | 'application_response' | 'general';
//   timestamp?: number | Timestamp;
//   actionUrl?: string;
//   senderId?: string;
//   targetId?: string;
//   metadata?: Record<string, any>;
//   from?: string;
//   fromUserName?: string;
//   projectId?: string;
//   projectTitle?: string;
//   applicationId?: string;
// }

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
// import { collection, query, where, onSnapshot } from 'firebase/firestore';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../utils/hooks/useAuth';
// import { db } from '@/lib/firebase';

// export function NotificationBell() {
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [recentNotifications, setRecentNotifications] = useState<Notification[]>([]);
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user?.uid) return;

//     const notificationsQuery = query(
//       collection(db, 'notifications'),
//       where('userId', '==', user.uid),
//       where('read', '==', false)
//     );

//     const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
//       setUnreadCount(snapshot.size);
//       setRecentNotifications(
//         snapshot.docs
//           .map(doc => ({ ...doc.data(), id: doc.id } as Notification))
//           .slice(0, 3)
//       );
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
//       <DropdownMenuContent align="end" className="w-[400px]">
//         {recentNotifications.length > 0 ? (
//           <>
//             {recentNotifications.map((notification) => (
//               <DropdownMenuItem
//                 key={notification.id}
//                 className="p-4 cursor-pointer"
//                 onClick={() => {
//                   if (notification.actionUrl) {
//                     router.push(notification.actionUrl);
//                   }
//                 }}
//               >
//                 <div className="flex flex-col gap-1">
//                   <p className="text-sm">{notification.message}</p>
//                   <span className="text-xs text-gray-500">
//                     {new Date(notification.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//               </DropdownMenuItem>
//             ))}
//             <DropdownMenuItem
//               className="p-3 border-t cursor-pointer"
//               onClick={() => router.push('/notifications')}
//             >
//               View all notifications
//             </DropdownMenuItem>
//           </>
//         ) : (
//           <div className="p-4 text-center text-gray-500">
//             No new notifications
//           </div>
//         )}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }


"use client";

// components/NotificationBell.tsx
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

export function NotificationBell({ userId }: { userId: string }) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    // Simple query for unread notifications
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      setUnreadCount(snapshot.docs.length);
    }, (error) => {
      console.error("Error fetching notifications:", error);
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <Link href="/notifications" passHref>
      <Button variant="ghost" className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
}
