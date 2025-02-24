// // app/chats/page.tsx
// "use client";

// import { useEffect, useState } from 'react';
// import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useRouter } from 'next/navigation';
// import { Card, CardContent } from '@/components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { getInitials } from '@/lib/utils';
// import { useAuthStore } from '@/lib/auth';


// interface ChatRoom {
//   id: string;
//   participants: string[];
//   participantsInfo: {
//     id: string;
//     name: string;
//     photoURL?: string;
//   }[];
//   lastMessage: {
//     content: string;
//     timestamp: any;
//     type: string;
//   } | null;
//   updatedAt: any;
//   unreadCount: number;
// }


// export default function ChatsPage() {
//   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
//   const router = useRouter();
//   const { user, isLoading } = useAuthStore();

//   useEffect(() => {
//     if (isLoading) return;
    
//     if (!user) {
//       router.push('/login');
//       return;
//     }

//     const chatRoomsRef = collection(db, 'chatRooms');
//     const q = query(
//       chatRoomsRef,
//       where('participants', 'array-contains', user.uid),
//       orderBy('updatedAt', 'desc')
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const rooms: ChatRoom[] = [];
//       snapshot.forEach((doc) => {
//         rooms.push({ id: doc.id, ...doc.data() } as ChatRoom);
//       });
//       setChatRooms(rooms);
//     });

//     return () => unsubscribe();
//   }, [user, isLoading, router]);

//   const getOtherParticipant = (room: ChatRoom) => {
//     return room.participantsInfo.find(p => p.id !== user?.uid);
//   };

//  // app/chats/page.tsx (continued)
//  const formatLastMessageTime = (timestamp: any) => {
//     if (!timestamp) return '';
    
//     const date = timestamp.toDate();
//     const now = new Date();
//     const diff = now.getTime() - date.getTime();
//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
//     if (days === 0) {
//       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } else if (days === 1) {
//       return 'Yesterday';
//     } else if (days < 7) {
//       return date.toLocaleDateString([], { weekday: 'short' });
//     } else {
//       return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
//     }
//   };

//   const getLastMessagePreview = (message: ChatRoom['lastMessage']) => {
//     if (!message) return 'No messages yet';
    
//     switch (message.type) {
//       case 'image':
//         return '📷 Photo';
//       case 'file':
//         return '📎 File';
//       default:
//         return message.content.length > 40 
//           ? `${message.content.substring(0, 40)}...` 
//           : message.content;
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-8 px-4">
//       <h1 className="text-2xl font-bold mb-6">Chats</h1>
//       <div className="space-y-4">
//         {chatRooms.map((room) => {
//           const otherParticipant = getOtherParticipant(room);
          
//           return (
//             <Card
//               key={room.id}
//               className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//               onClick={() => router.push(`/chatroom/${room.id}`)}
//             >
//               <CardContent className="p-4">
//                 <div className="flex items-center space-x-4">
//                   <Avatar>
//                     <AvatarImage 
//                       src={otherParticipant?.photoURL} 
//                       alt={otherParticipant?.name} 
//                     />
//                     <AvatarFallback>
//                       {getInitials(otherParticipant?.name || '')}
//                     </AvatarFallback>
//                   </Avatar>
                  
//                   <div className="flex-1 min-w-0">
//                     <div className="flex justify-between items-start">
//                       <h2 className="text-lg font-semibold truncate">
//                         {otherParticipant?.name}
//                       </h2>
//                       <span className="text-sm text-gray-500">
//                         {formatLastMessageTime(room.lastMessage?.timestamp)}
//                       </span>
//                     </div>
                    
//                     <div className="flex justify-between items-center">
//                       <p className="text-gray-600 dark:text-gray-300 truncate">
//                         {getLastMessagePreview(room.lastMessage)}
//                       </p>
//                       {room.unreadCount > 0 && (
//                         <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
//                           {room.unreadCount}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// }




//   // Rest of your existing ChatPage code remains the same...
