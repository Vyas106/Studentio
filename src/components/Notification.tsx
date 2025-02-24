
// "use client";

// import { auth, realtimeDb } from "@/lib/firebase";
// import { formatDistanceToNow } from "date-fns";
// import { onValue, ref } from "firebase/database";
// import { useEffect, useState } from "react";

//   // components/Notification.tsx
//   export function Notification() {
//     const [notifications, setNotifications] = useState<any[]>([]);
//     const currentUser = auth.currentUser;
  
//     useEffect(() => {
//       if (!currentUser) return;
  
//       const notificationsRef = ref(realtimeDb, `notifications/${currentUser.uid}`);
//       const unsubscribe = onValue(notificationsRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           const notificationList = Object.entries(data).map(([id, notification]: [string, any]) => ({
//             id,
//             ...notification,
//           }));
//           setNotifications(notificationList);
//         }
//       });
  
//       return () => unsubscribe();
//     }, [currentUser]);
  
//     return (
//       <div className="max-w-md mx-auto p-4">
//         <h2 className="text-xl font-bold mb-4">Notifications</h2>
//         <div className="space-y-2">
//           {notifications.map((notification) => (
//             <div
//               key={notification.id}
//               className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
//             >
//               <p className="font-medium">{notification.title}</p>
//               <p className="text-sm text-gray-500">{notification.message}</p>
//               <span className="text-xs text-gray-400">
//                 {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
  