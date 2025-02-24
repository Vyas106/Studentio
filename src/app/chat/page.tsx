// // // app/chats/page.tsx
// // "use client";

// // import { useEffect, useState } from 'react';
// // import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
// // import { db, auth } from '@/lib/firebase';
// // import { useRouter } from 'next/navigation';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // import { Input } from '@/components/ui/input';
// // import { Button } from '@/components/ui/button';
// // import { getInitials } from '@/lib/utils';
// // import { Search, MessageCircle } from 'lucide-react';

// // interface ChatRoom {
// //   id: string;
// //   participants: string[];
// //   participantsInfo: {
// //     id: string;
// //     name: string;
// //     photoURL?: string;
// //     lastSeen?: any;
// //     status?: 'online' | 'offline';
// //   }[];
// //   lastMessage: {
// //     content: string;
// //     timestamp: any;
// //     type: string;
// //     senderId: string;
// //   } | null;
// //   updatedAt: any;
// //   unreadCount: number;
// // }

// // export default function ChatsPage() {
// //   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [filteredRooms, setFilteredRooms] = useState<ChatRoom[]>([]);
// //   const router = useRouter();
// //   const currentUser = auth.currentUser;

// //   useEffect(() => {
// //     if (!currentUser) {
// //       router.push('/login');
// //       return;
// //     }

// //     const chatRoomsRef = collection(db, 'chatRooms');
// //     const q = query(
// //       chatRoomsRef,
// //       where('participants', 'array-contains', currentUser.uid),
// //       orderBy('updatedAt', 'desc')
// //     );

// //     const unsubscribe = onSnapshot(q, (snapshot) => {
// //       const rooms: ChatRoom[] = [];
// //       snapshot.forEach((doc) => {
// //         rooms.push({ id: doc.id, ...doc.data() } as ChatRoom);
// //       });
// //       setChatRooms(rooms);
// //       setFilteredRooms(rooms);
// //     });

// //     return () => unsubscribe();
// //   }, [currentUser, router]);

// //   useEffect(() => {
// //     const filtered = chatRooms.filter((room) => {
// //       const otherParticipant = getOtherParticipant(room);
// //       return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase());
// //     });
// //     setFilteredRooms(filtered);
// //   }, [searchQuery, chatRooms]);

// //   const getOtherParticipant = (room: ChatRoom) => {
// //     return room.participantsInfo.find(p => p.id !== currentUser?.uid);
// //   };

// //   const formatLastMessageTime = (timestamp: any) => {
// //     if (!timestamp) return '';
    
// //     const date = timestamp.toDate();
// //     const now = new Date();
// //     const diff = now.getTime() - date.getTime();
// //     const minutes = Math.floor(diff / 60000);
    
// //     if (minutes < 60) {
// //       return `${minutes}m`;
// //     } else if (minutes < 1440) {
// //       return `${Math.floor(minutes / 60)}h`;
// //     } else if (minutes < 10080) { // 7 days
// //       return date.toLocaleDateString([], { weekday: 'short' });
// //     } else {
// //       return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
// //     }
// //   };

// //   const handleChatItemClick = (room: ChatRoom) => {
// //     const otherParticipant = getOtherParticipant(room);
// //     if (otherParticipant) {
// //       router.push(`/chatroom/${room.id}`);
// //     }
// //   };

// //   const getMessagePreview = (message: ChatRoom['lastMessage']) => {
// //     if (!message) return 'No messages yet';
    
// //     switch (message.type) {
// //       case 'image':
// //         return '📷 Photo';
// //       case 'file':
// //         return '📎 File';
// //       default:
// //         return message.content.length > 40 
// //           ? `${message.content.substring(0, 40)}...` 
// //           : message.content;
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto mt-8 px-4">
// //       <div className="mb-6">
// //         <div className="flex items-center space-x-2">
// //           <div className="relative flex-1">
// //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
// //             <Input
// //               placeholder="Search chats..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="pl-10"
// //             />
// //           </div>
// //           <Button variant="outline" size="icon">
// //             <MessageCircle className="h-5 w-5" />
// //           </Button>
// //         </div>
// //       </div>

// //       <div className="space-y-2">
// //         {filteredRooms.map((room) => {
// //           const otherParticipant = getOtherParticipant(room);
          
// //           return (
// //             <Card
// //               key={room.id}
// //               className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
// //               onClick={() => handleChatItemClick(room)}
// //             >
// //               <CardContent className="p-4">
// //                 <div className="flex items-center space-x-4">
// //                   <div className="relative">
// //                     <Avatar className="h-12 w-12">
// //                       <AvatarImage 
// //                         src={otherParticipant?.photoURL} 
// //                         alt={otherParticipant?.name} 
// //                       />
// //                       <AvatarFallback>
// //                         {getInitials(otherParticipant?.name || '')}
// //                       </AvatarFallback>
// //                     </Avatar>
// //                     {otherParticipant?.status === 'online' && (
// //                       <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
// //                     )}
// //                   </div>
                  
// //                   <div className="flex-1 min-w-0">
// //                     <div className="flex justify-between items-start">
// //                       <h2 className="text-lg font-semibold truncate">
// //                         {otherParticipant?.name}
// //                       </h2>
// //                       <span className="text-sm text-gray-500">
// //                         {formatLastMessageTime(room.lastMessage?.timestamp)}
// //                       </span>
// //                     </div>
                    
// //                     <div className="flex justify-between items-center">
// //                       <p className="text-gray-600 dark:text-gray-300 truncate">
// //                         {room.lastMessage?.senderId === currentUser?.uid && '✓ '}
// //                         {getMessagePreview(room.lastMessage)}
// //                       </p>
// //                       {room.unreadCount > 0 && (
// //                         <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
// //                           {room.unreadCount}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }


// "use client";
// // app/chat/[roomId]/page.tsx
// "use client";

// import { useEffect, useState, useRef } from 'react';
// import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
// import { useAuth } from '@/hooks/useAuth';
// import { db } from '@/lib/firebase';
// import { ChatMessage, ChatRoom } from '@/../../types/user';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { getInitials } from '@/lib/utils';

// export default function ChatRoomPage({ params }: { params: { roomId: string } }) {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
//   const { user } = useAuth();
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!user?.uid || !params.roomId) return;

//     // Subscribe to chat room details
//     const roomUnsubscribe = onSnapshot(doc(db, 'chatRooms', params.roomId), (doc) => {
//       if (doc.exists()) {
//         const data = doc.data();
//         setChatRoom({
//           id: doc.id,
//           ...data,
//           updatedAt: data.updatedAt?.toDate() || new Date(),
//           lastMessage: data.lastMessage ? {
//             ...data.lastMessage,
//             timestamp: data.lastMessage.timestamp?.toDate() || new Date()
//           } : null
//         } as ChatRoom);
//       }
//     });

//     // Subscribe to messages
//     const messagesRef = collection(db, 'chatRooms', params.roomId, 'messages');
//     const q = query(messagesRef, orderBy('timestamp', 'asc'));
    
//     const messagesUnsubscribe = onSnapshot(q, (snapshot) => {
//       const newMessages = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           ...data,
//           timestamp: data.timestamp?.toDate() || new Date()
//         } as ChatMessage;
//       });
//       setMessages(newMessages);
//       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     });

//     return () => {
//       roomUnsubscribe();
//       messagesUnsubscribe();
//     };
//   }, [params.roomId, user?.uid]);

//   const sendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !user?.uid || !chatRoom) return;

//     const messageData = {
//       content: newMessage.trim(),
//       senderId: user.uid,
//       timestamp: serverTimestamp(),
//       type: 'text' as const
//     };

//     try {
//       // Add message to subcollection
//       await addDoc(collection(db, 'chatRooms', chatRoom.id, 'messages'), messageData);

//       // Update chat room with last message
//       await updateDoc(doc(db, 'chatRooms', chatRoom.id), {
//         lastMessage: messageData,
//         updatedAt: serverTimestamp()
//       });

//       setNewMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const getOtherParticipant = () => {
//     return chatRoom?.participantsInfo.find(p => p.id !== user?.uid);
//   };

//   const otherParticipant = getOtherParticipant();

//   return (
//     <div className="max-w-2xl mx-auto h-screen flex flex-col">
//       {/* Header */}
//       <div className="p-4 border-b">
//         <div className="flex items-center space-x-4">
//           <Avatar>
//             <AvatarImage src={otherParticipant?.photoURL} alt={otherParticipant?.name} />
//             <AvatarFallback>{getInitials(otherParticipant?.name || '')}</AvatarFallback>
//           </Avatar>
//           <h1 className="text-xl font-semibold">{otherParticipant?.name}</h1>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${message.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`max-w-[70%] rounded-lg p-3 ${
//                 message.senderId === user?.uid
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-100 dark:bg-gray-800'
//               }`}
//             >
//               <p>{message.content}</p>
//               <span className="text-xs opacity-70">
//                 {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </span>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input */}
//       <form onSubmit={sendMessage} className="p-4 border-t">
//         <div className="flex space-x-2">
//           <Input
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1"
//           />
//           <Button type="submit" disabled={!newMessage.trim()}>
//             Send
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
