// // // // "use client"

// // // // import React, { useEffect, useState } from 'react';
// // // // import { db, collection, query, where, getDocs, doc, getDoc, orderBy, limit } from './../../lib/firebase';
// // // // import { User, ChatRoom, Message } from './../../../types/user';
// // // // import { formatDistanceToNow } from 'date-fns';
// // // // import { Search, MoreVertical, Plus, PhoneCall, MessageSquarePlus, Check, MessageCircle, Settings, Users, Bell, LogOut, Volume2, CheckCheck } from 'lucide-react';
// // // // import {
// // // //   Card,
// // // //   CardContent,
// // // // } from "@/components/ui/card";
// // // // import {
// // // //   Avatar,
// // // //   AvatarFallback,
// // // //   AvatarImage,
// // // // } from "@/components/ui/avatar";
// // // // import {
// // // //   DropdownMenu,
// // // //   DropdownMenuContent,
// // // //   DropdownMenuItem,
// // // //   DropdownMenuSeparator,
// // // //   DropdownMenuTrigger,
// // // // } from "@/components/ui/dropdown-menu";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Skeleton } from "@/components/ui/skeleton";
// // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // // // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// // // // import { AlertCircle } from "lucide-react";
// // // // import { cn } from "@/lib/utils";
// // // // import { useRouter } from 'next/navigation';

// // // // interface ChatListProps {
// // // //   onSelectChat?: (userId: string, roomId: string) => void;
// // // // }

// // // // const ChatList: React.FC<ChatListProps> = ({ onSelectChat }) => {
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState<string | null>(null);
// // // //   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
// // // //   const [chats, setChats] = useState<Array<{user: User, lastMessage: Message | null, unreadCount: number, roomId: string}>>([]);
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [pinnedChats, setPinnedChats] = useState<string[]>([]);
// // // //   const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'groups'>('all');
// // // //   const router = useRouter();

// // // //   useEffect(() => {
// // // //     let isMounted = true;
// // // //     const fetchData = async () => {
// // // //       setLoading(true);
// // // //       setError(null);
      
// // // //       try {
// // // //         const currentUser = JSON.parse(localStorage.getItem('authUser') || '{}');
// // // //         if (!currentUser || !currentUser.uid) {
// // // //           setError('User not authenticated');
// // // //           setLoading(false);
// // // //           return;
// // // //         }

// // // //         // Fetch pinned chats
// // // //         const userSettingsRef = doc(db, 'users', currentUser.uid, 'settings', 'preferences');
// // // //         const userSettingsSnap = await getDoc(userSettingsRef);
// // // //         if (userSettingsSnap.exists() && isMounted) {
// // // //           setPinnedChats(userSettingsSnap.data().pinnedChats || []);
// // // //         }

// // // //         // Fetch chat rooms
// // // //         const q = query(
// // // //           collection(db, 'chatRooms'),
// // // //           where('participants', 'array-contains', currentUser.uid),
// // // //           orderBy('lastMessageTimestamp', 'desc')
// // // //         );

// // // //         const querySnapshot = await getDocs(q);
// // // //         const chatRoomsData: ChatRoom[] = [];
// // // //         querySnapshot.forEach((doc) => {
// // // //           chatRoomsData.push({ id: doc.id, ...doc.data() } as ChatRoom);
// // // //         });

// // // //         if (isMounted) {
// // // //           setChatRooms(chatRoomsData);
// // // //           await fetchChatsData(chatRoomsData, currentUser.uid);
// // // //         }
// // // //       } catch (err) {
// // // //         if (isMounted) {
// // // //           console.error('Error fetching chat data:', err);
// // // //           setError('Failed to load chats. Please try again later.');
// // // //         }
// // // //       } finally {
// // // //         if (isMounted) {
// // // //           setLoading(false);
// // // //         }
// // // //       }
// // // //     };

// // // //     fetchData();

// // // //     return () => {
// // // //       isMounted = false;
// // // //     };
// // // //   }, []);

// // // //   const fetchChatsData = async (chatRoomsData: ChatRoom[], currentUserId: string) => {
// // // //     try {
// // // //       const chatsData = [];
      
// // // //       for (let room of chatRoomsData) {
// // // //         const otherParticipantId = room.participants.find(id => id !== currentUserId);
        
// // // //         if (otherParticipantId || room.groupChat) {
// // // //           // Fetch user details or group details
// // // //           let userDetails;
// // // //           if (room.groupChat) {
// // // //             userDetails = {
// // // //               userId: room.id,
// // // //               displayName: room.groupName || 'Group Chat',
// // // //               avatarUrl: room.groupAvatar || '',
// // // //               email: '',
// // // //               isGroup: true,
// // // //               participants: room.participants
// // // //             };
// // // //           } else if (otherParticipantId) {
// // // //             userDetails = await fetchUserDetails(otherParticipantId);
// // // //           }
          
// // // //           // Fetch last message
// // // //           const lastMessage = await fetchLastMessage(room.id);
          
// // // //           // Get unread count
// // // //           const unreadCount = await getUnreadCount(room.id, currentUserId);
          
// // // //           chatsData.push({
// // // //             user: userDetails,
// // // //             lastMessage: lastMessage,
// // // //             unreadCount: unreadCount,
// // // //             roomId: room.id
// // // //           });
// // // //         }
// // // //       }

// // // //       // Sort: pinned chats first, then by last message timestamp
// // // //       chatsData.sort((a, b) => {
// // // //         const aPinned = pinnedChats.includes(a.roomId);
// // // //         const bPinned = pinnedChats.includes(b.roomId);
        
// // // //         if (aPinned && !bPinned) return -1;
// // // //         if (!aPinned && bPinned) return 1;
        
// // // //         const aTime = a.lastMessage?.timestamp?.toDate() || new Date(0);
// // // //         const bTime = b.lastMessage?.timestamp?.toDate() || new Date(0);
// // // //         return bTime.getTime() - aTime.getTime();
// // // //       });

// // // //       setChats(chatsData);
// // // //     } catch (err) {
// // // //       console.error("Error fetching chats data:", err);
// // // //       setError('Failed to load chat details. Please try again later.');
// // // //     }
// // // //   };

// // // //   const fetchUserDetails = async (userId: string): Promise<User> => {
// // // //     try {
// // // //       const userRef = doc(db, 'users', userId);
// // // //       const userSnapshot = await getDoc(userRef);
      
// // // //       if (!userSnapshot.exists()) {
// // // //         return {
// // // //           userId,
// // // //           email: '',
// // // //           displayName: 'Unknown User',
// // // //           avatarUrl: '',
// // // //           status: 'offline',
// // // //         };
// // // //       }

// // // //       const userData = userSnapshot.data();
// // // //       return {
// // // //         userId,
// // // //         email: userData?.email || '',
// // // //         displayName: userData?.displayName || 'Unknown User',
// // // //         avatarUrl: userData?.avatarUrl || '',
// // // //         status: userData?.status || 'offline',
// // // //         lastSeen: userData?.lastSeen || null,
// // // //       };
// // // //     } catch (err) {
// // // //       console.error(`Error fetching user ${userId}:`, err);
// // // //       return {
// // // //         userId,
// // // //         email: '',
// // // //         displayName: 'User Not Available',
// // // //         avatarUrl: '',
// // // //         status: 'offline',
// // // //       };
// // // //     }
// // // //   };

// // // //   const fetchLastMessage = async (roomId: string): Promise<Message | null> => {
// // // //     try {
// // // //       const messagesRef = collection(db, 'chatRooms', roomId, 'messages');
// // // //       const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
// // // //       const querySnapshot = await getDocs(q);
      
// // // //       if (querySnapshot.empty) {
// // // //         return null;
// // // //       }
      
// // // //       const doc = querySnapshot.docs[0];
// // // //       return { id: doc.id, ...doc.data() } as Message;
// // // //     } catch (err) {
// // // //       console.error(`Error fetching last message for room ${roomId}:`, err);
// // // //       return null;
// // // //     }
// // // //   };
  
// // // //   const getUnreadCount = async (roomId: string, userId: string): Promise<number> => {
// // // //     try {
// // // //       const messagesRef = collection(db, 'chatRooms', roomId, 'messages');
// // // //       const q = query(
// // // //         messagesRef,
// // // //         where('readBy', 'array-contains', userId),
// // // //         where('senderId', '!=', userId)
// // // //       );
// // // //       const querySnapshot = await getDocs(q);
// // // //       return querySnapshot.size;
// // // //     } catch (err) {
// // // //       console.error(`Error getting unread count for room ${roomId}:`, err);
// // // //       return 0;
// // // //     }
// // // //   };

// // // //   const getInitials = (name: string) => {
// // // //     return name.split(' ').map(n => n[0]).join('').toUpperCase();
// // // //   };

// // // //   const truncateMessage = (message: string, maxLength = 40) => {
// // // //     if (!message) return '';
// // // //     return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
// // // //   };

// // // //   const getMessageStatus = (message: Message | null) => {
// // // //     if (!message) return null;
    
// // // //     const currentUser = JSON.parse(localStorage.getItem('authUser') || '{}');
// // // //     if (message.senderId !== currentUser.uid) return null;
    
// // // //     if (message.readBy?.length > 0) {
// // // //       return <CheckCheck className="h-4 w-4 text-blue-500" />;
// // // //     } else if (message.deliveredTo?.length > 0) {
// // // //       return <CheckCheck className="h-4 w-4 text-gray-500" />;
// // // //     } else {
// // // //       return <Check className="h-4 w-4 text-gray-500" />;
// // // //     }
// // // //   };

// // // //   const handleSelectChat = (userId: string, roomId: string) => {
// // // //     if (onSelectChat) {
// // // //       onSelectChat(userId, roomId);
// // // //     } else {
// // // //       router.push(`/chat/${roomId}`);
// // // //     }
// // // //   };

// // // //   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     setSearchTerm(e.target.value.toLowerCase());
// // // //   };

// // // //   const handleTogglePin = (roomId: string) => {
// // // //     const currentUser = JSON.parse(localStorage.getItem('authUser') || '{}');
// // // //     if (!currentUser || !currentUser.uid) return;

// // // //     // Update local state
// // // //     const newPinnedChats = pinnedChats.includes(roomId)
// // // //       ? pinnedChats.filter(id => id !== roomId)
// // // //       : [...pinnedChats, roomId];
    
// // // //     setPinnedChats(newPinnedChats);
    
// // // //     // In a real app, you would update this in Firebase
// // // //     // updateDoc(doc(db, 'users', currentUser.uid, 'settings', 'preferences'), {
// // // //     //   pinnedChats: newPinnedChats
// // // //     // });
// // // //   };

// // // //   const handleCreateNewChat = () => {
// // // //     router.push('/contacts');
// // // //   };

// // // //   const filteredChats = chats.filter(chat => {
// // // //     // Apply tab filter
// // // //     if (activeTab === 'unread' && chat.unreadCount === 0) return false;
// // // //     if (activeTab === 'groups' && !chat.user.isGroup) return false;

// // // //     // Apply search filter
// // // //     return (
// // // //       chat.user.displayName.toLowerCase().includes(searchTerm) ||
// // // //       (chat.lastMessage?.content || '').toLowerCase().includes(searchTerm)
// // // //     );
// // // //   });

// // // //   // Skeleton loader for the chat list
// // // //   if (loading) {
// // // //     return (
// // // //       <Card className="h-full max-h-screen flex flex-col overflow-hidden bg-black text-white border-gray-800">
// // // //         <div className="bg-gray-900 p-3 flex justify-between items-center">
// // // //           <h1 className="text-white font-semibold text-xl">Chats</h1>
// // // //           <div className="flex space-x-3">
// // // //             <Skeleton className="h-5 w-5 bg-gray-700 rounded-full" />
// // // //             <Skeleton className="h-5 w-5 bg-gray-700 rounded-full" />
// // // //           </div>
// // // //         </div>

// // // //         <div className="p-2 bg-gray-900">
// // // //           <Skeleton className="h-10 w-full bg-gray-800 rounded-md" />
// // // //         </div>
// // // //        <Tabs>

// // // //         <TabsList className="bg-gray-900 border-b border-gray-800">
// // // //           <Skeleton className="h-10 w-24 bg-gray-800 rounded-md mx-1" />
// // // //           <Skeleton className="h-10 w-24 bg-gray-800 rounded-md mx-1" />
// // // //           <Skeleton className="h-10 w-24 bg-gray-800 rounded-md mx-1" />
// // // //         </TabsList>

// // // //        </Tabs>
// // // //         <CardContent className="p-0 flex-grow overflow-y-auto bg-black">
// // // //           {[1, 2, 3, 4, 5].map((i) => (
// // // //             <div key={i} className="flex p-3 border-b border-gray-800">
// // // //               <Skeleton className="h-12 w-12 bg-gray-800 rounded-full mr-3" />
// // // //               <div className="flex-grow">
// // // //                 <div className="flex justify-between items-baseline">
// // // //                   <Skeleton className="h-5 w-40 bg-gray-800 rounded-md" />
// // // //                   <Skeleton className="h-4 w-16 bg-gray-800 rounded-md" />
// // // //                 </div>
// // // //                 <div className="flex justify-between mt-2">
// // // //                   <Skeleton className="h-4 w-60 bg-gray-800 rounded-md" />
// // // //                   <Skeleton className="h-5 w-5 bg-gray-800 rounded-full" />
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </CardContent>
// // // //       </Card>
// // // //     );
// // // //   }

// // // //   // Error state
// // // //   if (error) {
// // // //     return (
// // // //       <Card className="h-full max-h-screen flex flex-col overflow-hidden bg-black text-white border-gray-800">
// // // //         <div className="bg-gray-900 p-3">
// // // //           <h1 className="text-white font-semibold text-xl">Chats</h1>
// // // //         </div>
// // // //         <CardContent className="flex items-center justify-center p-6">
// // // //           <Alert variant="destructive" className="bg-gray-900 border-red-600">
// // // //             <AlertCircle className="h-4 w-4" />
// // // //             <AlertTitle>Error</AlertTitle>
// // // //             <AlertDescription>{error}</AlertDescription>
// // // //             <Button 
// // // //               variant="destructive" 
// // // //               className="mt-4"
// // // //               onClick={() => window.location.reload()}
// // // //             >
// // // //               Try Again
// // // //             </Button>
// // // //           </Alert>
// // // //         </CardContent>
// // // //       </Card>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <Card className="h-full max-h-screen flex flex-col overflow-hidden bg-black text-white border-gray-800 relative">
// // // //       {/* Header */}
// // // //       <div className="bg-gray-900 p-3 flex justify-between items-center">
// // // //         <h1 className="text-white font-semibold text-xl">Chats</h1>
// // // //         <div className="flex space-x-3">
// // // //           <Button 
// // // //             variant="ghost" 
// // // //             size="icon" 
// // // //             className="rounded-full hover:bg-gray-800"
// // // //             onClick={handleCreateNewChat}
// // // //           >
// // // //             <Plus className="h-5 w-5 text-white" />
// // // //           </Button>
// // // //           <DropdownMenu>
// // // //             <DropdownMenuTrigger asChild>
// // // //               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-800">
// // // //                 <MoreVertical className="h-5 w-5 text-white" />
// // // //               </Button>
// // // //             </DropdownMenuTrigger>
// // // //             <DropdownMenuContent align="end" className="bg-gray-900 text-white border-gray-700">
// // // //               <DropdownMenuItem className="hover:bg-gray-800">
// // // //                 <Settings className="mr-2 h-4 w-4" />
// // // //                 Settings
// // // //               </DropdownMenuItem>
// // // //               <DropdownMenuItem className="hover:bg-gray-800">
// // // //                 <Users className="mr-2 h-4 w-4" />
// // // //                 New group
// // // //               </DropdownMenuItem>
// // // //               <DropdownMenuItem className="hover:bg-gray-800">
// // // //                 <Bell className="mr-2 h-4 w-4" />
// // // //                 Notification settings
// // // //               </DropdownMenuItem>
// // // //               <DropdownMenuSeparator className="bg-gray-700" />
// // // //               <DropdownMenuItem className="text-red-500 hover:bg-gray-800 hover:text-red-400">
// // // //                 <LogOut className="mr-2 h-4 w-4" />
// // // //                 Log out
// // // //               </DropdownMenuItem>
// // // //             </DropdownMenuContent>
// // // //           </DropdownMenu>
// // // //         </div>
// // // //       </div>

// // // //       {/* Search */}
// // // //       <div className="p-2 bg-gray-900">
// // // //         <div className="relative">
// // // //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
// // // //           <Input
// // // //             placeholder="Search chats"
// // // //             className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-gray-700"
// // // //             value={searchTerm}
// // // //             onChange={handleSearch}
// // // //           />
// // // //         </div>
// // // //       </div>

// // // //       {/* Tabs */}
// // // //       <Tabs 
// // // //         defaultValue="all" 
// // // //         className="w-full"
// // // //         value={activeTab}
// // // //         onValueChange={(v) => setActiveTab(v as 'all' | 'unread' | 'groups')}
// // // //       >
// // // //         <TabsList className="bg-gray-900 border-b border-gray-800 w-full justify-start">
// // // //           <TabsTrigger 
// // // //             value="all" 
// // // //             className={cn(
// // // //               "data-[state=active]:bg-gray-800 data-[state=active]:text-white",
// // // //               "text-gray-400"
// // // //             )}
// // // //           >
// // // //             All Chats
// // // //           </TabsTrigger>
// // // //           <TabsTrigger 
// // // //             value="unread" 
// // // //             className={cn(
// // // //               "data-[state=active]:bg-gray-800 data-[state=active]:text-white",
// // // //               "text-gray-400",
// // // //               chats.some(c => c.unreadCount > 0) && "font-semibold"
// // // //             )}
// // // //           >
// // // //             Unread
// // // //             {chats.some(c => c.unreadCount > 0) && (
// // // //               <Badge variant="outline" className="ml-2 bg-red-500 border-0">
// // // //                 {chats.reduce((acc, c) => acc + (c.unreadCount > 0 ? 1 : 0), 0)}
// // // //               </Badge>
// // // //             )}
// // // //           </TabsTrigger>
// // // //           <TabsTrigger 
// // // //             value="groups" 
// // // //             className={cn(
// // // //               "data-[state=active]:bg-gray-800 data-[state=active]:text-white",
// // // //               "text-gray-400"
// // // //             )}
// // // //           >
// // // //             Groups
// // // //           </TabsTrigger>
// // // //         </TabsList>

// // // //         {/* Chat list */}
// // // //         <TabsContent value={activeTab} className="m-0 p-0">
// // // //           <CardContent className="p-0 flex-grow overflow-y-auto bg-black">
// // // //             {filteredChats.length === 0 ? (
// // // //               <div className="h-60 flex flex-col items-center justify-center text-gray-500 space-y-4">
// // // //                 <MessageCircle className="h-12 w-12 text-gray-700" />
// // // //                 <p>No chats available</p>
// // // //                 <Button 
// // // //                   variant="outline" 
// // // //                   onClick={handleCreateNewChat}
// // // //                   className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
// // // //                 >
// // // //                   Start a new conversation
// // // //                 </Button>
// // // //               </div>
// // // //             ) : (
// // // //               filteredChats.map((chat) => (
// // // //                 <div 
// // // //                   key={chat.roomId}
// // // //                   className={cn(
// // // //                     "flex p-3 border-b border-gray-800 hover:bg-gray-900 cursor-pointer",
// // // //                     pinnedChats.includes(chat.roomId) && "bg-gray-900 bg-opacity-50"
// // // //                   )}
// // // //                   onClick={() => handleSelectChat(chat.user.userId, chat.roomId)}
// // // //                 >
// // // //                   <div className="relative">
// // // //                     <Avatar className="h-12 w-12 mr-3 border border-gray-700">
// // // //                       <AvatarImage src={chat.user.avatarUrl} alt={chat.user.displayName} />
// // // //                       <AvatarFallback className="bg-gray-700 text-gray-300">
// // // //                         {getInitials(chat.user.displayName)}
// // // //                       </AvatarFallback>
// // // //                     </Avatar>
// // // //                     {chat.user.status === 'online' && (
// // // //                       <span className="absolute bottom-0 right-3 h-3 w-3 rounded-full bg-green-500 border-2 border-black"></span>
// // // //                     )}
// // // //                   </div>
                  
// // // //                   <div className="flex-grow min-w-0">
// // // //                     <div className="flex justify-between items-baseline">
// // // //                       <h3 className={cn(
// // // //                         "font-medium truncate",
// // // //                         chat.unreadCount > 0 && "font-semibold"
// // // //                       )}>
// // // //                         {chat.user.displayName}
// // // //                         {chat.user.isGroup && (
// // // //                           <Badge variant="outline" className="ml-2 bg-gray-800 text-xs border-gray-700">
// // // //                             {(chat.user.participants?.length || 0)} members
// // // //                           </Badge>
// // // //                         )}
// // // //                       </h3>
// // // //                       <span className="text-xs text-gray-500 whitespace-nowrap">
// // // //                         {chat.lastMessage?.timestamp ? 
// // // //                           formatDistanceToNow(
// // // //                             new Date(chat.lastMessage.timestamp.toDate()), 
// // // //                             { addSuffix: false }
// // // //                           ) : ''
// // // //                         }
// // // //                       </span>
// // // //                     </div>
                    
// // // //                     <div className="flex justify-between mt-1">
// // // //                       <div className="flex items-center space-x-1 truncate">
// // // //                         {getMessageStatus(chat.lastMessage)}
// // // //                         <p className={cn(
// // // //                           "text-sm text-gray-400 truncate",
// // // //                           chat.unreadCount > 0 && "text-white font-medium"
// // // //                         )}>
// // // //                           {chat.lastMessage ? 
// // // //                             (chat.lastMessage.type !== 'text' ? 
// // // //                               `[${chat.lastMessage.type}]` : 
// // // //                               truncateMessage(chat.lastMessage.content)
// // // //                             ) : 
// // // //                             'Start a conversation'
// // // //                           }
// // // //                         </p>
// // // //                       </div>
                      
// // // //                       <div className="flex flex-shrink-0 items-center space-x-1">
// // // //                         {chat.unreadCount > 0 && (
// // // //                           <Badge className="bg-blue-600 hover:bg-blue-700">
// // // //                             {chat.unreadCount}
// // // //                           </Badge>
// // // //                         )}
// // // //                         {chat.user.muted && (
// // // //                           <Volume2 className="h-4 w-4 text-gray-500" />
// // // //                         )}
// // // //                         <DropdownMenu>
// // // //                           <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
// // // //                             <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-800">
// // // //                               <MoreVertical className="h-4 w-4 text-gray-400" />
// // // //                             </Button>
// // // //                           </DropdownMenuTrigger>
// // // //                           <DropdownMenuContent align="end" className="bg-gray-900 text-white border-gray-700">
// // // //                             <DropdownMenuItem className="hover:bg-gray-800" onClick={e => {
// // // //                               e.stopPropagation();
// // // //                               handleTogglePin(chat.roomId);
// // // //                             }}>
// // // //                               {pinnedChats.includes(chat.roomId) ? 'Unpin chat' : 'Pin chat'}
// // // //                             </DropdownMenuItem>
// // // //                             <DropdownMenuItem className="hover:bg-gray-800" onClick={e => e.stopPropagation()}>
// // // //                               {chat.user.muted ? 'Unmute notifications' : 'Mute notifications'}
// // // //                             </DropdownMenuItem>
// // // //                             <DropdownMenuSeparator className="bg-gray-700" />
// // // //                             <DropdownMenuItem 
// // // //                               className="text-red-500 hover:bg-gray-800 hover:text-red-400" 
// // // //                               onClick={e => e.stopPropagation()}
// // // //                             >
// // // //                               Delete chat
// // // //                             </DropdownMenuItem>
// // // //                           </DropdownMenuContent>
// // // //                         </DropdownMenu>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               ))
// // // //             )}
// // // //           </CardContent>
// // // //         </TabsContent>
// // // //       </Tabs>

// // // //       {/* New message button */}
// // // //       <Button 
// // // //         className="absolute bottom-6 right-6 rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
// // // //         onClick={handleCreateNewChat}
// // // //       >
// // // //         <MessageSquarePlus className="h-6 w-6" />
// // // //       </Button>
// // // //     </Card>
// // // //   );
// // // // };

// // // // export default ChatList;


// // // "use client"

// // // import React, { useEffect, useState } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import { db, auth } from '@/lib/firebase';
// // // import { collection, query, where, getDocs, doc, getDoc, orderBy } from 'firebase/firestore';
// // // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // // import { Card, CardContent } from '@/components/ui/card';
// // // import { Skeleton } from '@/components/ui/skeleton';
// // // import { getInitials } from '@/lib/utils';
// // // import { toast } from '@/hooks/use-toast';
// // // import { formatDistanceToNow } from 'date-fns';

// // // interface ChatRoom {
// // //   id: string;
// // //   participants: string[];
// // //   participantsInfo: {
// // //     id: string;
// // //     name: string;
// // //     photoURL?: string;
// // //   }[];
// // //   lastMessage?: {
// // //     text: string;
// // //     timestamp: number;
// // //     senderId: string;
// // //   };
// // //   updatedAt: number;
// // //   unreadCount: number;
// // // }

// // // interface ChatParticipant {
// // //   id: string;
// // //   name: string;
// // //   photoURL?: string;
// // //   lastMessage?: string;
// // //   lastMessageTime?: number;
// // //   unreadCount: number;
// // //   chatRoomId: string;
// // // }

// // // const ChatList: React.FC = () => {
// // //   const router = useRouter();
// // //   const [chatParticipants, setChatParticipants] = useState<ChatParticipant[]>([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchChatRooms = async () => {
// // //       const currentUser = auth.currentUser;
// // //       if (!currentUser) {
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       try {
// // //         const chatRoomsRef = collection(db, 'chatRooms');
// // //         const q = query(
// // //           chatRoomsRef,
// // //           where('participants', 'array-contains', currentUser.uid),
// // //           orderBy('updatedAt', 'desc')
// // //         );

// // //         const querySnapshot = await getDocs(q);
// // //         const participants: ChatParticipant[] = [];

// // //         querySnapshot.forEach((doc) => {
// // //           const chatRoom = { id: doc.id, ...doc.data() } as ChatRoom;
          
// // //           // Find the other participant (not the current user)
// // //           const otherParticipantInfo = chatRoom.participantsInfo.find(
// // //             p => p.id !== currentUser.uid
// // //           );

// // //           if (otherParticipantInfo) {
// // //             participants.push({
// // //               id: otherParticipantInfo.id,
// // //               name: otherParticipantInfo.name,
// // //               photoURL: otherParticipantInfo.photoURL,
// // //               lastMessage: chatRoom.lastMessage?.text,
// // //               lastMessageTime: chatRoom.lastMessage?.timestamp || chatRoom.updatedAt,
// // //               unreadCount: chatRoom.unreadCount,
// // //               chatRoomId: chatRoom.id
// // //             });
// // //           }
// // //         });

// // //         setChatParticipants(participants);
// // //       } catch (error) {
// // //         toast({
// // //           title: "Error",
// // //           description: "Failed to load chat list",
// // //           variant: "destructive",
// // //         });
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchChatRooms();
// // //   }, []);

// // //   const handleChatClick = (chatRoomId: string) => {
// // //     router.push(`/chatroom/${chatRoomId}`);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="max-w-3xl mx-auto mt-8 px-4 space-y-4">
// // //         {[...Array(3)].map((_, i) => (
// // //           <Card key={i}>
// // //             <CardContent className="p-4">
// // //               <div className="flex items-center space-x-4">
// // //                 <Skeleton className="w-12 h-12 rounded-full" />
// // //                 <div className="space-y-2 flex-1">
// // //                   <Skeleton className="h-5 w-32" />
// // //                   <Skeleton className="h-4 w-48" />
// // //                 </div>
// // //                 <Skeleton className="h-4 w-16" />
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         ))}
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="max-w-3xl mx-auto mt-8 px-4 space-y-2">
// // //       <h2 className="text-2xl font-bold mb-4">Recent Conversations</h2>
      
// // //       {chatParticipants.length === 0 ? (
// // //         <Card>
// // //           <CardContent className="p-8 text-center">
// // //             <p className="text-gray-500">No conversations yet</p>
// // //           </CardContent>
// // //         </Card>
// // //       ) : (
// // //         chatParticipants.map((participant) => (
// // //           <Card 
// // //             key={participant.id} 
// // //             className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
// // //             onClick={() => handleChatClick(participant.chatRoomId)}
// // //           >
// // //             <CardContent className="p-4">
// // //               <div className="flex items-center space-x-4">
// // //                 <Avatar className="w-12 h-12">
// // //                   <AvatarImage src={participant.photoURL} alt={participant.name} />
// // //                   <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
// // //                 </Avatar>
                
// // //                 <div className="flex-1 min-w-0">
// // //                   <div className="flex justify-between items-center">
// // //                     <h3 className="font-semibold truncate">{participant.name}</h3>
// // //                     {participant.lastMessageTime && (
// // //                       <span className="text-xs text-gray-500">
// // //                         {formatDistanceToNow(participant.lastMessageTime, { addSuffix: true })}
// // //                       </span>
// // //                     )}
// // //                   </div>
                  
// // //                   {participant.lastMessage ? (
// // //                     <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
// // //                       {participant.lastMessage}
// // //                     </p>
// // //                   ) : (
// // //                     <p className="text-sm text-gray-400 italic">No messages yet</p>
// // //                   )}
// // //                 </div>
                
// // //                 {participant.unreadCount > 0 && (
// // //                   <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
// // //                     <span className="text-xs text-white font-medium">
// // //                       {participant.unreadCount > 9 ? '9+' : participant.unreadCount}
// // //                     </span>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         ))
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default ChatList;
// // "use client";

// // import React, { useEffect, useState } from 'react';
// // import { db, collection, query, where, getDocs, doc, getDoc, orderBy, limit, Timestamp } from './../../lib/firebase';
// // import { User, ChatRoom } from './../../../types/user';

// // const ChatList: React.FC = () => {
// //   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [newMessages, setNewMessages] = useState<{ [key: string]: boolean }>({}); // Track unread messages

// //   useEffect(() => {
// //     const currentUser = JSON.parse(localStorage.getItem('authUser') || '{}');
// //     if (!currentUser || !currentUser.uid) {
// //       return;
// //     }

// //     const fetchChatRooms = async () => {
// //       const q = query(
// //         collection(db, 'chatRooms'),
// //         where('participants', 'array-contains', currentUser.uid)
// //       );

// //       const querySnapshot = await getDocs(q);
// //       const chatRoomsData: ChatRoom[] = [];
// //       querySnapshot.forEach((doc) => {
// //         chatRoomsData.push({ id: doc.id, ...doc.data() } as ChatRoom);
// //       });

// //       setChatRooms(chatRoomsData);
// //       fetchParticipants(chatRoomsData, currentUser.uid);
// //       fetchLastMessages(chatRoomsData);
// //     };

// //     fetchChatRooms();
// //   }, []);

// //   // Fetch user details
// //   const fetchUserDetails = async (userId: string): Promise<User> => {
// //     const userRef = doc(db, 'users', userId);
// //     const userSnapshot = await getDoc(userRef);
    
// //     if (!userSnapshot.exists()) {
// //       throw new Error('User not found');
// //     }

// //     const userData = userSnapshot.data();
// //     return {
// //       userId,
// //       email: userData?.email || '',
// //       displayName: userData?.displayName || 'Unknown User',
// //       avatarUrl: userData?.avatarUrl || '', // Add default avatar if not available
// //     };
// //   };

// //   // Fetch participants in the chat rooms
// //   const fetchParticipants = async (chatRoomsData: ChatRoom[], currentUserId: string) => {
// //     const participants: User[] = [];
// //     for (let room of chatRoomsData) {
// //       const otherParticipantId = room.participants.find((id) => id !== currentUserId);
// //       if (otherParticipantId) {
// //         const userDetails = await fetchUserDetails(otherParticipantId);
// //         participants.push(userDetails);
// //       }
// //     }
// //     setUsers(participants);
// //   };

// //   // Fetch the last message of each chat room
// //   const fetchLastMessages = async (chatRoomsData: ChatRoom[]) => {
// //     for (let room of chatRoomsData) {
// //       const messagesRef = collection(db, 'chatRooms', room.id, 'messages');
// //       const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));

// //       const querySnapshot = await getDocs(q);
// //       querySnapshot.forEach((doc) => {
// //         const lastMessageData = doc.data();
// //         if (lastMessageData) {
// //           const isUnread = lastMessageData?.read ? false : true;
// //           setNewMessages((prev) => ({
// //             ...prev,
// //             [room.id]: isUnread,
// //           }));
// //         }
// //       });
// //     }
// //   };

// //   const formatTimestamp = (timestamp: Timestamp) => {
// //     const date = timestamp.toDate();
// //     const hours = date.getHours();
// //     const minutes = date.getMinutes();
// //     return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
// //   };

// //   return (
// //     <div>
// //       <h2>Chat List</h2>
// //       <ul>
// //         {users.map((user, index) => {
// //           const chatRoom = chatRooms[index]; // Match user with chatRoom based on index
// //           const roomNewMessages = newMessages[chatRoom.id];

// //           return (
// //             <li
// //               key={user.userId}
// //               style={{
// //                 backgroundColor: roomNewMessages ? '#e1f5fe' : '', // Highlight unread messages
// //                 padding: '10px',
// //                 borderRadius: '8px',
// //                 marginBottom: '8px',
// //                 cursor: 'pointer',
// //                 transition: 'background-color 0.3s ease',
// //               }}
// //             >
// //               <div style={{ display: 'flex', alignItems: 'center' }}>
// //                 <img
// //                   src={user.avatarUrl}
// //                   alt={user.displayName}
// //                   style={{ width: '40px', borderRadius: '50%' }}
// //                 />
// //                 <div style={{ marginLeft: '10px', flex: 1 }}>
// //                   <p style={{ margin: '0', fontWeight: 'bold' }}>{user.displayName}</p>
// //                   <p style={{ margin: '0', fontSize: '0.9em', color: '#666' }}>
// //                     {roomNewMessages ? 'New message' : 'Last message'}: {roomNewMessages ? '...' : 'No new message'}
// //                   </p>
// //                 </div>
// //                 {/* Display last message time */}
// //                 <p style={{ margin: '0', fontSize: '0.8em', color: '#aaa' }}>
// //                   {formatTimestamp(chatRoom.timestamp || Timestamp.now())}
// //                 </p>
// //               </div>
// //             </li>
// //           );
// //         })}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default ChatList;


// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { db, collection, query, where, getDocs, doc, getDoc, orderBy, limit, Timestamp, User } from './../../lib/firebase';
// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { MessageCircle } from 'lucide-react';
// import { ChatRoom, UserProfile } from '../../../types/user';
// import { Message } from 'postcss';





// const ChatList = () => {
//   const router = useRouter();
//   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
//   const [users, setUsers] = useState<UserProfile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem('authUser') || '{}');
//     if (!currentUser?.uid) {
//       setError('No user found');
//       setLoading(false);
//       return;
//     }

//     fetchAllData(currentUser.uid);
//   }, []);

//   const fetchAllData = async (currentUserId: string) => {
//     try {
//       setLoading(true);
//       const roomsQuery = query(
//         collection(db, 'chatRooms'),
//         where('participants', 'array-contains', currentUserId)
//       );

//       const roomsSnapshot = await getDocs(roomsQuery);
//       const roomsPromises = roomsSnapshot.docs.map(async (roomDoc) => {
//         const roomData = roomDoc.data();
//         const otherUserId = roomData.participants.find(id => id !== currentUserId);
        
//         // Fetch user data
//         const userData = await fetchUserData(otherUserId);
        
//         // Fetch last message
//         const lastMessage = await fetchLastMessage(roomDoc.id);

//         return {
//           room: {
//             id: roomDoc.id,
//             ...roomData,
//             lastMessage
//           },
//           user: userData
//         };
//       });

//       const results = await Promise.all(roomsPromises);
      
//       setChatRooms(results.map(r => r.room));
//       setUsers(results.map(r => r.user));
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError('Failed to load chats');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserData = async (userId: string): Promise<User> => {
//     try {
//       const userDoc = await getDoc(doc(db, 'users', userId));
      
//       if (!userDoc.exists()) {
//         // Return default user data if not found
//         return {
//           userId,
//           email: `${userId}@example.com`,
//           displayName: userId.slice(0, 8),
//           // avatarUrl: `/api/placeholder/40/40`
//         };
//       }

//       const userData = userDoc.data();
//       return {
//         userId,
//         email: userData.email || '',
//         displayName: userData.displayName || userId.slice(0, 8),
//         // avatarUrl: userData.avatarUrl || `/api/placeholder/40/40`
//       };
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       return {
//         userId,
//         email: '',
//         displayName: 'Unknown User',
//         // avatarUrl: `/api/placeholder/40/40`
//       };
//     }
//   };

//   const fetchLastMessage = async (roomId: string) => {
//     try {
//       const messagesQuery = query(
//         collection(db, 'chatRooms', roomId, 'messages'),
//         orderBy('timestamp', 'desc'),
//         limit(1)
//       );
      
//       const messageSnapshot = await getDocs(messagesQuery);
//       if (!messageSnapshot.empty) {
//         const messageData = messageSnapshot.docs[0].data() as Message;
//         return {
//           text: messageData.text,
//           timestamp: messageData.timestamp
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error('Error fetching last message:', error);
//       return null;
//     }
//   };

//   const formatTime = (timestamp: Timestamp) => {
//     const date = timestamp.toDate();
//     const now = new Date();
//     const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

//     if (diffInHours < 24) {
//       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } else {
//       return `${diffInHours}h`;
//     }
//   };

//   const navigateToChatRoom = (roomId: string) => {
//     router.push(`/chatroom/${roomId}`);
//   };

//   if (loading) {
//     return (
//       <div className="max-w-md mx-auto p-4 space-y-3">
//         <h1 className="text-xl font-semibold mb-4">Messages</h1>
//         {[1, 2, 3].map((i) => (
//           <Card key={i} className="w-full">
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-3">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <div className="flex-1">
//                   <Skeleton className="h-4 w-24 mb-2" />
//                   <Skeleton className="h-3 w-32" />
//                 </div>
//                 <Skeleton className="h-3 w-8" />
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-md mx-auto p-4 text-center">
//         <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-2" />
//         <p className="text-gray-500">{error}</p>
//       </div>
//     );
//   }

  
//   if (!chatRoom || !currentUser) return null;


//   const otherUser = chatRoom.participantsInfo.find(
//     (p) => p.id !== currentUser.uid
//   );
  

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h1 className="text-xl font-semibold mb-4">Messages</h1>
//       <div className="space-y-1">
//         {users.map((user, index) => {
//           const room = chatRooms[index];
//           const lastMessage = room.lastMessage;

//           return (
//             <Card 
//               key={user.userId}
//               className="w-full hover:bg-gray-50 transition-colors cursor-pointer"
//               onClick={() => navigateToChatRoom(room.id)}
//             >
//               <CardContent className="p-3">
//                 <div className="flex items-center space-x-3">
//                   <img
//                     // src={user.avatarUrl}
//                     alt={user.displayName}
//                     className="h-10 w-10 rounded-full object-cover bg-gray-100"
//                     // onError={(e) => {
//                     //   (e.target as HTMLImageElement).src = '/api/placeholder/40/40';
//                     // }}
//                   />
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-sm text-gray-900 truncate">
//                       {/* {user.displayName} */}
//                       {otherUser?.name}
//                     </p>
//                     <p className="text-sm text-gray-500 truncate">
//                       {lastMessage?.text || 'No messages yet'}
//                     </p>
//                   </div>
//                   <span className="text-xs text-gray-400 flex-shrink-0">
//                     {lastMessage?.timestamp ? formatTime(lastMessage.timestamp) : ''}
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ChatList;

'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle } from 'lucide-react';
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
// import Image from "next/image";


// Types
interface Message {
  text: string;
  timestamp: {
    toDate: () => Date;
  };
}

interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
}

interface ChatRoomParticipant {
  id: string;
  name: string;
}

interface ChatRoom {
  id: string;
  participants: string[];
  participantsInfo: ChatRoomParticipant[];
  lastMessage?: {
    text: string;
    timestamp: {
      toDate: () => Date;
    };
  };
}

interface AuthUser {
  uid: string;
}

const ChatList: React.FC = () => {
  const router = useRouter();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Get current user from localStorage
    try {
      const storedUser = localStorage.getItem('authUser');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setCurrentUser(parsedUser);

      if (!parsedUser?.uid) {
        setError('No user found');
        setLoading(false);
        return;
      }

      fetchAllData(parsedUser.uid);
    } catch (err) {
      setError('Failed to load user data');
      setLoading(false);
    }
  }, []);

  const fetchAllData = async (currentUserId: string) => {
    try {
      setLoading(true);
      
      // Fetch chat rooms from your Firebase instance
      const roomsSnapshot = await getDocs(query(
        collection(db, 'chatRooms'),
        where('participants', 'array-contains', currentUserId)
      ));

      const roomsData = await Promise.all(roomsSnapshot.docs.map(async (roomDoc) => {
        const roomData = roomDoc.data() as Omit<ChatRoom, 'id'>;
        const otherUserId = roomData.participants.find(id => id !== currentUserId);
        
        if (!otherUserId) {
          throw new Error('No other participant found');
        }

        // Fetch other user's data
        const userData = await fetchUserData(otherUserId);
        
        // Fetch last message
        const lastMessage = await fetchLastMessage(roomDoc.id);

        return {
          room: {
            id: roomDoc.id,
            ...roomData,
            lastMessage
          },
          user: userData
        };
      }));
      

      // setChatRooms(roomsData.map(data => data.room));   
      setChatRooms(
        roomsData.map(data => ({
          ...data.room, // Spread the `room` object
          lastMessage: data.room.lastMessage
            ? data.room.lastMessage
            : { text: "", timestamp: { toDate: () => new Date() } }, // Default structure
        }))
      );
      
      
      setUsers(roomsData.map(data => data.user));
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load chats');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (userId: string): Promise<UserProfile> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      if (!userDoc.exists()) {
        return {
          userId,
          email: `${userId}@example.com`,
          displayName: userId.slice(0, 8),
          // avatarUrl: `/api/placeholder/40/40`
        };
      }

      const userData = userDoc.data();
      return {
        userId,
        email: userData.email || '',
        displayName: userData.displayName || userId.slice(0, 8),
        // avatarUrl: userData.avatarUrl || `/api/placeholder/40/40`
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      return {
        userId,
        email: '',
        displayName: 'Unknown User',
        // avatarUrl: `/api/placeholder/40/40`
      };
    }
  };

  const fetchLastMessage = async (roomId: string) => {
    try {
      const messagesQuery = query(
        collection(db, 'chatRooms', roomId, 'messages'),
        orderBy('timestamp', 'desc'),
        limit(1)
      );
      
      const messageSnapshot = await getDocs(messagesQuery);
      if (!messageSnapshot.empty) {
        const messageData = messageSnapshot.docs[0].data() as Message;
        return messageData;
      }
      return null;
    } catch (error) {
      console.error('Error fetching last message:', error);
      return null;
    }
  };

  const formatTime = (timestamp: { toDate: () => Date }) => {
    const date = timestamp.toDate();
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return `${diffInHours}h`;
  };

  const navigateToChatRoom = (roomId: string) => {
    router.push(`/chatroom/${roomId}`);
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4 space-y-3">
        <h1 className="text-xl font-semibold mb-4">Messages</h1>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-3 w-8" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-2" />
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Messages</h1>
      <div className="space-y-1">
        {users.map((user, index) => {
          const room = chatRooms[index];
          const lastMessage = room.lastMessage;
          const otherUser = room.participantsInfo.find(p => p.id !== currentUser.uid);

          return (
            <Card 
              key={user.userId}
              className="w-full hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => navigateToChatRoom(room.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  {/* <Image
                    key={i}
                    src={user.avatarUrl || 'user'}
                    alt={otherUser?.name || 'User'}
                  
                  width={200} // Adjust as needed
                  height={200} // Adjust as needed
                    // src={user.avatarUrl || '/api/placeholder/40/40'}
                    // alt={otherUser?.name || 'User'}
                    className="h-10 w-10 rounded-full object-cover bg-gray-100"
                    // onError={(e) => {
                    //   // const target = e.target as HTMLImageElement;
                    //   // target.src = '/api/placeholder/40/40';
                    // }}
                  /> */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">
                      {otherUser?.name || user.displayName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {lastMessage?.text || 'No messages yet'}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {lastMessage?.timestamp ? formatTime(lastMessage.timestamp) : ''}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;